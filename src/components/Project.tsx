import React, { useEffect, useRef, useState } from "react";
import ssc from '../assets/images/ssc.png';
import covid from '../assets/images/covid.png';
import healthapp from '../assets/images/Health App.png';
import interviewprep from '../assets/images/interviewprep.jpeg';
import mariokart from '../assets/images/mariokartgameplay.jpg';
import influencedashboard from '../assets/images/influencedashboard.png';
import '../assets/styles/Project.scss';
import projects from '../data/projects.json';
import GlossaryText from './GlossaryText';

const images: Record<string, string> = {
    ssc,
    covid,
    healthapp,
    interviewprep,
    mariokart,
    influencedashboard,
};

type ProjectLink = { label: string; href: string };
type ProjectItem = {
    image: string;
    imageHref: string;
    titleHref: string;
    title: string;
    tech: string;
    description: string;
    bullets: string[];
    links?: ProjectLink[];
    status?: string;
};

function Project() {
    const projectList = projects as ProjectItem[];
    const [expanded, setExpanded] = useState(false);
    const visibleCount = expanded ? projectList.length : 4;

    const firstExtraRef = useRef<HTMLDivElement>(null);
    const bubbleRef = useRef<HTMLDivElement>(null);
    const prevExpanded = useRef(expanded);

    useEffect(() => {
        if (prevExpanded.current === expanded) return;
        prevExpanded.current = expanded;

        const target = expanded ? firstExtraRef.current : bubbleRef.current;

        requestAnimationFrame(() => {
            target?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }, [expanded]);

    return (
        <div className="projects-container" id="projects">
            <h1>Personal Projects</h1>
            <div className="projects-grid">
                {projectList.slice(0, visibleCount).map((p, index) => (
                    <div
                        className={`project ${index >= 4 ? "project-extra" : ""}`}
                        key={index}
                        ref={index === 4 ? firstExtraRef : undefined}
                    >
                        <a href={p.imageHref} target="_blank" rel="noreferrer">
                            <img src={images[p.image]} className="zoom" alt="thumbnail" width="100%" />
                        </a>
                        <a href={p.titleHref} target="_blank" rel="noreferrer">
                            <h2>{p.title}</h2>
                        </a>

                        <p className="tech">{p.tech}</p>

                        <p><GlossaryText>{p.description}</GlossaryText></p>

                        <ul className="projects ul">
                            {p.bullets.map((b, i) => (
                                <li key={i}><GlossaryText>{b}</GlossaryText></li>
                            ))}
                        </ul>

                        <p className="links">
                            {p.status
                                ? `Status: ${p.status}`
                                : p.links?.map((link, i) => (
                                      <React.Fragment key={i}>
                                          {i > 0 && ' · '}
                                          <a href={link.href} target="_blank" rel="noreferrer">
                                              {link.label}
                                          </a>
                                      </React.Fragment>
                                  ))}
                        </p>
                    </div>
                ))}
            </div>

            {projectList.length > 4 && (
                <div
                    ref={bubbleRef}
                    className={`expand-bubble ${expanded ? "expanded" : ""}`}
                    role="button"
                    aria-expanded={expanded}
                    tabIndex={0}
                    onClick={() => setExpanded(!expanded)}
                    onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
                >
                    <span className="chevron" />
                </div>
            )}
        </div>
    );
}

export default Project;
