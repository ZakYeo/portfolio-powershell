import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <Portfolio />
    </div>
  );
}

const Portfolio = () => {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  // Function to handle smooth scrolling and hash update
  const scrollToSection = (sectionId, ref) => {
    // Update the hash in the URL without page jump
    window.history.pushState({}, '', `#${sectionId}`);

    // Smooth scroll to the section
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  // Effect to handle hash links (deep linking)
  useEffect(() => {
    const hash = window.location.hash;
    switch(hash) {
      case '#about':
        scrollToSection('about', aboutRef);
        break;
      case '#projects':
        scrollToSection('projects', projectsRef);
        break;
      case '#experience':
        scrollToSection('experience', experienceRef);
        break;
      case '#contact':
        scrollToSection('contact', contactRef);
        break;
      default:
        // Handle default case
    }
  }, []);

  const style = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#282c34', // Dark background for contrast
      padding: '15px 20px',
      color: '#FFFFFF',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Deeper shadow for a floating effect
      fontFamily: 'Roboto, sans-serif', // Modern, clean font
    },
    navItems: {
      display: 'flex',
      alignItems: 'center'
    },
    navItem: {
      margin: '0 25px', // More spacing for a cleaner look
      textDecoration: 'none',
      color: 'rgba(255, 255, 255, 0.7)', // Slightly subdued color for normal state
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'color 0.3s, transform 0.3s', // Smooth transition for hover effects
      fontSize: '1rem', // Slightly larger font size
    },
    navItemHover: {
      color: '#61dafb', // Bright color for hover, for a pop effect
      transform: 'scale(1.1)' // Slightly larger on hover for emphasis
    },
    section: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      paddingTop: '60px',
      backgroundColor: '#f5f5f5', // Light background for sections
      color: '#333', // Dark text for contrast
      transition: 'background-color 0.3s' // Smooth background transition
    },
    sectionTitle: {
      fontSize: '2.5rem', // Larger title size
      color: '#282c34', // Title color matching header
      marginBottom: '20px', // Spacing below title
    },
    sectionContent: {
      maxWidth: '600px', // Limiting width for better readability
      margin: '0 auto', // Centering content
      lineHeight: '1.6', // Improved line height for readability
      fontSize: '1.1rem', // Slightly larger font size
    },
    sectionButton: {
      marginTop: '20px', // Spacing above the button
      padding: '10px 20px', // Padding inside the button
      backgroundColor: '#61dafb', // Button color matching header hover
      color: 'white', // Text color for button
      border: 'none', // No border
      borderRadius: '5px', // Rounded corners
      cursor: 'pointer', // Cursor change for interactivity
      transition: 'background-color 0.3s', // Smooth color transition
    },
    sectionButtonHover: {
      backgroundColor: '#282c34', // Dark color on hover
    },
    greeting: {
      fontSize: '2em',
      color: 'white'
    },
  };

  const applyHoverEffect = (e) => {
    e.target.style.color = style.navItemHover.color;
    e.target.style.transform = style.navItemHover.transform;
  };

  const removeHoverEffect = (e) => {
    e.target.style.color = `rgba(255, 255, 255, 0.7)`;
    e.target.style.transform = 'none';
  };

  return (
    <div>
      <div style={style.header}>
        <div style={style.navItems}>
          <div style={style.navItem} onClick={() => scrollToSection('about', aboutRef)} onMouseEnter={applyHoverEffect} onMouseLeave={removeHoverEffect}>
            About Me
          </div>
          <div style={style.navItem} onClick={() => scrollToSection('projects', projectsRef)} onMouseEnter={applyHoverEffect} onMouseLeave={removeHoverEffect}>
            Projects
          </div>
          <div style={style.navItem} onClick={() => scrollToSection('experience', experienceRef)} onMouseEnter={applyHoverEffect} onMouseLeave={removeHoverEffect}>
            Experience
          </div>
          <div style={style.navItem} onClick={() => scrollToSection('contact', contactRef)} onMouseEnter={applyHoverEffect} onMouseLeave={removeHoverEffect}>
            Contact
          </div>
        </div>
      </div>
      <div ref={aboutRef} style={style.section} id="about">
        <h2>About Me</h2>
        {/* Content for About Me */}
      </div>
      <div ref={projectsRef} style={style.section} id="projects">
        <h2>Projects</h2>
        {/* Content for Projects */}
      </div>
      <div ref={experienceRef} style={style.section} id="experience">
        <h2>Experience</h2>
        {/* Content for Experience */}
      </div>
      <div ref={contactRef} style={style.section} id="contact">
        <h2>Contact</h2>
        {/* Content for Contact */}
      </div>
    </div>
  );
}

export default App;
