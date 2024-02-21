import React, { useEffect, useState } from "react";
import "./App.css";
import PowershellTitle from "./components/PowershellTitle";
import { registerCommand } from "./util/handleCommands";
import TerminalInput from "./components/TerminalInput";
import { styleBody, resetBodyStyle } from "./util/handleBodyStyle";
import Help from "./commands/Help";
import ChangeDirectory from "./commands/ChangeDirectory";
import Projects from "./commands/Projects";

function App() {

  const [firstTimeLoadingPage, setFirstTimeLoadingPage] = useState(true);
  const [typingFinished, setTypingFinished] = useState(false);

  useEffect(() => {
    registerCommand("help", Help);
    registerCommand("cd", ChangeDirectory);
    registerCommand("projects", Projects);
    styleBody();


    return () => {
      resetBodyStyle();
    };
  }, []);



  return (
    <div className="appContainer">
      <PowershellTitle onTypingFinished={() => setTypingFinished(true)} />
      <span id="previousCommands"></span>
      {typingFinished ? <TerminalInput /> : <></>}
    </div>
  );
}

export default App;
