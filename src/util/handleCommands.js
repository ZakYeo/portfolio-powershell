export const commands = {};

// Register a command with a name and a handler function
export const registerCommand = (name, Component, defaultProps = {}, description = '') => {
  commands[name] = { Component, defaultProps, description };
};

// Execute a command if it exists
export const executeCommand = (commandName, execProps = {}) => {
  if (commands[commandName]) {
    const { Component, defaultProps } = commands[commandName];
    const props = { ...execProps, ...defaultProps, }; // Merge props, with execProps overriding defaultProps
    return <Component {...props} />;
  }
  return <div style={{ paddingBottom: '0.2rem', paddingTop: '0.2rem' }}>Command not found: {commandName}</div>;
};
