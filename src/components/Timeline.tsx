import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faFlask,
  faF,
} from "@fortawesome/free-solid-svg-icons";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "../assets/styles/Timeline.scss";

const timelineData = [
  {
    type: "work",
    icon: faFlask,
    date: "Sep 2025 – Present",
    title: "Equistamp · Remote",
    subtitle: "Research Engineer @ Redwood Research",
    bullets: [
      "Partnered with Redwood Research on the Equistamp project to study AI safety and the dynamics of detecting deliberate sabotage in machine learning research.",
      "Audited paper-codebase pairs to identify compromised logic or configuration settings.",
      "Executed ML experiments to qualitatively prove how hidden malicious code altered key findings.",
    ],
  },
  {
    type: "work",
    icon: faFlask,
    date: "Sep 2025 – Present",
    title: "UW Graphics Group · Madison, WI",
    subtitle: "Directed Study",
    bullets: [
      "Investigated representational limitations of visualization design guidelines for automated synthesis.",
      "Constructed and analyzed a corpus of 1.5K+ guidelines across 49 sources to examine inconsistencies in existing frameworks.",
      "Designed and evaluated an LLM-assisted pipeline to probe assumptions and scalability of guideline structuring.",
      "Developed a 7-dimension classification schema to support systematic analysis and cross-source comparison; authoring a conference paper on findings.",
    ],
  },
  {
    type: "work",
    icon: faBriefcase,
    date: "May 2025 – July 2025",
    title: "Meta · Menlo Park, CA",
    subtitle: "AI/Data Science & Full-Stack Intern",
    bullets: [
      "Designed and deployed an end-to-end production ML pipeline for unstructured text classification using LLaMA models.",
      "Improved robustness to noisy inputs and reduced misclassification by ~30% in deployment feedback analysis.",
      "Built a React-based analytics dashboard integrated with Meta’s internal stack.",
      "Defined data models and APIs with cross-functional partners, enabling 12+ teams to act on 100K+ weekly datapoints.",
      "Developed a scalable LLaMA-based agent framework for multi-step task execution.",
      "Refactored a large codebase into a compact, maintainable architecture with memory and agent chaining support.",
    ],
  },
  {
    type: "work",
    icon: faBriefcase,
    date: "March 2024 – April 2025",
    title: "Jumpshot · Fountain Valley, CA (hybrid)",
    subtitle: "Technical Business Analyst",
    bullets: [
      "Contributed to Jumpshot, a mobile basketball training application.",
      "Acted as primary liaison between coaches and engineers, translating product requirements into technical implementation plans.",
      "Implemented frontend and backend features across the application stack.",
      "Supported CI/CD workflows and analytics integrations.",
      "Led testing and QA efforts, resolving issues pre-release to improve performance and user experience.",
    ],
  },
  {
    type: "education",
    icon: faGraduationCap,
    date: "2024 – Present",
    title: "University of Wisconsin–Madison",
    subtitle: "Computer Science B.S. & Statistics B.S.",
    bullets: [
      "Undergraduate dual major in Computer Science and Statistics.",
      "Directed study with UW Graphics Group focused on visualization design guideline research.",
      "Coursework includes Algorithms, Machine Learning, Artificial Intelligence, Computer Organization, Applied Regression Analysis, and Mathematical Statistics.",
    ],
  },
  {
    type: "work",
    icon: faBriefcase,
    date: "Jun 2023 – Sep 2023",
    title: "InnoWinds Inc · Remote",
    subtitle: "Software Intern",
    bullets: [
      "Contributed to development of PlexusHR, a hiring marketplace platform.",
      "Designed and implemented a resume parser to automate candidate data extraction.",
      "Reduced manual processing effort and improved pipeline efficiency.",
      "Built Tableau dashboards analyzing candidate skills, education trends, and profile distributions.",
      "Enhanced automation workflows through Python-based data extraction and analysis.",
    ],
  },
  {
    type: "work",
    icon: faBriefcase,
    date: "May 2022 – Aug 2022",
    title: "Advent Global Solutions · Remote",
    subtitle: "Intern",
    bullets: [
      "Supported technical recruitment and IT consulting operations.",
      "Conducted resume screening and managed candidate data workflows.",
      "Coordinated across client hiring pipelines to streamline placement processes.",
    ],
  },
];

export default function Timeline() {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? timelineData.length : 4;

  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>

        <VerticalTimeline>
          {timelineData.slice(0, visibleCount).map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className={`vertical-timeline-element--${item.type}`}
              date={item.date}
              iconStyle={{ background: "#5000ca", color: "white" }}
              icon={<FontAwesomeIcon icon={item.icon} />}
              contentStyle={{ background: "white", color: "rgb(39, 40, 34)" }}
              contentArrowStyle={{ borderRight: "7px solid white" }}
            >
              <h3 className="vertical-timeline-element-title">
                {item.title}
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                {item.subtitle}
              </h4>
              <ul>
                {item.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {timelineData.length > 4 && (
          <div
            className={`expand-bubble ${expanded ? "expanded" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => setExpanded(!expanded)}
            onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
          >
            <span className="chevron" />
          </div>
        )}
      </div>
    </div>
  );
}
