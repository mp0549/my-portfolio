import { useEffect, useRef, useState } from "react";
import "../assets/styles/leadership.scss";
import gdgLogo from "../assets/logos/gdg.png";
import waisiLogo from "../assets/logos/waisi.png";
import sscLogo from "../assets/logos/ssc.png";
import waAutoLogo from "../assets/logos/wa_autonomous.png";
import bajaLogo from "../assets/logos/baja.png";
import orgs from "../data/leadership.json";

const logos: Record<string, string> = {
  gdg: gdgLogo,
  waisi: waisiLogo,
  ssc: sscLogo,
  waAuto: waAutoLogo,
  baja: bajaLogo,
};

export default function Leadership() {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? orgs.length : 4;

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
    <div id="leadership">

    <section className="student-orgs-section items-container">
      <header className="section-header">
        <h2>Student Leadership</h2>
        <p>Leadership, initiative, and impact beyond coursework</p>
      </header>

      <div className="orgs-list">
        {orgs.slice(0, visibleCount).map((org, index) => (
          <div
            className="org-row"
            key={index}
            ref={index === 4 ? firstExtraRef : undefined}
          >
            <div className="org-left">
              <img src={logos[org.logo]} alt={`${org.org} logo`} />
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
    </section>
    </div>
  );
}
