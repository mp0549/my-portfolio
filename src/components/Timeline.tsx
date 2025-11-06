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
            <h3 className="vertical-timeline-element-title">Undergraduate Research Assistant</h3>
            <h4 className="vertical-timeline-element-subtitle">UW Graphics Group · Madison, WI</h4>
            <p>
              Contributing to research on data visualization design and interpretation, exploring how NLP and LLMs can generate effective visualization guidelines. 
              Developing and evaluating pipelines that analyze written descriptions, user feedback, and visualization metadata. 
              Using LLMs for summarization, pattern extraction, and recommendation generation to support automated guideline creation, 
              while collaborating with graduate researchers at the intersection of HCI, data visualization, and machine learning.
            </p>
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
            <h3 className="vertical-timeline-element-title">AI/Data Science & Full-Stack Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Meta · Menlo Park, CA</h4>
            <p>
              Contributing to enterprise-grade AI and data systems through full-stack development and LLM integration. 
              Working on tools that combine data analytics, backend automation, and GenAI workflows to enhance product intelligence and user experience.
            </p>
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
              Computer Science B.S. & Statistics B.S.
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              University of Wisconsin–Madison · Madison, WI
            </h4>
            <p>
              Junior standing.
            </p>
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
            <h3 className="vertical-timeline-element-title">Software Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">InnoWinds Inc · Fountain Valley, CA </h4>
            <p>
              Contributed to the development of PlexusHR, a next-generation hiring marketplace. 
              Designed and implemented a resume parser module to automate candidate data extraction, 
              reducing manual effort and improving efficiency. 
              Built a Tableau dashboard providing insights into candidate profiles, skill distributions, and education trends. 
              Strengthened the company’s automation pipeline through Python-based data extraction and analysis.
            </p>
          </VerticalTimelineElement>

          {/* Advent Global Solutions Internship */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="May 2022 – Sep 2022"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
          >
            <h3 className="vertical-timeline-element-title">Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Advent Global Solutions · Fountain Valley, CA </h4>
            <p>
              Assisted in technical recruitment and IT consulting operations. 
              Managed resume screening, background verification, and internal candidate databases. 
              Supported the hiring pipeline by sourcing and evaluating candidates, improving efficiency and communication across client projects.
            </p>
          </VerticalTimelineElement>


        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;