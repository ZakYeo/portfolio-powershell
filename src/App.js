import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = 'black';

    return () => {
      document.documentElement.style.height = null;
      document.body.style.margin = null;    
      document.body.style.height = null;
      document.body.style.backgroundColor = null;
    };
  }, []);

  const URL = document.location.href;

  return (
    <div style={{width: '100%', height: '100%', backgroundColor: 'black', color: 'white'}}>
      <div>
        <div>Portfolio PowerShell</div>
        <div>Copyright (C) Zak Yeomanson. All rights reserved.</div>
      </div>
      <div>{URL}> </div>
    </div>
  );
}

export default App;
