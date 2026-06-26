import { Fragment, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import "../assets/styles/Timeline.scss";
import timelineDataRaw from "../data/timeline.json";
import GlossaryText from "./GlossaryText";

const icons: Record<string, IconDefinition> = {
  briefcase: faBriefcase,
  graduationCap: faGraduationCap,
  flask: faFlask,
};

type Position = {
  title: string;
  org: string;
  date?: string;
  bullets: string[];
};

type TimelineItem = {
  type: string;
  icon: string;
  date: string;
  title: string;
  subtitle?: string;
  description?: string;
  bullets?: string[];
  positions?: Position[];
};

const timelineData = timelineDataRaw as TimelineItem[];

export default function Timeline() {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? timelineData.length : 4;

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
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>

        <VerticalTimeline>
          {timelineData.slice(0, visibleCount).map((item, index) => (
            <Fragment key={index}>
              {index === 4 && (
                <div ref={firstExtraRef} aria-hidden="true" />
              )}
            <VerticalTimelineElement
              className={`vertical-timeline-element--${item.type}`}
              date={item.date}
              position={index % 2 === 0 ? "left" : "right"}
              iconStyle={{ background: "#5000ca", color: "white" }}
              icon={<FontAwesomeIcon icon={icons[item.icon]} />}
              contentStyle={{ background: "white", color: "rgb(39, 40, 34)" }}
              contentArrowStyle={{ borderRight: "7px solid white" }}
            >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              {item.subtitle && (
                <h4 className="vertical-timeline-element-subtitle">
                  {item.subtitle}
                </h4>
              )}
              {item.description && (
                <p className="timeline-description">{item.description}</p>
              )}

              {item.positions ? (
                <div className="timeline-positions">
                  {item.positions.map((pos, pi) => {
                    const [orgName, ...orgRest] = pos.org.split(" · ");
                    const orgSuffix = orgRest.join(" · ");
                    return (
                      <div key={pi} className="timeline-position">
                        <div className="timeline-position-header">
                          <h5 className="timeline-position-title">
                            <span className="timeline-position-org-name">
                              {orgName}
                            </span>
                            <span className="timeline-position-role">
                              {" · "}
                              {pos.title}
                              {orgSuffix && ` · ${orgSuffix}`}
                            </span>
                          </h5>
                          {pos.date && (
                            <span className="timeline-position-date">
                              {pos.date}
                            </span>
                          )}
                        </div>
                        <ul>
                          {pos.bullets.map((bullet, i) => (
                            <li key={i}>
                              <GlossaryText>{bullet}</GlossaryText>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <ul>
                  {item.bullets?.map((bullet, i) => (
                    <li key={i}>
                      <GlossaryText>{bullet}</GlossaryText>
                    </li>
                  ))}
                </ul>
              )}
            </VerticalTimelineElement>
            </Fragment>
          ))}
        </VerticalTimeline>

        {timelineData.length > 4 && (
          <div
            ref={bubbleRef}
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
