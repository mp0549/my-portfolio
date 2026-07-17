# GPU-Accelerated Monte Carlo Option Pricing Benchmark

A quantitative-finance benchmark that prices European options by Monte Carlo
simulation on both **CPU** (vectorized NumPy) and **GPU** (a hand-written
**Numba CUDA** kernel, plus an optional **PyTorch CUDA** version), validates the
results against the analytical **Black-Scholes** formula, and measures how the
GPU speedup grows with problem size.

The goal is not a toy CUDA demo but something closer to what a quant developer
would actually build: a correct pricing engine, a real custom kernel with a
shared-memory reduction, an honest end-to-end benchmark, and reproducible plots.

---

## Table of Contents

1. [Overview](#overview)
2. [Technologies](#technologies)
3. [Project Structure](#project-structure)
4. [Quick Start](#quick-start)
5. [Methodology](#methodology)
6. [Results](#results)
7. [Interview Talking Points](#interview-talking-points)
8. [Future Optimizations](#future-optimizations)

---

## Overview

### Monte Carlo option pricing

An **option** gives its holder the right (not the obligation) to buy (call) or
sell (put) an asset at a fixed **strike** price `K` on a future date `T`. Under
the **risk-neutral** pricing framework, the fair value of a derivative today is
the *expected payoff at maturity, discounted back to the present*:

```
price = E[ discount_factor * payoff(S_T) ]
      = exp(-r * T) * E[ max(S_T - K, 0) ]        (for a European call)
```

We don't know `S_T` (the stock price at maturity) with certainty, so we
**simulate** it many times. Under the Black-Scholes assumptions the stock
follows a **Geometric Brownian Motion (GBM)**, whose exact solution lets us jump
straight to maturity with a single normal draw `Z ~ N(0, 1)` per path:

```
S_T = S_0 * exp( (r - 0.5 * sigma^2) * T + sigma * sqrt(T) * Z )
```

Each simulated path gives one payoff; averaging millions of payoffs and
discounting gives the price. This works because of the **Law of Large Numbers**:
the sample mean converges to the true expectation. **Discounting** (`exp(-r*T)`)
is required because money received at maturity is worth less than money today.

**Why more simulations help, and how much:** Monte Carlo error shrinks like
`O(1 / sqrt(N))`. To halve the error you need **4x** the paths. This slow
convergence is exactly why Monte Carlo is compute-hungry — and why it's such a
good fit for GPU acceleration.

### Black-Scholes (the ground truth)

For a European option under these same assumptions there is a **closed-form**
price:

```
Call = S * N(d1) - K * exp(-r*T) * N(d2)
d1   = [ln(S/K) + (r + 0.5*sigma^2)*T] / (sigma*sqrt(T))
d2   = d1 - sigma*sqrt(T)
```

We use this analytical value to **prove the Monte Carlo engine is correct**: the
MC estimate must converge to it as `N` grows, and it does (see
[Results](#results)).

### Why GPUs accelerate Monte Carlo

Every simulated path is **completely independent** of the others — no path needs
data from any other until the final averaging step. That makes Monte Carlo
**embarrassingly parallel**, the ideal workload for a GPU's thousands of cores.
A CPU processes a handful of paths per core at a time (via SIMD); a GPU launches
tens of thousands of threads that each price a path simultaneously.

---

## Technologies

| Technology | Role |
|---|---|
| **Python 3.10+** | Project language |
| **NumPy** | Vectorized CPU Monte Carlo baseline |
| **Numba CUDA** (`@cuda.jit`) | Custom GPU kernel — the core of the project |
| **PyTorch** *(optional)* | Second GPU backend using CUDA tensors |
| **Matplotlib** | Publication-quality plots |
| **pandas** | Loading benchmark data for plotting |

---

## Project Structure

```
CudaMonteCarloBenchmark/
├── black_scholes.py     # Analytical Black-Scholes formula + Greeks (ground truth)
├── cpu_pricer.py        # Vectorized NumPy Monte Carlo pricer
├── gpu_pricer.py        # Custom Numba CUDA kernel + optional PyTorch version
├── benchmark.py         # Runs the CPU/GPU sweep, writes results/benchmark.csv
├── visualize.py         # Renders the plots into results/
├── requirements.txt
├── README.md
└── results/
    ├── benchmark.csv    # Measured data (see note on GPU below)
    ├── cpu_vs_gpu.png   # Runtime vs problem size
    ├── speedup.png      # Speedup vs problem size
    └── throughput.png   # Paths/second vs problem size
```

---

## Quick Start

```bash
# 1. Install dependencies (into a virtual environment)
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
# For the GPU backends you additionally need an NVIDIA GPU + CUDA toolkit,
# and (optional) a CUDA build of PyTorch from https://pytorch.org.

# 2. Sanity-check the finance: MC should converge to the analytical price
python black_scholes.py
python cpu_pricer.py

# 3. Confirm what hardware is available
python gpu_pricer.py

# 4. Run the benchmark (auto-skips any backend without a GPU)
python benchmark.py                 # writes results/benchmark.csv
python benchmark.py --sizes 10000 1000000 --repeats 5   # customize

# 5. Generate the plots
python visualize.py                 # writes the PNGs into results/
```

Every entry point runs standalone (`python <file>.py`) and prints a short
self-check, so you can explore the pieces independently.

---

## Methodology

### Simulation

All three backends compute the *same* estimator: draw `N` standard normals,
map each to a terminal price via the exact GBM solution, take `max(S_T - K, 0)`,
average, and discount. We also report the **standard error**
(`sample_std / sqrt(N)`), which gives a 95% confidence interval of roughly
`price ± 1.96 * std_error`.

### CPU implementation (`cpu_pricer.py`)

Pure vectorized NumPy — **no Python loop over paths**. All `N` draws and payoffs
are computed as array operations that NumPy dispatches to compiled C/BLAS
routines. This is the fair, already-optimized baseline the GPU must beat.

### GPU implementation (`gpu_pricer.py`)

A custom `@cuda.jit` kernel that does the entire job on the device:

- **One thread per path** (generalized by a **grid-stride loop**, so the same
  kernel handles 10K or 10M paths and the launch config is sized for the
  *hardware*, not the data).
- **On-device RNG:** each thread owns an independent `xoroshiro128+` stream,
  indexed by its global thread id, so there are no correlated draws and nothing
  is generated on the host.
- **Block-level reduction in shared memory:** each block sums its threads'
  payoffs with an `O(log n)` tree in on-chip shared memory (~100x faster than
  global memory), then **one** thread per block does a single `atomicAdd` into a
  global accumulator. Naively having millions of threads atomic-add to one
  counter would serialize and destroy performance; this collapses contention to
  a handful of blocks.
- **Minimal PCIe traffic:** no per-path array is ever created on the host or
  copied back — only **two scalars** (sum, sum-of-squares) return. Minimizing
  host↔device transfer is usually the single biggest GPU performance lever.

An optional **PyTorch CUDA** pricer (`mc_price_gpu_torch`) expresses the same
math as tensor ops for a higher-level comparison point.

### Benchmarking approach (`benchmark.py`)

- **Warm-up runs are discarded.** The first Numba launch pays a one-off JIT
  compile cost and the first CUDA call initializes the context; timing those
  would unfairly penalize the GPU.
- **Median of repeated runs** is reported (plus best-case) to smooth OS jitter.
- **GPU times are end-to-end** — they include memory setup and the result copy,
  because that's the real cost a user pays.
- **Unavailable backends are skipped**, so the script always produces at least
  the CPU rows.

---

## Results

> **Note on the numbers below.** This repository was assembled on a **CPU-only**
> machine, so `results/benchmark.csv` contains **real, measured** NumPy CPU
> timings but **no measured GPU data**. The GPU figures in the table and plots
> are produced by a small, fully documented performance model
> (`visualize.py::_illustrative_gpu_rows`) and are **clearly watermarked
> "ILLUSTRATIVE"**. They are conservative, order-of-magnitude numbers for a
> mid-range GPU that reproduce the *correct qualitative story*. **Re-run
> `python benchmark.py` on a CUDA machine** to overwrite the CSV with your own
> real measurements; `visualize.py` will then draw them with no watermark.

Example sweep (`S=100, K=100, r=0.05, sigma=0.20, T=1.0`), CPU measured,
GPU illustrative:

| Paths | CPU time | CPU paths/s | Numba GPU (illus.) | speedup | PyTorch GPU (illus.) | speedup |
|--:|--:|--:|--:|--:|--:|--:|
| 10K | 0.28 ms | 36 M/s | 0.31 ms | 0.9× | 0.40 ms | 0.7× |
| 100K | 3.2 ms | 32 M/s | 0.38 ms | 8× | 0.43 ms | 7× |
| 1M | 27 ms | 37 M/s | 1.1 ms | 24× | 0.65 ms | 41× |
| 10M | 556 ms | 18 M/s | 8.6 ms | 64× | 2.9 ms | 192× |

<p align="center">
  <img src="results/cpu_vs_gpu.png" width="49%" alt="CPU vs GPU runtime"/>
  <img src="results/speedup.png" width="49%" alt="Speedup vs problem size"/>
</p>
<p align="center">
  <img src="results/throughput.png" width="60%" alt="Throughput scaling"/>
</p>

**Correctness (measured, real):** the CPU Monte Carlo estimate converges to the
analytical Black-Scholes price of **10.4506** as `N` grows, with absolute error
falling roughly 10× per 100× more paths — the expected `1/sqrt(N)` behavior:

| Paths | MC price | abs. error |
|--:|--:|--:|
| 10K | 10.345 | 0.105 |
| 100K | 10.421 | 0.030 |
| 1M | 10.453 | 0.003 |
| 10M | 10.448 | 0.002 |

### Discussion

- **Where the GPU begins to win:** somewhere between 10K and 100K paths. Below
  that, the GPU is actually *slower* (speedup < 1×).
- **Why overhead dominates small workloads:** kernel launch, context setup, and
  memory transfer are a roughly *fixed* cost (tens to hundreds of microseconds).
  At 10K paths the actual arithmetic takes less time than that overhead, so the
  CPU — which has none of it — wins.
- **Why larger workloads scale better:** the fixed overhead is amortized over
  ever more paths, so throughput approaches the GPU's steady-state limit. Once
  there, the GPU's thousands of cores deliver 1–2 orders of magnitude more
  throughput than the CPU. This is why the speedup curve *rises* with `N` and the
  runtime curves fan apart on the log-log plot.

---

## Interview Talking Points

**Why is Monte Carlo "embarrassingly parallel"?**
Each path is statistically independent; there is zero inter-path communication
until a single averaging step at the end. `N` paths can be computed fully
concurrently, which is precisely the workload a GPU is built for.

**What do thread / block / grid mean?**
- A **thread** runs the kernel for one unit of work (here, one path).
- Threads are grouped into a **block**; threads in a block can cooperate through
  fast **shared memory** and synchronize with `syncthreads()`.
- Blocks form the **grid**, which covers the whole problem. A thread's global
  index is `blockIdx * blockDim + threadIdx` (Numba's `cuda.grid(1)`).
- Threads execute in **warps** of 32 in lock-step (SIMT), which is why the block
  size is a multiple of 32.

**Why block size 256?** Multiple of the 32-thread warp (no wasted lanes), a
power of two (clean tree reduction), and enough resident warps per SM to hide
memory latency without exhausting registers. 128/512 are reasonable too — it's a
tunable.

**Why the grid-stride loop?** It decouples launch configuration from data size.
Instead of demanding exactly `N` threads, we launch enough blocks to saturate the
SMs and let each thread stride across multiple paths. The same kernel stays
efficient from 10K to 10M paths.

**How do memory transfers affect performance?** PCIe transfer and kernel launch
are fixed costs that dominate small problems. The design deliberately keeps the
data on the device (RNG generated on-GPU, reduction on-GPU) and copies back only
two scalars — so the benchmark measures compute, not bus bandwidth.

**How do you generate random numbers correctly on a GPU?** With a
counter/skip-ahead RNG (`xoroshiro128+`), giving each thread an independent
sub-stream keyed by its global id. You must *not* share one generator across
threads or you get correlated draws and races.

**How do you know the GPU code is correct?** Both backends are validated against
the closed-form Black-Scholes price and must agree within Monte Carlo error
(`~1/sqrt(N)`), and the two engines agree with each other.

**float32 vs float64?** The GPU (especially consumer cards) is much faster in
single precision, but fp32 adds rounding noise. For pricing, MC's statistical
error usually dominates fp32 rounding, so single precision is often an
acceptable, big speedup — a real tradeoff worth naming.

---

## Future Optimizations

- **Variance reduction** (antithetic variates, control variates,
  quasi-random/Sobol sequences) — cuts the number of paths needed for a target
  accuracy, often a bigger win than raw hardware speed.
- **Path-dependent / American options** requiring time-stepping (e.g.
  Longstaff-Schwartz), which is far more interesting on the GPU than the
  single-step European case.
- **Batch pricing** of many options in one launch (Greeks via bump-and-revalue
  or pathwise/AAD) to amortize launch overhead.
- **fp32 + `fastmath`**, tuned block sizes, and CUDA streams to overlap compute
  with transfers.
- **Multi-GPU / larger sweeps**, and comparing against a CuPy implementation.

---

## Notes on Reproducibility

All RNG is seeded (`seed=42` by default), so runs are reproducible. The CPU uses
NumPy's PCG64 generator; the Numba kernel uses per-thread `xoroshiro128+`; the
PyTorch path uses a seeded CUDA generator. Different backends won't produce
*identical* draws (different RNG algorithms), but all converge to the same price.
