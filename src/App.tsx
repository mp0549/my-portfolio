import React, {useState, useEffect} from "react";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
  Leadership,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    // Keep body class in sync for global styles that target the body
    useEffect(() => {
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(mode === 'dark' ? 'dark' : 'light');

      // cleanup on unmount (optional, ensures no lingering class)
      return () => {
        document.body.classList.remove('dark', 'light');
      };
    }, [mode]);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <FadeIn transitionDuration={700}>
            <Main/>
            <Timeline/>
            <Expertise/>
            <Project/>
            <Leadership/>
            <Contact/>
        </FadeIn>
        <Footer />
    </div>
    );
}

export default App;