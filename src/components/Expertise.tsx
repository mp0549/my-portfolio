import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCode, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';
import skills from '../data/expertise.json';

const icons: Record<string, IconDefinition> = {
    brain: faBrain,
    code: faCode,
    "chart-dots": faChartLine,
};

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <div className="skill" key={index}>
                        <FontAwesomeIcon icon={icons[skill.icon]} size="3x"/>
                        <h3>{skill.title}</h3>
                        <p>{skill.description}</p>
                        {skill.groups.map((group, gi) => (
                            <div className="skill-group" key={gi}>
                                <span className="skill-group-label">{group.label}</span>
                                <div className="flex-chips">
                                    {group.skills.map((label, i) => (
                                        <Chip key={i} className='chip' label={label} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default Expertise;
