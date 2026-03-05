import React from "react";
import ssc from '../assets/images/ssc.png';
import covid from '../assets/images/covid.png';
import healthapp from '../assets/images/Health App.png';
import interviewprep from '../assets/images/interviewprep.jpeg';
import mariokart from '../assets/images/mariokartgameplay.jpg';
import influencedashboard from '../assets/images/influencedashboard.png';
import '../assets/styles/Project.scss';



function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">

            <div className="project">
                <a href="https://github.com/mp0549/influence-proxy-dashboard" target="_blank" rel="noreferrer">
                    <img src={influencedashboard} className="zoom" alt="thumbnail" width="100%"/>
                </a>
                <a href="https://github.com/LCodingX/generalization-bet" target="_blank" rel="noreferrer">
                    <h2>Influence Proxy Dashboard</h2>
                </a>

                <p className="tech">Next.js · FastAPI · PyTorch · HuggingFace · PEFT · Modal · Supabase</p>

                <p>
                Built a full-stack research tool that lets AI safety researchers fine-tune 
                language models and see exactly which training examples shaped the model's behavior — 
                turning fine-tuning from a black box into an auditable process.
                </p>

                <ul className="projects ul">
                <li>Computed influence scores live during training using gradient dot products, with no checkpoint storage required</li>
                <li>Ran serverless A100 GPU jobs on Modal with async status updates streamed to the frontend in real time</li>
                <li>Visualized per-example influence as animated heatmaps and ranked leaderboards for intuitive data auditing</li>
                <li>Designed a full job pipeline from data upload through fine-tuning to influence score delivery via Supabase Realtime</li>
                </ul>

                <p className="links">
                <a href="https://github.com/LCodingX/generalization-bet">GitHub</a> · <a href="https://frontend-tau-seven-58.vercel.app/runs" target="_blank" rel="noreferrer">Live Demo</a>
                </p>
            </div>
            
            <div className="project">
                <a href="https://interview-prep-platform-qxx5.onrender.com/" target="_blank" rel="noreferrer"><img src={interviewprep} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://interview-prep-platform-qxx5.onrender.com/" target="_blank" rel="noreferrer"><h2>Interview Prep Platform</h2></a>

                <p className="tech">Python · Flask · SQLite · SQLAlchemy · HTML/CSS/JS · Claude API</p>

                <p>
                Built a full-stack AI interview prep platform that generates personalized
                questions from resumes and job descriptions and provides structured performance feedback.
                </p>

                <ul className="projects ul">
                <li>Designed REST APIs for interview sessions, questions, and responses</li>
                <li>Integrated Claude API for dynamic question generation and answer grading</li>
                <li>Implemented persistent storage for interview history using SQLite</li>
                <li>Built a multi-step frontend flow for interview practice and results review</li>
                </ul>

                <p className="links">
                <a href="https://github.com/mp0549/ClaudeHacks-interview-prep-platform">GitHub</a> · <a href="https://interview-prep-platform-qxx5.onrender.com/">Live Demo</a>
                </p>
            </div>

            <div className="project">
                <a href="https://github.com/mp0549/COVID-19-Vaccine-Stance-Classification-FLAN-T5-Large" target="_blank" rel="noreferrer"><img src={covid} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/mp0549/COVID-19-Vaccine-Stance-Classification-FLAN-T5-Large" target="_blank" rel="noreferrer"><h2>Covid-19 Vaccine Stance Classification</h2></a>
                
                <p className="tech">Python · PyTorch · Hugging Face · FLAN-T5 · LoRA · bitsandbytes · scikit-learn</p>

                <p>
                Built a stance classification system to label tweets as in-favor, against, or neutral-or-unclear toward COVID-19 vaccination under tight data and GPU constraints.
                </p>

                <ul className="projects ul">
                <li>Fine-tuned FLAN-T5-Large using LoRA adapters, training on limited resources</li>
                <li>Designed a curriculum learning strategy to stabilize 3-way stance classification</li>
                <li>Mitigated failure modes including neutral collapse, sarcasm, and more</li>
                <li>Achieved improved macro-F1 and neutral recall compared to zero-shot and standard fine-tuning baselines</li>
                </ul>

                <p className="links">
                <a href="https://github.com/mp0549/COVID-19-Vaccine-Stance-Classification-FLAN-T5-Large">GitHub</a>
                </p>
            </div>
            <div className="project">
                <a href="https://github.com/mp0549/CheeseHacks2024MarioKart" target="_blank" rel="noreferrer"><img src={mariokart} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/mp0549/CheeseHacks2024MarioKart" target="_blank" rel="noreferrer"><h2>Gesture-based Game Control</h2></a>
                <p className="tech">Tech: Python · OpenCV · MediaPipe · Computer Vision</p>

                <p>
                Built a real-time, gesture-based controller that allows players to control Mario Kart using hand movements instead of a physical controller.
                </p>

                <ul className="projects ul">
                <li>Implemented real-time hand tracking and gesture recognition</li>
                <li>Mapped hand gestures to in-game controls such as steering, acceleration, and item usage</li>
                <li>Supported multiplayer by splitting camera feed for independent gesture control</li>
                <li>Optimized for low-latency input to ensure smooth and responsive gameplay</li>
                </ul>
                <p className="links">
                <a href="https://github.com/mp0549/CheeseHacks2024MarioKart">GitHub</a> · <a href="https://drive.google.com/file/d/1LpZbgyQJinmTIPZYtY_HWPHl5WWt8byf/view?usp=sharing">Demo Video</a>
                </p>
            </div>
            <div className="project">
                <a href="https://github.com/mp0549/Health-App" target="_blank" rel="noreferrer"><img src={healthapp} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/mp0549/Health-App" target="_blank" rel="noreferrer"><h2>Health App</h2></a>
                
                <p className="tech">Tech: React Native · Python · SQLite · Mobile App Development</p>

                <p>
                Designing and developing a beginner-friendly mobile health and fitness app focused on customizable workouts and accessibility.
                </p>

                <ul className="projects ul">
                <li>Built a React Native frontend with modular components for workout creation and tracking</li>

                <li>Designed backend logic using Python with local-first data storage via SQLite</li>

                <li>Planned a scalable full-stack architecture with future cloud sync support</li>
                <li>Researching AI-driven workout recommendations based on user goals, availability, and preferences</li>

                </ul>
                <p className="links">
                Status: Actively in development
                </p>
            </div>
            <div className="project">
                <a href="http://studentsuccessclub.org/" target="_blank" rel="noreferrer"><img src={ssc} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="http://studentsuccessclub.org/" target="_blank" rel="noreferrer"><h2>Student Success Club</h2></a>
                <p className="tech">Tech: React · Javascript · Node.js · APIs   · Full Stack App Development</p>

                <p>
                Designing and developing a beginner-friendly mobile health and fitness app focused on customizable workouts and accessibility.
                </p>

                <ul className="projects ul">
                <li>Designed and built a React website to advertise services, facilitate student-tutor connections, and improve accessibility</li>

                <li>Developed full-stack registration and contact forms, storing submissions in a database and enabling automated tutor-student matching</li>

                <li>Implemented real-time notifications to phone and email for new submissions</li>
                <li>Led a team of volunteer tutors and promoted peer support and educational equity through free, community-driven resources</li>

                </ul>
                <p className="links">
                <a href="http://studentsuccessclub.org/">Website</a> · <a href="https://github.com/mp0549/landing-NGO">GitHub</a>
                </p>
            </div>
        </div>
    </div>
    );
}

export default Project;