import React, { useEffect, useRef, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import national_trust_1 from './assets/national_trust_1.jpeg';
import zogs_1 from './assets/ZOGS_1.png'
import vscode_gpt_1 from './assets/vscode-gpt-1.png'
import receipt_ranger_1 from './assets/receipt-ranger-1.jpeg'
import zally_logo from './assets/zally-logo.jpeg';
import macro4 from './assets/macro-4.png';
import codeNinja from './assets/code-ninja.png'
import './App.css';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CRow, CCol, CCardFooter, CCarousel, CCarouselItem, CImage } from '@coreui/react';
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
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: backgroundColor,
      color: textColor,
      position: 'relative',
      paddingLeft: '10%',
      paddingRight: '10%'
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
    <div style={{ paddingTop: '60px', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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


  const projects = [
    { title: "VSCode GPT", description: "Visual Studio Code extension designed to improve & optimise workflow by allowing to chat with OpenAI's ChatGPT directly from your editor. You can use it to generate code or comments on the fly, or simply have conversations with it that are saved and persist in storage.", imageUrl: vscode_gpt_1 },
    { title: "Zak's Online Gaming Store", description: "ZOGS interfaces with either a MongoDB or Firebase Realtime Database to fetch and dynamically display a list of games on the webpage. The information pertaining to each game is modifiable by administrators who are granted permissions in the database. Administrators have the ability to add or remove games, and to view the website's 'logs'.", imageUrl: zogs_1 },
    { title: "National Trust Re-Design", description: "A prototype built with a refined touch to enhance user interaction and overall experience with the National Trust.", imageUrl: national_trust_1, verticalImg: true },
    { title: "Receipt Tracking App", description: "A mobile application written using React Native with expo-go. This prototype app functions as an expense tracker and uses optical character recognition (OCR) to save your expenses to a database.", imageUrl: receipt_ranger_1, verticalImg: true },
  ];

  const imgStyle = {
    objectFit: 'contain',
    maxHeight: '50rem'
  };
  const cardStyle = {
    maxWidth: '85rem'
  }

  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '10rem' }}>
      <CRow xs={{ cols: 1, gutter: 5 }} md={{ cols: 2 }}>
        <CCol xs>
          <CCard style={cardStyle}>
            {/*
          Carousel disabled for now
          <CCarousel controls indicators>
          <CCarouselItem>
            <CImage className="d-block w-100" src={projects[0].imageUrl} alt="slide 1" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={zogs_1} alt="slide 2" />
          </CCarouselItem>
          </CCarousel> */}
            <CCardImage orientation="top" src={projects[0].imageUrl} style={imgStyle} />
            <CCardBody>
              <CCardTitle>{projects[0].title}</CCardTitle>
              <CCardText>{projects[0].description}</CCardText>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Footer</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={cardStyle} >
            <CCardImage orientation="top" src={projects[1].imageUrl} style={imgStyle} />
            <CCardBody>
              <CCardTitle>{projects[1].title}</CCardTitle>
              <CCardText>{projects[1].description}</CCardText>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Footer</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={cardStyle} >
            <CCardImage orientation="top" src={projects[2].imageUrl} style={imgStyle} />
            <CCardBody>
              <CCardTitle>{projects[2].title}</CCardTitle>
              <CCardText>{projects[2].description}</CCardText>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Footer</small>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={cardStyle} >
            <CCardImage orientation="top" src={projects[3].imageUrl} style={imgStyle} />
            <CCardBody>
              <CCardTitle>{projects[3].title}</CCardTitle>
              <CCardText>{projects[3].description}</CCardText>
            </CCardBody>
            <CCardFooter>
              <small className="text-medium-emphasis">Footer</small>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};







const ExperienceContent = () => {

  const jobs = [
    { title: 'Zally', imageUrl: zally_logo, description: "At Zally, I play a pivotal role in ushering in a password-free future by leveraging AI & software development technologies to continuously verify users by learning and assessing their unique behavioural biometrics. This innovative solution is composed of a front-end SDK, written to facilitate a seamless user interface and to capture behavioural biometrics, and a backend API to connect the SDK with our cloud server, bridging the experience."},
    {title: "Macro 4", imageUrl: macro4, description: "In my second year at Bournemouth University, I joined Macro 4 as a placement student in software development. My role involved working with diverse teams and utilizing languages like Java, HTML, CSS, Assembler, and JavaScript on significant projects. I contributed notably to the Task Plan Editor, enhancing a digital process orchestration tool, and the InSync Web Application, which modified a Mainframe product for web integration. These experiences sharpened my technical skills, particularly in Mainframe technology, and its application in business."},
    {title: "Code Ninja", imageUrl: codeNinja, description: "At Code Ninjas, I embraced the opportunity to foster the next generation of tech enthusiasts, teaching fundamental coding skills to children aged 5 to 16. Our curriculum, modelled on the martial arts belt system, introduced students to JavaScript at the white belt level, progressing up to Unity and C# at the black belt level."}
  ];
  
  
  return (
  <div style={{ paddingTop: '10rem', paddingBottom: '10rem' }}>
    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CCol xs>
        <CCard className="mb-3" >
          <CRow className="g-0">
            <CCol md={2} style={{justifyContent: 'center', alignContent: 'center', display: 'flex', minWidth: '13rem'}} >
              <CCardImage src={jobs[0].imageUrl} />
            </CCol>
            <CCol>
              <CCardBody>
                <CCardTitle>{jobs[0].title}</CCardTitle>
                <CCardText>{jobs[0].description}</CCardText>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="mb-3" >
          <CRow className="g-0">
            <CCol md={2} style={{justifyContent: 'center', alignContent: 'center', display: 'flex', minWidth: '13rem'}}>
              <CCardImage src={jobs[1].imageUrl} />
            </CCol>
            <CCol>
              <CCardBody>
                <CCardTitle>{jobs[1].title}</CCardTitle>
                <CCardText>{jobs[1].description}</CCardText>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="mb-3" >
          <CRow className="g-0">
            <CCol md={2} style={{justifyContent: 'center', alignContent: 'center', display: 'flex', minWidth: '13rem'}}>
              <CCardImage src={jobs[2].imageUrl} />
            </CCol>
            <CCol>
              <CCardBody>
                <CCardTitle>{jobs[2].title}</CCardTitle>
                <CCardText>{jobs[2].description}</CCardText>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
    </CRow>
  </div>
);
}


const BlogContent = () => (
  <div style={{ height: '10vh' }}>
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
    { title: 'Projects', ref: projectsRef, ContentComponent: ProjectsContent, color: '#3B4C5A' },
    { title: 'Experience', ref: experienceRef, ContentComponent: ExperienceContent, color: '#3B4C5A' },
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
