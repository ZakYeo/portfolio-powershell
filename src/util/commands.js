const commands = {};

// Register a command with a name and a handler function
export const registerCommand = (name, handler) => {
    commands[name] = handler;
};

// Execute a command if it exists
export const executeCommand = (commandName, args) => {
    if (commands[commandName]) {
        return commands[commandName](args);
    }
    return `Command not found: ${commandName}`;
};
