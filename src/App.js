import React, { useEffect, useRef, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import national_trust_1 from './assets/national_trust_1.jpeg';
import zogs_1 from './assets/ZOGS_1.png'
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
  const [hoveredHome, setHoveredHome] = React.useState(false);

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
  const homeIconStyle = {
    ...style.navItem,
    fontSize: '1.5rem',
    ...(hoveredHome ? style.navItemHover : {}),
  };

  const onHomeMouseEnter = () => setHoveredHome(true);
  const onHomeMouseLeave = () => setHoveredHome(false);

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
        {sections.map(section => {
          const isAboutSection = section.title === 'About Me';
          return (
            <div
              key={section.title}
              style={isAboutSection ? homeIconStyle : style.navItem}
              onClick={() => scrollToSection(section.ref)}
              onMouseEnter={isAboutSection ? onHomeMouseEnter : applyHoverEffect}
              onMouseLeave={isAboutSection ? onHomeMouseLeave : removeHoverEffect}
            >
              {isAboutSection ? <FaHome /> : section.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Section Component
const Section = ({ id, children, refProp, backgroundColor, nextBackgroundColor }) => {
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
      maxWidth: '95%',
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
      height: '60px', 
      background: `linear-gradient(to bottom, ${backgroundColor}, transparent 70%)`,  
      zIndex: 1,
    },
    gradientBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '60px',
      background: `linear-gradient(to top, ${nextBackgroundColor}, transparent 70%)`, 
      zIndex: 1,
    },
  };

  return (
    <div ref={refProp} style={style.section} id={id}>
      <div style={style.gradientTop}></div>
      <div style={style.sectionContent}>
        {children}
      </div>
      <div style={style.gradientBottom}></div>
    </div>
  );
};

const AboutContent = () => {
  const iconStyle = {
    cursor: 'pointer',
    margin: '0 10px',
    fontSize: '24px', 
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'color 0.3s, transform 0.3s',
  };

  const hoverStyle = {
    color: '#FF6F61', // Hover color
    transform: 'scale(1.1)' // Enlarge effect
  };

  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  const applyIconHoverEffect = (iconName) => {
    setHoveredIcon(iconName);
  };

  const removeIconHoverEffect = () => {
    setHoveredIcon(null);
  };

  const handleIconClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem' }}>Hey! 👋</h2>
      <h2>I'm Zak Yeomanson.</h2>
      <div>
        <FaLinkedin 
          style={hoveredIcon === 'linkedin' ? {...iconStyle, ...hoverStyle} : iconStyle}
          onMouseEnter={() => applyIconHoverEffect('linkedin')}
          onMouseLeave={removeIconHoverEffect}
          onClick={() => handleIconClick('https://www.linkedin.com/in/zak-yeomanson/')}
        />
        <FaGithub 
          style={hoveredIcon === 'github' ? {...iconStyle, ...hoverStyle} : iconStyle}
          onMouseEnter={() => applyIconHoverEffect('github')}
          onMouseLeave={removeIconHoverEffect}
          onClick={() => handleIconClick('https://github.com/ZakYeo')}
        />
        <FaEnvelope 
          style={hoveredIcon === 'email' ? {...iconStyle, ...hoverStyle} : iconStyle}
          onMouseEnter={() => applyIconHoverEffect('email')}
          onMouseLeave={removeIconHoverEffect}
          onClick={() => handleIconClick('mailto:zakyeomanson@gmail.com')}
        />
      </div>
    </div>
  );
};



const ProjectsContent = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState(null);
  const exampleProjects = [
    { title: "Zak's Online Gaming Store", description: "An engaging and interactive online store for all gaming needs.", imageUrl: zogs_1 }, // Update the path accordingly
    { title: "National Trust Re-Design", description: "A prototype built with a refined touch to enhance user interaction and overall experience with the National Trust.", imageUrl: national_trust_1 }, // Update the path accordingly
  ];

  useEffect(() => {
    setCurrentProject(exampleProjects[currentProjectIndex]);
  }, [currentProjectIndex]);

  const navigateRight = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % exampleProjects.length);
  };

  const navigateLeft = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + exampleProjects.length) % exampleProjects.length);
  };

  const projectStyle = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px 0',
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      flexBasis: '100%',
    },cardContainerVertical: {
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      maxWidth: '600px', 
      margin: '20px auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    },

    cardContainerHorizontal: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      maxWidth: '1200px',
      margin: '20px auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    },
    imageCard: {
      flexBasis: '50%', 
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      marginRight: '20px', 
      textAlign: 'center',
    },
    textCard: {
      flexBasis: '50%',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      padding: '20px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    image: {
      width: '100%', 
      height: 'auto',
    },
    title: {
      fontSize: '1.8rem',
      margin: '10px 0',
    },
    description: {
      fontSize: '1.2rem',
    },
    arrow: {
      fontSize: '2rem',
      cursor: 'pointer',
      userSelect: 'none',
    },
  };

  const getImageStyle = (project) => ({
    width: project.title.includes("Zak's Online Gaming Store") ? '100%' : '50%',
    height: 'auto',
    objectFit: 'contain',
  });

  return (
    <div style={projectStyle.container}>
      <span style={projectStyle.arrow} onClick={navigateLeft}>{"<"}</span>
      {currentProject && (currentProject.title.includes("Zak's Online Gaming Store") ? (
        <div style={projectStyle.cardContainerVertical}>
          <img 
            style={getImageStyle(currentProject)} 
            src={currentProject.imageUrl} 
            alt={currentProject.title} 
          />
          <div>
            <h3 style={projectStyle.title}>{currentProject.title}</h3>
            <p style={projectStyle.description}>{currentProject.description}</p>
          </div>
        </div>
      ) : (
        <div style={projectStyle.cardContainerHorizontal}>
          <img 
            style={getImageStyle(currentProject)} 
            src={currentProject.imageUrl} 
            alt={currentProject.title} 
          />
          <div style={{ width: '45%' }}>
            <h3 style={projectStyle.title}>{currentProject.title}</h3>
            <p style={projectStyle.description}>{currentProject.description}</p>
          </div>
        </div>
      ))}
      <span style={projectStyle.arrow} onClick={navigateRight}>{">"}</span>
    </div>
  );
};







const ExperienceContent = () => (
  <div>
    <p>Experience</p>
  </div>
);

const BlogContent = () => (
  <div>
    <p>Blog</p>
  </div>
);


const Portfolio = () => {

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const blogRef = useRef(null);
  
  
  const sections = [
    { title: 'About Me', ref: aboutRef, ContentComponent: AboutContent },
    { title: 'Projects', ref: projectsRef, ContentComponent: ProjectsContent },
    { title: 'Experience', ref: experienceRef, ContentComponent: ExperienceContent },
    { title: 'Blog', ref: blogRef, ContentComponent: BlogContent },
  ];
  const alternatingColors = ['#A3B7C0', '#3B4C5A']; 


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
