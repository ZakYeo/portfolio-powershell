import React, { useEffect, useRef, useState } from "react";
import { executeCommand } from "../util/handleCommands";
import "../App.css";

/**
 * A terminal-style input component with a block caret that allows users to enter and execute commands.
 */
const TerminalInput = () => {
  const editableRef = useRef(null);
  const hiddenTextRef = useRef(null);
  const [url, setUrl] = useState(window.location.href);
  const [caretPosition, setCaretPosition] = useState({ left: 0, top: 0 });
  let lastSelectionRange = useRef(null);
  const [commandOutputs, setCommandOutputs] = useState([]);

  useEffect(() => {
    setUrl(window.location.href);
    editableRef.current.focus();

    /**
     * Saves the current selection range in the editable area to allow restoring later.
     */
    const saveSelection = () => {
      const selection = window.getSelection();
      if (
        selection.rangeCount > 0 &&
        editableRef.current.contains(selection.anchorNode)
      ) {
        lastSelectionRange.current = selection.getRangeAt(0);
      }
    };

    /**
     * Restores the last saved selection range in the editable area.
     */
    const restoreSelection = () => {
      const selection = window.getSelection();
      if (
        lastSelectionRange.current &&
        editableRef.current.contains(selection.anchorNode)
      ) {
        selection.removeAllRanges();
        selection.addRange(lastSelectionRange.current);
      }
    };

    /**
     * Updates the caret position based on the current selection within the editable area.
     */
    const updateCaretPosition = () => {
      const selection = window.getSelection();
      if (
        selection.rangeCount > 0 &&
        editableRef.current.contains(selection.anchorNode)
      ) {
        const range = selection.getRangeAt(0);
        const dummy = document.createElement("span");
        range.insertNode(dummy);
        const rect = dummy.getBoundingClientRect(); // Using getBoundingClientRect for more accurate position
        const containerRect = editableRef.current.getBoundingClientRect(); // Get container's rect to calculate relative position
        setCaretPosition({
          left: dummy.offsetLeft,
          top: rect.top - containerRect.top + editableRef.current.scrollTop, // Calculate top position relative to the editable container
        });
        dummy.parentNode.removeChild(dummy);
      } else if (editableRef.current) {
        // Set initial caret position based on editable element's metrics
        setCaretPosition({
          left: 0,
          top:
            editableRef.current.scrollHeight > editableRef.current.clientHeight
              ? editableRef.current.scrollHeight
              : 0,
        });
      }
    };

    updateCaretPosition();

    /**
     * Handles input events to sync the hidden text to update caret position.
     */
    const handleInput = () => {
      // Copy the text content to the hidden span
      hiddenTextRef.current.textContent = editableRef.current.textContent;
      updateCaretPosition();
    };

    /**
     * Processes keydown events, executing commands on 'Enter' and managing caret position.
     * @param {KeyboardEvent} e The event object.
     */
    const handleKeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const inputText = editableRef.current.textContent.trim();
        const [command, ...args] = inputText.split(" ");
        const outputComponent = executeCommand(command, { args });
        setCommandOutputs((prevOutputs) => [
          ...prevOutputs,
          { commandText: inputText, output: outputComponent },
        ]);
        editableRef.current.textContent = "";
      }
      setTimeout(updateCaretPosition, 0);
    };

    /**
     * Updates or restores the caret position on click events within the editable area.
     * @param {MouseEvent} e The event object.
     */
    const handleClick = (e) => {
      // Check if the click is inside the editableRef
      if (editableRef.current.contains(e.target)) {
        // Update caret on next tick to capture the new cursor position after the click
        setTimeout(updateCaretPosition, 0);
      } else {
        restoreSelection();
      }
    };

    /**
     * Focuses the editable area and restores the selection if the click is outside of it.
     * @param {MouseEvent} e The event object.
     */
    const handleDocumentClick = (e) => {
      if (!editableRef.current.contains(e.target)) {
        editableRef.current.focus();
        restoreSelection();
      }
    };
    const eventHandlers = [
      { target: editableRef.current, type: "focus", handler: restoreSelection },
      { target: editableRef.current, type: "blur", handler: saveSelection },
      { target: document, type: "click", handler: handleDocumentClick },
      { target: editableRef.current, type: "input", handler: handleInput },
      { target: editableRef.current, type: "keydown", handler: handleKeydown },
      { target: editableRef.current, type: "click", handler: handleClick },
      { target: editableRef.current, type: "mouseup", handler: handleClick }, // For mouse drag selections
    ];

    eventHandlers.forEach(({ target, type, handler }) => {
      target.addEventListener(type, handler);
    });

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      eventHandlers.forEach(({ target, type, handler }) => {
        target && target.removeEventListener(type, handler);
      });
    };
  }, []);

  return (
    <>
      <div id="commandOutputs">
        {commandOutputs.map(({ commandText, output }, index) => (
          <div key={index}>
            {url}&gt;
            <span className="commandOutputContainer inputWrapper">
              {commandText}
            </span>
            <div>{output}</div>
          </div>
        ))}
      </div>
      <div>
        {url}&gt;
        <span className="inputWrapper">
          <span
            contentEditable
            className="input"
            ref={editableRef}
            suppressContentEditableWarning={true}
          ></span>
          <span ref={hiddenTextRef} className="hiddenText"></span>
          <span
            className="caret"
            style={{
              left: caretPosition.left, // Used to calculate the caret position (horizontally)
              top: caretPosition.top, // Used to calculate the caret position (vertically)
            }}
          ></span>{" "}
          {/* This span acts as the blinking caret */}
        </span>
      </div>
    </>
  );
};

export default TerminalInput;
