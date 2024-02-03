import React, { useEffect, useRef } from 'react';
import './App.css';


const styles = {
  titleText: {
    paddingBottom: '1rem',
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'Cascadia Code'
  }

}

function App() {
  
  const inputRef = useRef(null);


  useEffect(() => {
    styleBody();
    inputRef.current.focus();

    const handleFocus = () => inputRef.current.focus();
    document.addEventListener('click', handleFocus);

    return () => {
      resetBodyStyle();
      document.removeEventListener('click', handleFocus);
    }
  }, []);

  const URL = document.location.href;

  return (
    <div style={{fontSize: '1rem'}}>
      <div style={styles.titleText}>
        <div>Portfolio PowerShell</div>
        <div>Copyright (C) Zak Yeomanson. All rights reserved.</div>
      </div>
      <div>{URL}&gt; 
        <span>
          <input type="text" style={styles.input} ref={inputRef}></input>
        </span>
      </div>
    </div>
  );
}

const resetBodyStyle = () => {
  /** Reset the body style to its default */
  document.documentElement.style.height = null;
  document.body.style.margin = null;    
  document.body.style.height = null;
  document.body.style.backgroundColor = null;

}

const styleBody = () => {
  /** Some web browsers have default margin and padding on the body element.
   * Let's remove that & fill it black */
  document.documentElement.style.height = '100%';
  document.body.style.margin = '0';
  document.body.style.height = '100%';
  document.body.style.backgroundColor = 'black';
  document.body.style.color = 'white'
}

export default App;
