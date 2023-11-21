import logo from './logo.svg';

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <Portfolio />
    </div>
  );
}


const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Modified closeMenu function
  const closeMenu = (event) => {
    if (menuOpen && event.target !== burgerMenuRef.current) {
      setMenuOpen(false);
    }
  };

  // Reference to the burger menu element
  const burgerMenuRef = useRef(null);

  // Effect to bind and unbind the click event
  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]); // This effect runs only when menuOpen changes

  const style = {
    container: {
      fontFamily: 'Arial, sans-serif',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#007bff', // Complimentary colored background
      color: '#fff',
      position: 'relative',
    },
    greeting: {
      fontSize: '2em',
      textAlign: 'center',
    },
    burgerMenu: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      cursor: 'pointer',
      display: menuOpen ? 'none' : 'block'
    },
    menu: {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)', // Slide in effect
      width: '200px',
      height: '100%',
      color: 'black',
      padding: '20px',
      transition: 'transform 0.3s ease-in-out',
    },
    menuItem: {
      margin: '20px 0',
      textDecoration: 'none',
      color: '#000', // Changed color to black
      display: 'block',
      padding: '10px 0',
      transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover effect
      cursor: 'pointer',
    },
    menuItemHover: {
      backgroundColor: '#f0f0f0', // Light grey background on hover
      color: '#007bff', // Change text color on hover
    }
  };

  const applyHoverEffect = (e) => {
    e.target.style.backgroundColor = style.menuItemHover.backgroundColor;
    e.target.style.color = style.menuItemHover.color;
  };

  // Function to remove hover effect
  const removeHoverEffect = (e) => {
    e.target.style.backgroundColor = '';
    e.target.style.color = style.menuItem.color;
  };

  return (
    <div style={style.container}>
      <div style={style.greeting}>
        Hey! I'm Zak Yeomanson, a Software Engineer
      </div>
      <div ref={burgerMenuRef} style={style.burgerMenu} onClick={() => setMenuOpen(!menuOpen)}>
        &#9776; {/* Burger icon */}
      </div>
      <div style={style.menu}>
        <a href="#about" 
           style={style.menuItem}
           onMouseEnter={applyHoverEffect}
           onMouseLeave={removeHoverEffect}>
          About Me
        </a>
        <a href="#projects" 
           style={style.menuItem}
           onMouseEnter={applyHoverEffect}
           onMouseLeave={removeHoverEffect}>
          Projects
        </a>
        <a href="#experience" 
           style={style.menuItem}
           onMouseEnter={applyHoverEffect}
           onMouseLeave={removeHoverEffect}>
          Experience
        </a>
        <a href="#contact" 
           style={style.menuItem}
           onMouseEnter={applyHoverEffect}
           onMouseLeave={removeHoverEffect}>
          Contact
        </a>
      </div>
    </div>
  );
}



export default App;
