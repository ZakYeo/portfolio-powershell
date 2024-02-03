import React, { useEffect } from 'react';
import './App.css';


const styles = {

}

function App() {

  useEffect(() => {
    styleBody();
    return () => resetBodyStyle();
  }, []);

  const URL = document.location.href;

  return (
    <div>
      <div >
        <div>Portfolio PowerShell</div>
        <div>Copyright (C) Zak Yeomanson. All rights reserved.</div>
      </div>
      <div>{URL}&gt; </div>
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
