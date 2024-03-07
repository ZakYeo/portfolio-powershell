import React from 'react';
import { commands } from "../util/handleCommands";

const Help = () => {
  // Convert commands object to an array, sort it by command name, then map for display
  const commandHelpOutput = Object.keys(commands)
    .sort() // Sort command names alphabetically
    .map(key => ({
      command: key,
      description: commands[key].description,
    }));

  return (
    <div style={{ padding: '1rem', maxWidth: '50rem' }}>
      <div style={{ borderBottom: '1px solid white', margin: '0.5rem 0' }}></div> {/* Top strikethrough */}
      {commandHelpOutput.map((item, index, array) => (
        <React.Fragment key={index} >
          <div style={{ display: 'flex', paddingBottom: '0.5rem' }}>
            <span style={{ marginRight: '1rem', width: '20%', minWidth: '7rem' }}>{item.command}</span>
            <span>{item.description}</span>
          </div>
          {index < array.length - 1 && <div style={{ borderBottom: '1px solid white', margin: '0.5rem 0' }}></div>}
        </React.Fragment>
      ))}
      <div style={{ borderBottom: '1px solid white', margin: '0.5rem 0' }}></div> {/* Bottom strikethrough */}
    </div>
  );
};
export default Help;
