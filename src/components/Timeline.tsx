import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap, faFlask} from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

// function Timeline() {
//   return (
//     <div id="history">
//       <div className="items-container">
//         <h1>Career History</h1>
//         <VerticalTimeline>
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
//             contentArrowStyle={{ borderRight: '7px solid  white' }}
//             date="2022 - present"
//             iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
//             icon={<FontAwesomeIcon icon={faBriefcase} />}
//           >
//             <h3 className="vertical-timeline-element-title">Technology Consultant</h3>
//             <h4 className="vertical-timeline-element-subtitle">Dallas, TX</h4>
//             <p>
//               Full-stack Web Development, GenAI/LLM, Project Management, Business Development
//             </p>
//           </VerticalTimelineElement>
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             date="2020 - 2022"
//             iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
//             icon={<FontAwesomeIcon icon={faBriefcase} />}
//           >
//             <h3 className="vertical-timeline-element-title">Full Stack Engineer</h3>
//             <h4 className="vertical-timeline-element-subtitle">Laie, HI</h4>
//             <p>
//               Frontend Development, Backend Development, User Experience, Team Leading
//             </p>
//           </VerticalTimelineElement>
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             date="2021 - 2021"
//             iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
//             icon={<FontAwesomeIcon icon={faBriefcase} />}
//           >
//             <h3 className="vertical-timeline-element-title">Staff Engineer Intern</h3>
//             <h4 className="vertical-timeline-element-subtitle">Laie, HI</h4>
//             <p>
//               Full-stack Development, API Development, User Experience
//             </p>
//           </VerticalTimelineElement>
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             date="2020 - 2020"
//             iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
//             icon={<FontAwesomeIcon icon={faBriefcase} />}
//           >
//             <h3 className="vertical-timeline-element-title">Data Analyst Intern</h3>
//             <h4 className="vertical-timeline-element-subtitle">Tokyo, Japan</h4>
//             <p>
//               Automation, Data Governance, Statistical Analysis
//             </p>
//           </VerticalTimelineElement>
//         </VerticalTimeline>
//       </div>
//     </div>
//   );
// }

// export default Timeline;



function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>

          {/* UW Graphics Group Research */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Sep 2025 – Present"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faFlask} />}
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
          >
            <h3 className="vertical-timeline-element-title">UW Graphics Group · Madison, WI</h3>
            <h4 className="vertical-timeline-element-subtitle">Directed Study</h4>
            <ul>
              <li>Conduct research on guideline regularization for visualization design.</li>
              <li>Analyze a large, heterogeneous corpus of visualization guidelines to identify structural gaps limiting standardization and automation.</li>
              <li>Design and evaluate an LLM-assisted annotation pipeline for scalable guideline processing.</li>
              <li>Develop and refine a multidimensional representation schema to support synthesis and tooling.</li>
            </ul>
          </VerticalTimelineElement>

          {/* Meta Internship */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="May 2025 – July 2025"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
          >
            <h3 className="vertical-timeline-element-title">Meta · Menlo Park, CA</h3>
            <h4 className="vertical-timeline-element-subtitle">AI/Data Science & Full-Stack Intern</h4>
            <ul>
              <li>Designed and deployed an end-to-end production ML pipeline for unstructured text classification using LLaMA models.</li>
              <li>Improved robustness to noisy inputs and reduced misclassification by ~30% in deployment feedback analysis.</li>
              <li>Built a React-based analytics dashboard integrated with Meta’s internal stack.</li>
              <li>Defined data models and APIs with cross-functional partners, enabling 12+ teams to act on 100K+ weekly datapoints.</li>
              <li>Developed a scalable LLaMA-based agent framework for multi-step task execution.</li>
              <li>Refactored a large codebase into a compact, maintainable architecture with memory and agent chaining support.</li>
            </ul>
          </VerticalTimelineElement>

          {/* Jumpshot */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="March 2024 – April 2025"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
          >
            <h3 className="vertical-timeline-element-title">Jumpshot · Fountain Valley, CA (hybrid)</h3>
            <h4 className="vertical-timeline-element-subtitle">Technical Business Analyst (Part-time)</h4>
            <ul>
              <li>Contributed to Jumpshot, a mobile basketball training application.</li>
              <li>Acted as primary liaison between coaches and engineers, translating product requirements into technical implementation plans.</li>
              <li>Implemented frontend and backend features across the application stack.</li>
              <li>Supported CI/CD workflows and analytics integrations.</li>
              <li>Led testing and QA efforts, resolving issues pre-release to improve performance and user experience.</li>
            </ul>
          </VerticalTimelineElement>

          {/* Education */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2024 – Present"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
          >
            <h3 className="vertical-timeline-element-title">
              University of Wisconsin–Madison
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Computer Science B.S. & Statistics B.S.
            </h4>
            <ul>
              <li>Undergraduate dual major in Computer Science and Statistics.</li>
              <li>Directed study with UW Graphics Group focused on visualization design guideline research.</li>
              <li>Coursework includes Algorithms, Machine Learning, Artificial Intelligence, Computer Organization, Applied Regression Analysis, and Mathematical Statistics.</li>
            </ul>
          </VerticalTimelineElement>

          {/* InnoWinds Internship */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jun 2023 – Sep 2023"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
          >
            <h3 className="vertical-timeline-element-title">InnoWinds Inc · Remote</h3>
            <h4 className="vertical-timeline-element-subtitle">Software Intern</h4>
            <ul>
              <li>Contributed to development of PlexusHR, a hiring marketplace platform.</li>
              <li>Designed and implemented a resume parser to automate candidate data extraction.</li>
              <li>Reduced manual processing effort and improved pipeline efficiency.</li>
              <li>Built Tableau dashboards analyzing candidate skills, education trends, and profile distributions.</li>
              <li>Enhanced automation workflows through Python-based data extraction and analysis.</li>
            </ul>
          </VerticalTimelineElement>

          {/* Advent Global Solutions Internship */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="May 2022 – Aug 2022"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
          >
            <h3 className="vertical-timeline-element-title">Advent Global Solutions · Remote</h3>
            <h4 className="vertical-timeline-element-subtitle">Intern</h4>
            <ul>
              <li>Supported technical recruitment and IT consulting operations.</li>
              <li>Conducted resume screening and managed candidate data workflows.</li>
              <li>Coordinated across client hiring pipelines to streamline placement processes.</li>
            </ul>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;