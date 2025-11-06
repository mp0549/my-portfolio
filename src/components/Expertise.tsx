import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker, faPython } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Keras",
  "scikit-learn",
  "Transformers",
  "Hugging Face",
  "SentenceTransformers",
  "LangChain",
  "NLTK",
  "FastAPI",
  "Streamlit",
  "Flask",
  "OpenCV",
  "Mediapipe",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "Seaborn"
];

const labelsSecond = [
  "React",
  "React Native",
  "JavaScript",
  "Node.js",
  "Express",
  "HTML",
  "CSS",
  "PHP",
  "Hack",
  "Java",
  "C",
  "C++",
  "Bash",
  "Git",
  "GitHub Actions",
  "Linux",
  "REST APIs",
  "CI/CD",
  "System Design",
  "Testing",
  "Agile Methodologies",
  "API Development",
];

const labelsThird = [
  "Python",
  "R",
  "SQL",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Seaborn",
  "Plotly",
  "Tableau",
  "Power BI",
  "Excel",
  "Google Sheets",
  "Jupyter",
  "Data Cleaning",
  "Feature Engineering",
  "Model Evaluation",
  "A/B Testing",
  "Data Visualization",
  "SQLite",
  "MySQL",
  "PostgreSQL",
  "BigQuery"
];


function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faPython} size="3x"/>
                    <h3>Artificial Intelligence & Machine Learning</h3>
                    <p>I specialize in building, fine-tuning, and deploying modern machine learning and deep learning systems, from large language models (LLMs) to computer vision pipelines.
</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Software Engineering & Systems Design</h3>
                    <p>From full-stack web applications to scalable backend architectures, I build modular systems designed for performance, maintainability, and user experience.
</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>Data Science & Analytics</h3>
                    <p>I apply data-driven methods to uncover insights and support decision-making. My background spans data wrangling, visualization, and statistical modeling.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;