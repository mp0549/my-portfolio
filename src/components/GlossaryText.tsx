import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import glossaryRaw from "../data/glossary.json";
import "../assets/styles/GlossaryText.scss";

const glossary = glossaryRaw as Record<string, string>;

type Segment =
  | { kind: "text"; value: string }
  | { kind: "term"; term: string; definition: string };

const INLINE_RE = /\[\[([^\]]+)\]\]\{([^}]+)\}/g;
const GLOSSARY_RE = /\[\[\[([^\]]+)\]\]\]/g;

const warned = new Set<string>();

export function parseGlossaryContent(text: string): Segment[] {
  type Match = { start: number; end: number; term: string; definition: string | null };
  const matches: Match[] = [];

  INLINE_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = INLINE_RE.exec(text)) !== null) {
    matches.push({
      start: m.index,
      end: m.index + m[0].length,
      term: m[1],
      definition: m[2],
    });
  }

  GLOSSARY_RE.lastIndex = 0;
  while ((m = GLOSSARY_RE.exec(text)) !== null) {
    const start = m.index;
    const end = m.index + m[0].length;
    const overlap = matches.some((x) => start < x.end && end > x.start);
    if (!overlap) {
      matches.push({ start, end, term: m[1], definition: null });
    }
  }

  matches.sort((a, b) => a.start - b.start);

  const segments: Segment[] = [];
  let pos = 0;
  for (const match of matches) {
    if (match.start > pos) {
      segments.push({ kind: "text", value: text.slice(pos, match.start) });
    }
    if (match.definition !== null) {
      segments.push({ kind: "term", term: match.term, definition: match.definition });
    } else {
      const key = match.term.toLowerCase();
      const def = glossary[key];
      if (def) {
        segments.push({ kind: "term", term: match.term, definition: def });
      } else {
        if (!warned.has(key)) {
          warned.add(key);
          console.error(`Glossary term "${match.term}" not found in glossary.json`);
        }
        segments.push({ kind: "text", value: match.term });
      }
    }
    pos = match.end;
  }
  if (pos < text.length) {
    segments.push({ kind: "text", value: text.slice(pos) });
  }
  return segments;
}

const OPEN_EVENT = "glossary:open";

function GlossaryTerm({ term, definition }: { term: string; definition: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const [placement, setPlacement] = useState<"above" | "below">("above");

  const close = useCallback(() => {
    setOpen(false);
    setSticky(false);
  }, []);

  const broadcastOpen = useCallback(() => {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { id } }));
  }, [id]);

  const handleHoverOpen = useCallback(() => {
    if (!open) {
      setOpen(true);
      broadcastOpen();
    }
  }, [open, broadcastOpen]);

  const handleHoverLeave = useCallback(() => {
    if (!sticky) setOpen(false);
  }, [sticky]);

  const handleClick = useCallback(() => {
    if (sticky) {
      close();
    } else {
      setOpen(true);
      setSticky(true);
      broadcastOpen();
    }
  }, [sticky, close, broadcastOpen]);

  useEffect(() => {
    const onOther = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id: string };
      if (detail?.id !== id) close();
    };
    window.addEventListener(OPEN_EVENT, onOther);
    return () => window.removeEventListener(OPEN_EVENT, onOther);
  }, [id, close]);

  useEffect(() => {
    if (!sticky) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [sticky, close]);

  useLayoutEffect(() => {
    if (!open || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setPlacement(rect.top < 180 ? "below" : "above");
  }, [open]);

  return (
    <span
      ref={wrapRef}
      className={`glossary-term-wrap${open ? " is-open" : ""}`}
      onMouseEnter={handleHoverOpen}
      onMouseLeave={handleHoverLeave}
    >
      <button
        type="button"
        className="glossary-term"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {term}
      </button>
      {open && (
        <span
          ref={cardRef}
          className={`glossary-card glossary-card--${placement}`}
          role="tooltip"
        >
          {sticky && (
            <button
              type="button"
              className="glossary-card-close"
              aria-label="Close definition"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              ×
            </button>
          )}
          <span className="glossary-card-term">{term}</span>
          <span className="glossary-card-def">{definition}</span>
        </span>
      )}
    </span>
  );
}

export default function GlossaryText({ children }: { children: string }) {
  const segments = parseGlossaryContent(children);
  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === "text" ? (
          <span key={i}>{seg.value}</span>
        ) : (
          <GlossaryTerm key={i} term={seg.term} definition={seg.definition} />
        )
      )}
    </>
  );
}
