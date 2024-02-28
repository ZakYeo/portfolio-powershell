import React, { useEffect, useState } from "react";
import "./App.css";
import PowershellTitle from "./components/PowershellTitle";
import { registerCommand } from "./util/handleCommands";
import TerminalInput from "./components/TerminalInput";
import { styleBody, resetBodyStyle } from "./util/handleBodyStyle";
import Help from "./commands/Help";
import ChangeDirectory from "./commands/ChangeDirectory";
import Projects from "./commands/Projects";
import HelpButtonAndModal from "./components/HelpButtonAndModal";
import Experience from "./commands/Experience";
import Education from "./commands/Education";
import PrintWorkingDirectory from "./commands/PrintWorkingDirectory";

function App() {

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [executeHelpCommand, setExecuteHelpCommand] = useState(false);


  useEffect(() => {
    const checkVisit = async () => {
      const hasVisited = localStorage.getItem("hasVisited");
      console.log("has visited: ", hasVisited);
      if (!hasVisited) {
        setShouldAnimate(true); // Animate only if it's the user's first visit
        localStorage.setItem("hasVisited", "true");
      }
    };

    checkVisit();

    registerCommand("help", Help);
    registerCommand("cd", ChangeDirectory);
    registerCommand("projects", Projects);
    registerCommand("experience", Experience);
    registerCommand("education", Education);
    registerCommand("pwd", PrintWorkingDirectory);
    styleBody();

    setLoading(false);


    return () => resetBodyStyle();
  }, []);



  return (
    <>
      <div className="appContainer">
        {loading ? <></> : <PowershellTitle onTypingFinished={() => setTypingFinished(true)} shouldAnimate={shouldAnimate} />}
        {typingFinished && <TerminalInput executeHelpCommand={executeHelpCommand} setExecuteHelpCommand={setExecuteHelpCommand} />}
      </div >
      <HelpButtonAndModal setExecuteHelpCommand={setExecuteHelpCommand} />
    </>
  );
}

export default App;
