import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <Portfolio />
    </div>
  );
}

// Header Component
const Header = ({ scrollToSection }) => {
  const style = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#282c34',
      padding: '15px 20px',
      color: '#FFFFFF',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      fontFamily: 'Roboto, sans-serif',
    },
    navItems: {
      display: 'flex',
      alignItems: 'center'
    },
    navItem: {
      margin: '0 25px',
      textDecoration: 'none',
      color: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'color 0.3s, transform 0.3s',
      fontSize: '1rem',
    },
    navItemHover: {
      color: '#61dafb',
      transform: 'scale(1.1)'
    },
  };

  const applyHoverEffect = (e) => {
    e.target.style.color = style.navItemHover.color;
    e.target.style.transform = style.navItemHover.transform;
  };

  const removeHoverEffect = (e) => {
    e.target.style.color = 'rgba(255, 255, 255, 0.7)';
    e.target.style.transform = 'none';
  };

  return (
    <div style={style.header}>
      <div style={style.navItems}>
        <div style={style.navItem} onClick={() => scrollToSection('about')} onMouseEnter={applyHoverEffect} onMouseLeave={removeHoverEffect}>
          About Me
        </div>
        <div style={style.navItem} onClick={() => scrollToSection('projects')} onMouseEnter={applyHoverEffect} onMouseLeave={removeHoverEffect}>
          Projects
        </div>
        <div style={style.navItem} onClick={() => scrollToSection('experience')} onMouseEnter={applyHoverEffect} onMouseLeave={removeHoverEffect}>
          Experience
        </div>
        <div style={style.navItem} onClick={() => scrollToSection('contact')} onMouseEnter={applyHoverEffect} onMouseLeave={removeHoverEffect}>
          Contact
        </div>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ id, title, children, refProp }) => {
  const style = {
    section: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      paddingTop: '60px',
      backgroundColor: '#f5f5f5',
      color: '#333',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      color: '#282c34',
      marginBottom: '20px',
    },
    sectionContent: {
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontSize: '1.1rem',
    },
  };

  return (
    <div ref={refProp} style={style.section} id={id}>
      <h2 style={style.sectionTitle}>{title}</h2>
      <div style={style.sectionContent}>
        {children}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  // Function to handle smooth scrolling and hash update
  const scrollToSection = (sectionId) => {
    const ref = { about: aboutRef, projects: projectsRef, experience: experienceRef, contact: contactRef }[sectionId];
    window.history.pushState({}, '', `#${sectionId}`);
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  // Effect to handle hash links (deep linking)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) scrollToSection(hash);
  }, []);

  return (
    <div>
      <Header scrollToSection={scrollToSection} />
      <Section id="about" title="About Me" refProp={aboutRef}>
        {/* Content for About Me */}
      </Section>
      <Section id="projects" title="Projects" refProp={projectsRef}>
        {/* Content for Projects */}
      </Section>
      <Section id="experience" title="Experience" refProp={experienceRef}>
        {/* Content for Experience */}
      </Section>
      <Section id="contact" title="Contact" refProp={contactRef}>
        {/* Content for Contact */}
      </Section>
    </div>
  );
}

export default App;
