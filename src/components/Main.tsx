import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src="https://media.licdn.com/dms/image/v2/D5603AQH-3yj9_PUnYg/profile-displayphoto-shrink_400_400/B56ZPkGqZKG4Ag-/0/1734698772284?e=1763596800&v=beta&t=Jz3lAQXZ0bjVFRqK_fJjLe-esPWL0_z1sKYdRSBD8lw" alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/mp0549" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/maananpurothi/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Maanan Purothi</h1>
          {/* <p>AI and Machine Learning</p>
          <p>Data Scientist</p>
          <p>Full Stack Dev</p> */}
          <p>Majoring in Computer Science and Statistics at the University of Wisconsin-Madison</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/mp0549" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/maananpurothi/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;