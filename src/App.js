import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const styles = {
  titleText: {
    paddingBottom: '1rem',
  },
  inputWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'Cascadia Code',
    padding: '0.2rem',
    minWidth: '200px',
    caretColor: 'transparent',
  },
  caret: {
    display: 'inline-block',
    width: '0.6em',
    height: '1rem',
    backgroundColor: 'white',
    position: 'absolute',
    animation: 'blink 1s step-start infinite',
  },
  hiddenText: {
    visibility: 'hidden',
    whiteSpace: 'pre',
    position: 'absolute',
    pointerEvents: 'none',
  }
}

const globalStyles = `
@keyframes blink {
  50% {
    opacity: 0;
  }
}
`;

function App() {
  const editableRef = useRef(null);
  const hiddenTextRef = useRef(null);
  const [caretLeft, setCaretLeft] = useState(0);

  useEffect(() => {
    styleBody();
    editableRef.current.focus();
  
    const updateCaretPosition = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0 && editableRef.current.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0);
        const dummy = document.createElement("span");
        range.insertNode(dummy);
        setCaretLeft(dummy.offsetLeft);
        dummy.parentNode.removeChild(dummy);
      }
    };
  
    const handleInput = () => {
      // Copy the text content to the hidden span
      hiddenTextRef.current.textContent = editableRef.current.textContent;
      updateCaretPosition();
    };
  
    const handleKeydown = () => {
      // Update caret on next tick to ensure the key event has processed
      setTimeout(updateCaretPosition, 0);
    };
  
    const handleClick = (e) => {
      // Check if the click is inside the editableRef
      if (editableRef.current.contains(e.target)) {
        // Update caret on next tick to capture the new cursor position after the click
        setTimeout(updateCaretPosition, 0);
      }
    };
  
    editableRef.current.addEventListener('input', handleInput);
    editableRef.current.addEventListener('keydown', handleKeydown);
    editableRef.current.addEventListener('click', handleClick);
    editableRef.current.addEventListener('mouseup', handleClick); // For mouse drag selections
  
    return () => {
      resetBodyStyle();
      editableRef.current && editableRef.current.removeEventListener('input', handleInput);
      editableRef.current && editableRef.current.removeEventListener('keydown', handleKeydown);
      editableRef.current && editableRef.current.removeEventListener('click', handleClick);
      editableRef.current && editableRef.current.removeEventListener('mouseup', handleClick);
    }
  }, []);

  const resetBodyStyle = () => {
    document.documentElement.style.height = null;
    document.body.style.margin = null;    
    document.body.style.height = null;
    document.body.style.backgroundColor = null;
  }

  const styleBody = () => {
    document.documentElement.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }

  const URL = document.location.href;

  return (
    <div style={{ fontSize: '1rem' }}>
      <style>{globalStyles}</style>
      <div style={styles.titleText}>
        <div>Portfolio PowerShell</div>
        <div>Copyright (C) Zak Yeomanson. All rights reserved.</div>
      </div>
      <div>
        {URL}&gt;
        <span style={styles.inputWrapper}>
          <span
            contentEditable
            style={styles.input}
            ref={editableRef}
            suppressContentEditableWarning={true}
          ></span>
          <span
            ref={hiddenTextRef}
            style={styles.hiddenText}
          ></span>
          <span
            style={{
              ...styles.caret,
              left: caretLeft,
            }}
          ></span> {/* This span acts as the blinking caret */}
        </span>
      </div>
    </div>
  );
}

export default App;
