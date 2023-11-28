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
const Header = ({ sections, scrollToSection }) => {

  const accentColor = '#FF6F61'; // Coral

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
      color: accentColor,
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
      {sections.map(section => (
          <div
            key={section.title}
            style={style.navItem}
            onClick={() => scrollToSection(section.ref)}
            onMouseEnter={applyHoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            {section.title}
          </div>
        ))}
      </div>
    </div>
  );
};

// Section Component
const Section = ({ id, title, children, refProp, backgroundColor, nextBackgroundColor }) => {
  const textColor = backgroundColor === '#3B4C5A' ? '#E0E0E0' : '#333333';

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
      backgroundColor: backgroundColor,
      color: textColor,
      position: 'relative'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      color: textColor,
      marginBottom: '20px',
    },
    sectionContent: {
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
      fontSize: '1.1rem',
      color: textColor,
    },
    gradientTop: {
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '30px', 
      background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
      zIndex: 1,
    },
    gradientBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '30px',
      background: `linear-gradient(to top, ${nextBackgroundColor}, transparent)`,
      zIndex: 1,
    },
  };

  return (
    <div ref={refProp} style={style.section} id={id}>
      <div style={style.gradientTop}></div>
      <h2 style={style.sectionTitle}>{title}</h2>
      <div style={style.sectionContent}>
        {children}
      </div>
      <div style={style.gradientBottom}></div>
    </div>
  );
};

const AboutContent = () => (
  <div>
    <p>This is the About Me section.</p>
  </div>
);

const ProjectsContent = () => (
  <div>
    <p>Projects Section</p>
  </div>
);

const ExperienceContent = () => (
  <div>
    <p>Experience</p>
  </div>
);

const ContactContent = () => (
  <div>
    <p>Contact</p>
  </div>
);


const Portfolio = () => {

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  
  
  const sections = [
    { title: 'About Me', ref: aboutRef, ContentComponent: AboutContent },
    { title: 'Projects', ref: projectsRef, ContentComponent: ProjectsContent },
    { title: 'Experience', ref: experienceRef, ContentComponent: ExperienceContent },
    { title: 'Contact', ref: contactRef, ContentComponent: ContactContent },
  ];
  const alternatingColors = ['#A3B7C0', '#B2B8A3']; 


  // Function to handle smooth scrolling and hash update
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.history.pushState({}, '', `#${ref.current.id}`);
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  

  // Effect to handle hash links (deep linking)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const sectionToScroll = sections.find(section => section.title.toLowerCase().replace(/\s+/g, '-') === hash);
    if (sectionToScroll) {
      scrollToSection(sectionToScroll.ref);
    }
  }, []);

  return (
    <div>
      <Header sections={sections} scrollToSection={scrollToSection} />
      {sections.map((section, index) => (
        <Section 
          key={section.title}
          id={section.title.toLowerCase().replace(/\s+/g, '-')} 
          title={section.title} 
          refProp={section.ref} 
          backgroundColor={alternatingColors[index % 2]}
          nextBackgroundColor={index < sections.length - 1 ? alternatingColors[(index + 1) % 2] : alternatingColors[index % 2]}
        >
          <section.ContentComponent />
        </Section>
      ))}
    </div>
  );
}

export default App;
