import React, { useEffect } from "react";
import { TypeAnimation } from 'react-type-animation'


const PowershellTitle = ({ onTypingFinished, shouldAnimate }) => {



  const title = "Portfolio PowerShell\nCopyright (C) Zak Yeomanson. All rights reserved.";
  const helpMsg = shouldAnimate ? "\n\nType 'help' or hit the '?' button to get started." : ""; // Only show on first time opening
  const lines = [`${title}${helpMsg}`, () => setTimeout(() => onTypingFinished(), 1000)];

  useEffect(() => {
    if (!shouldAnimate) {
      // Execute right away
      onTypingFinished();
    }
  }, [shouldAnimate, onTypingFinished]);

  return (
    <div style={styles.titleText}>
      {shouldAnimate ?
        <TypeAnimation sequence={lines} wrapper="div" speed={50} style={{ whiteSpace: 'pre-line' }} cursor={false} />
        :
        <div style={{ whiteSpace: 'pre-line' }}>
          {lines[0]}
        </div>
      }
    </div>
  );
};

const styles = {
  titleText: {
    paddingBottom: "1rem",
  },
};

export default PowershellTitle;
