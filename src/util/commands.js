const commands = {};

// Register a command with a name and a handler function
export const registerCommand = (name, Component) => {
  commands[name] = Component;
};

// Execute a command if it exists
// Execute a command if it exists, returning the component to render
export const executeCommand = (commandName, args) => {
  const CommandComponent = commands[commandName];
  if (CommandComponent) {
    // Pass args as props to the command component
    return <CommandComponent {...args} />;
  }
  return <div>Command not found: {commandName}</div>;
};
