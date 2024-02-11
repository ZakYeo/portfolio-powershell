import React, { useEffect } from "react";
import "./App.css";
import PowershellTitle from "./components/PowershellTitle";
import { registerCommand } from "./util/handleCommands";
import TerminalInput from "./components/TerminalInput";
import { styleBody, resetBodyStyle } from "./util/handleBodyStyle";
import Help from "./commands/Help";
import ChangeDirectory from "./commands/ChangeDirectory";

function App() {
  useEffect(() => {
    registerCommand("help", Help);
    registerCommand("cd", ChangeDirectory);
    styleBody();

    return () => {
      resetBodyStyle();
    };
  }, []);

  return (
    <div className="appContainer">
      <PowershellTitle />
      <span id="previousCommands"></span>
      <TerminalInput />
    </div>
  );
}

export default App;
