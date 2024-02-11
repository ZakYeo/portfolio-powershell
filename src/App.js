import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import PowershellTitle from './components/PowershellTitle';
import { registerCommand, executeCommand } from './util/commands';
import { HELP_CMD_OUTPUT } from './variables';
import TerminalInput from './components/TerminalInput';



function App() {

  useEffect(() => {
    registerCommand('help', () => HELP_CMD_OUTPUT);
    styleBody();

    return () => {
      resetBodyStyle();
    }
  }, []);

  const resetBodyStyle = () => {
    document.documentElement.style.height = null;
    document.body.style.margin = null;
    document.body.style.height = null;
    document.body.style.backgroundColor = null;
  }

  const styleBody = () => {
    document.documentElement.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }

  return (
    <div className="appContainer">
      <PowershellTitle />
      <span id="previousCommands"></span>
      <TerminalInput />
    </div>
  );
}

export default App;
