import React, { useEffect, useRef, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import national_trust_1 from './assets/national_trust_1.jpeg';
import zogs_1 from './assets/ZOGS_1.png'
import vscode_gpt_1 from './assets/vscode-gpt-1.png'
import receipt_ranger_1 from './assets/receipt-ranger-1.jpeg'
import './App.css';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CRow, CCol, CCardFooter } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
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
      padding: '15px 0px 15px 0px',
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
      backgroundColor: backgroundColor,
      color: textColor,
      position: 'relative'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      color: textColor,
      marginBottom: '20px',
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
      {children}
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
    <div style={{ paddingTop: '60px' }}>
      <h2 style={{ fontSize: '2.5rem' }}>Hey! 👋</h2>
      <h2>I'm Zak Yeomanson.</h2>
      <div>
        <FaLinkedin
          style={hoveredIcon === 'linkedin' ? { ...iconStyle, ...hoverStyle } : iconStyle}
          onMouseEnter={() => applyIconHoverEffect('linkedin')}
          onMouseLeave={removeIconHoverEffect}
          onClick={() => handleIconClick('https://www.linkedin.com/in/zak-yeomanson/')}
        />
        <FaGithub
          style={hoveredIcon === 'github' ? { ...iconStyle, ...hoverStyle } : iconStyle}
          onMouseEnter={() => applyIconHoverEffect('github')}
          onMouseLeave={removeIconHoverEffect}
          onClick={() => handleIconClick('https://github.com/ZakYeo')}
        />
        <FaEnvelope
          style={hoveredIcon === 'email' ? { ...iconStyle, ...hoverStyle } : iconStyle}
          onMouseEnter={() => applyIconHoverEffect('email')}
          onMouseLeave={removeIconHoverEffect}
          onClick={() => handleIconClick('mailto:zakyeomanson@gmail.com')}
        />
      </div>
    </div>
  );
};



const ProjectsContent = () => {

  const [flexDirection, setFlexDirection] = useState("")
  const [projectIndex, setProjectIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const contentRef = useRef(null);

  const projects = [
    { title: "National Trust Re-Design", description: "A prototype built with a refined touch to enhance user interaction and overall experience with the National Trust.", imageUrl: national_trust_1, verticalImg: true },
    { title: "VSCode GPT", description: "Visual Studio Code extension designed to improve & optimise workflow by allowing to chat with OpenAI's ChatGPT directly from your editor. You can use it to generate code or comments on the fly, or simply have conversations with it that are saved and persist in storage.", imageUrl: vscode_gpt_1 },
    { title: "Zak's Online Gaming Store", description: "Built using Python's Flask library for the backend and HTML, CSS & JavaScript for the frontend. ZOGS interfaces with either a MongoDB or Firebase Realtime Database to fetch and dynamically display a list of games on the webpage. The information pertaining to each game is modifiable by administrators who are granted permissions in the database. In addition to editing game information, administrators have the ability to add or remove games, and to view the website's 'logs'. ZOGS Gaming Store also interacts with two APIs: The Cloudinary API: Handles the saving of images in the database. The Steam API: Allows the viewing of the top achievements for the selected game.", imageUrl: zogs_1 },
    { title: "Receipt Tracking App", description: "A mobile application written using React Native with expo-go. This prototype app functions as an expense tracker and uses optical character recognition (OCR) to save your expenses to a database.", imageUrl: receipt_ranger_1, verticalImg: true },
  ];

  const handleClick = (direction) => {
    let newIndex = projectIndex + direction;


    if (newIndex < 0) {
      // Out of range, loop
      newIndex = projects.length - 1;
    } else if (newIndex >= projects.length) {
      // Out of range, loop
      newIndex = 0;
    }

    // Set flex direction based on project
    if (projects[newIndex].title === "VSCode GPT" ||
      projects[newIndex].title === "Zak's Online Gaming Store"
    ) {
      setFlexDirection('column');
    } else {
      setFlexDirection("")
    }

    setProjectIndex(newIndex);

  }

  useEffect(() => {
    const checkScroll = () => {
      const element = contentRef.current;
      if (element) {
        // Check if the content height is greater than the container height
        setCanScroll(element.scrollHeight > element.clientHeight);
      }
    };
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [projectIndex]);


  return (
    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
      <span style={{ display: 'flex', alignItems: 'center', padding: '0.4rem' }} onClick={() => handleClick(-1)}>{"<"}</span>
      <CCard className="mb-3" style={{display: 'flex', alignItems: 'center', width: '80%', height: '100%', maxWidth: projects[projectIndex].verticalImg ? '40rem': '130rem'}}>
        <CCardImage orientation="top" src={projects[projectIndex].imageUrl} style={{maxHeight: projects[projectIndex].verticalImg ? '70vh' : '', objectFit: 'contain'}} />
        <CCardBody style={{overflow: 'scroll'}}>
          <CCardTitle>{projects[projectIndex].title}</CCardTitle>
          <CCardText style={{maxHeight: '30vh', overflow: 'scroll'}}>{projects[projectIndex].description}</CCardText>
          <CCardText ><small className="text-medium-emphasis">Last updated 3 mins ago</small></CCardText>
        </CCardBody>
      </CCard>
      <span style={{ display: 'flex', alignItems: 'center', padding: '0.4rem' }} onClick={() => handleClick(1)}>{">"}</span>
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
    { title: 'About Me', ref: aboutRef, ContentComponent: AboutContent, color: '#A3B7C0' }, 
    { title: 'Experience', ref: experienceRef, ContentComponent: ExperienceContent, color: '#3B4C5A' }, 
    { title: 'Projects', ref: projectsRef, ContentComponent: ProjectsContent, color: '#3B4C5A' }, 
    { title: 'Blog', ref: blogRef, ContentComponent: BlogContent, color: '#A3B7C0' }, 
  ];


  // Function to handle smooth scrolling and hash update
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.history.pushState({}, '', `#${ref.current.id}`);
      window.scrollTo({
        top: ref.current.offsetTop - 60, // Account for gradient
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
      {sections.map((section, index) => {
        // Determine the current and next section's colors
        const currentColor = section.color;
        const nextSection = sections[index + 1];
        const nextColor = nextSection ? nextSection.color : currentColor;

        return (
          <Section
            key={section.title}
            id={section.title.toLowerCase().replace(/\s+/g, '-')}
            refProp={section.ref}
            backgroundColor={currentColor}
            nextBackgroundColor={nextColor}
          >
            <section.ContentComponent />
          </Section>
        );
      })}
    </div>
  );
}

export default App;
