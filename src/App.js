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
import About from "./commands/About";
import Pong from "./commands/Pong";
function App() {

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [executeHelpCommand, setExecuteHelpCommand] = useState(false);
  const [hasQuitPong, setHasQuitPong] = useState(true);


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


    registerCommand("help", Help, {}, "Display help for all commands");
    registerCommand("cd", ChangeDirectory, {}, "Change directory");
    registerCommand("projects", Projects, {}, "Query GitHub API to view my recent projects");
    registerCommand("experience", Experience, {}, "View my work history & experience");
    registerCommand("education", Education, {}, "View my education");
    registerCommand("pwd", PrintWorkingDirectory, {}, "Print the current working directory");
    registerCommand("about", About, {}, "View about me");
    registerCommand("pong", Pong, { hasQuitPong: hasQuitPong, setHasQuitPong: setHasQuitPong }, "Play a two player game of Pong");
    styleBody();

    setLoading(false);


    return () => resetBodyStyle();
  }, [hasQuitPong]);



  return (
    <>
      <div className="appContainer">
        {loading ? <></> : <PowershellTitle onTypingFinished={() => setTypingFinished(true)} shouldAnimate={shouldAnimate} />}
        {typingFinished && <TerminalInput executeHelpCommand={executeHelpCommand} setExecuteHelpCommand={setExecuteHelpCommand} hasQuitPong={hasQuitPong} />}
      </div >
      <HelpButtonAndModal setExecuteHelpCommand={setExecuteHelpCommand} />
    </>
  );
}

export default App;
