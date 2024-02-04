import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import PowershellTitle from './components/PowershellTitle';

const styles = {
  inputWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    maxWidth: '100vw',
    overflowX: 'hidden'
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
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
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
  const [caretPosition, setCaretPosition] = useState({ left: 0, top: 0 });
  let lastSelectionRange = null;

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && editableRef.current.contains(selection.anchorNode)) {
      lastSelectionRange = selection.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (lastSelectionRange && editableRef.current.contains(selection.anchorNode)) {
      selection.removeAllRanges();
      selection.addRange(lastSelectionRange);
    }
  };

  useEffect(() => {
    styleBody();
    editableRef.current.focus();
  
    const updateCaretPosition = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0 && editableRef.current.contains(selection.anchorNode)) {
        const range = selection.getRangeAt(0);
        const dummy = document.createElement("span");
        range.insertNode(dummy);
        const rect = dummy.getBoundingClientRect(); // Using getBoundingClientRect for more accurate position
        const containerRect = editableRef.current.getBoundingClientRect(); // Get container's rect to calculate relative position
        setCaretPosition({
          left: dummy.offsetLeft,
          top: rect.top - containerRect.top + editableRef.current.scrollTop // Calculate top position relative to the editable container
        });
        dummy.parentNode.removeChild(dummy);
      }else if (editableRef.current) {
        // Set initial caret position based on editable element's metrics
        setCaretPosition({
          left: 0,
          top: (editableRef.current.scrollHeight > editableRef.current.clientHeight) ? editableRef.current.scrollHeight : 0
        });
      }
    };
    
    updateCaretPosition();
    const handleInput = () => {
      // Copy the text content to the hidden span
      hiddenTextRef.current.textContent = editableRef.current.textContent;
      updateCaretPosition();
    };
  
    const handleKeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); 
        const previousCommands = document.getElementById('previousCommands');
        previousCommands.innerHTML += `${window.location.href}&gt;${editableRef.current.textContent}<br>`;
        console.log("Command to process:", editableRef.current.textContent);
        editableRef.current.textContent = '';
      }

      // Update caret on next tick to ensure the key event has processed
      setTimeout(updateCaretPosition, 0);
    };
  
    const handleClick = (e) => {
      // Check if the click is inside the editableRef
      if (editableRef.current.contains(e.target)) {
        // Update caret on next tick to capture the new cursor position after the click
        setTimeout(updateCaretPosition, 0);
      } else{
        restoreSelection();
      }
    };

    const handleDocumentClick = (e) => {
      if (!editableRef.current.contains(e.target)) {
        editableRef.current.focus();
        restoreSelection();
      }
    };

    const eventHandlers = [
      { target: editableRef.current, type: 'focus', handler: restoreSelection },
      { target: editableRef.current, type: 'blur', handler: saveSelection },
      { target: document, type: 'click', handler: handleDocumentClick },
      { target: editableRef.current, type: 'input', handler: handleInput },
      { target: editableRef.current, type: 'keydown', handler: handleKeydown },
      { target: editableRef.current, type: 'click', handler: handleClick },
      { target: editableRef.current, type: 'mouseup', handler: handleClick }, // For mouse drag selections
    ];
    
    eventHandlers.forEach(({ target, type, handler }) => {
      target.addEventListener(type, handler);
    });
  
    return () => {
      resetBodyStyle();
      document.removeEventListener('click', handleDocumentClick);
      eventHandlers.forEach(({ target, type, handler }) => {
        target && target.removeEventListener(type, handler);
      });
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
      <PowershellTitle />
      <span id="previousCommands"></span>
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
              left: caretPosition.left, // Used to calculate the caret position (horizontally)
              top: caretPosition.top // Used to calculate the caret position (vertically)
            }}
          ></span> {/* This span acts as the blinking caret */}
        </span>
      </div>
    </div>
  );
}

export default App;
