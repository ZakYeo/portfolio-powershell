import React, { useEffect } from "react";
import "./App.css";
import PowershellTitle from "./components/PowershellTitle";
import { registerCommand } from "./util/commands";
import { HELP_CMD_OUTPUT } from "./variables";
import TerminalInput from "./components/TerminalInput";
import { styleBody, resetBodyStyle } from "./util/bodyStyle";

function App() {
  useEffect(() => {
    registerCommand("help", () => <div>{HELP_CMD_OUTPUT}</div>);
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
