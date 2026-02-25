import { useState } from "react";
import "../assets/styles/leadership.scss";
import gdgLogo from "../assets/logos/gdg.png";
import waisiLogo from "../assets/logos/waisi.png";
import sscLogo from "../assets/logos/ssc.png";
import waAutoLogo from "../assets/logos/wa_autonomous.png";
import bajaLogo from "../assets/logos/baja.png";

const orgs = [
  {
    logo: gdgLogo,
    role: "Senior Consultant",
    org: "Google Developer Groups",
    date: "Jul 2025 - Present · Madison, WI",
    bullets: [
      "Organized developer workshops and advised on technical content and speaker engagement",
      "Recruited 150+ members through targeted outreach and event planning",
    ],
  },
  {
    logo: waisiLogo,
    role: "Fundamentals Cohort Leader",
    org: "Wisconsin AI Safety Initiative",
    date: "Oct 2025 - Present · Madison, WI",
    bullets: [
      "Lead a cohort of students pursuing technical AI safety, facilitating discussions and learning sessions",
      "Update and refine curriculum to incorporate the latest AI safety research and materials from BlueDot Impact curriculum",
      "Participate in a reading group and conduct structured research replications of relevant papers",
      "Completed technical AI safety training in reward specification, interpretability, and adversarial evaluation",
      "Studied AI policy frameworks including compute governance and international coordination",
    ],
  },
  {
    logo: waAutoLogo,
    role: "Perception Engineer & Mentor",
    org: "Wisconsin Autonomous – Autodrive Challenge",
    date: "Sep 2024 – Present · Madison, WI",
    bullets: [
      "Developed computer vision algorithms for detection, lane recognition, and segmentation",
      "Reduced compute cost by 40% through optimized trajectory mapping",
      "Mentored two engineers on CV fundamentals and integration workflows",
    ],
  },
  {
    logo: sscLogo,
    role: "Founder & Tutor",
    org: "Student Success Club",
    date: "Nov 2022 – Present · Fountain Valley, CA",
    bullets: [
      "Launched a student-run tutoring initiative providing free, personalized academic support",
      "Built a React website to connect students with tutors and streamline services",
      "Advocated for educational equity through peer-driven community support",
    ],
  },
  {
    logo: bajaLogo,
    role: "Mechanical Engineer",
    org: "Baja SAE",
    date: "Sep 2024 – May 2025",
    bullets: [
      "Designed and assembled an off-road vehicle for competitive Baja SAE events",
      "Applied SolidWorks and hands-on fabrication to improve durability and performance",
      "Collaborated with a multidisciplinary team to integrate mechanical subsystems",
    ],
  },
];

export default function Leadership() {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? orgs.length : 4;

  return (
    <div id="leadership">

    <section className="student-orgs-section items-container">
      <header className="section-header">
        <h2>Student Leadership</h2>
        <p>Leadership, initiative, and impact beyond coursework</p>
      </header>

      <div className="orgs-list">
        {orgs.slice(0, visibleCount).map((org, index) => (
          <div className="org-row" key={index}>
            <div className="org-left">
              <img src={org.logo} alt={`${org.org} logo`} />
              <div className="org-meta">
                <h3>{org.role}</h3>
                <p className="org-name">{org.org}</p>
                <p className="org-date">{org.date}</p>
              </div>
            </div>

            <div className="org-right">
              <ul>
                {org.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {orgs.length > 4 && (
        <div
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
    </section>
    </div>
  ); 
}
