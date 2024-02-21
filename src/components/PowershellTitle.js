import React, { useState, useEffect } from "react";


const PowershellTitle = ({ onTypingFinished }) => {
  const lines = [
    "Portfolio PowerShell",
    "Copyright (C) Zak Yeomanson. All rights reserved.",
  ];


  const [typedLines, setTypedLines] = useState([]);

  useEffect(() => {
    const typeLine = (lineIndex) => {
      if (lineIndex < lines.length) {
        const line = lines[lineIndex];
        let typedText = "";
        let charIndex = 0;

        const typeChar = () => {
          typedText += line[charIndex++];
          // Update the current line and keep previous ones
          setTypedLines((prevLines) => [
            ...prevLines.slice(0, lineIndex),
            typedText,
            ...prevLines.slice(lineIndex + 1),
          ]);

          if (charIndex < line.length) {
            setTimeout(typeChar, 100);
          } else if (lineIndex < lines.length - 1) {
            // Move to the next line after a short delay
            setTimeout(() => typeLine(lineIndex + 1), 500);
          } else {
            // All lines are typed, call the callback function
            onTypingFinished();
          }
        };

        typeChar();
      }
    };

    // Start typing the first line
    typeLine(0);
  }, []);

  return (
    <div style={styles.titleText}>
      {typedLines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

const styles = {
  titleText: {
    paddingBottom: "1rem",
  },
};

export default PowershellTitle;
