const commands = {};

// Register a command with a name and a handler function
export const registerCommand = (name, Component) => {
  commands[name] = Component;
};

// Execute a command if it exists
export const executeCommand = (commandName, args) => {
  const CommandComponent = commands[commandName];
  if (CommandComponent) {
    return <CommandComponent {...args} />;
  }
  return <div>Command not found: {commandName}</div>;
};
