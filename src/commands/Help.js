import { commands } from "../util/handleCommands";

const Help = () => {
  // Convert commands object to an array, sort it by command name, then map for display
  const commandHelpOutput = Object.keys(commands)
    .sort() // Sort command names alphabetically
    .map(key => `${key} - ${commands[key].description}`);

  return (
    <div
      style={{
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      {commandHelpOutput.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
export default Help;
