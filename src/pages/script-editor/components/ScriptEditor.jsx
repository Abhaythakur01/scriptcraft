import React, { useCallback } from 'react';
import { Editable, useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';

const Element = ({ attributes, children, element }) => {
  const getFormatStyle = (type) => {
    const baseStyle = {
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: '12pt',
      lineHeight: '1.0', // Tighter line spacing for screenplay standard
      minHeight: '1.0em',
      margin: 0,
      padding: 0,
      whiteSpace: 'pre-wrap', // Preserve spacing
    };

    switch (type) {
      case 'scene-heading':
        return {
          ...baseStyle,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          marginLeft: '1.5in',
          marginRight: '1.0in',
          marginTop: '2em',
          marginBottom: '1em',
        };
      case 'character':
        return {
          ...baseStyle,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          marginLeft: '3.7in', // Industry standard: 3.7 inches from left
          marginRight: '1.0in',
          marginTop: '1em',
          marginBottom: '0',
        };
      case 'dialogue':
        return {
          ...baseStyle,
          marginLeft: '2.5in',
          marginRight: '2.5in',
          marginTop: '0',
          marginBottom: '0',
        };
      case 'parenthetical':
        return {
          ...baseStyle,
          fontStyle: 'italic',
          marginLeft: '3.1in',
          marginRight: '3.5in',
          marginTop: '0',
          marginBottom: '0',
        };
      case 'transition':
        return {
          ...baseStyle,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          textAlign: 'right',
          marginLeft: '1.5in',
          marginRight: '1.0in',
          marginTop: '2em',
          marginBottom: '2em',
        };
      case 'shot':
        return {
          ...baseStyle,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          marginLeft: '1.5in',
          marginRight: '1.0in',
          marginTop: '1em',
          marginBottom: '0.5em',
        };
      case 'subheader':
        return {
          ...baseStyle,
          textTransform: 'uppercase',
          marginLeft: '1.5in',
          marginRight: '1.0in',
          marginTop: '1em',
          marginBottom: '0.5em',
        };
      case 'action':
      default:
        return {
          ...baseStyle,
          marginLeft: '1.5in',
          marginRight: '1.0in',
          marginTop: '1em',
          marginBottom: '1em',
        };
    }
  };

  return (
    <div {...attributes} style={getFormatStyle(element.type)}>
      {children}
    </div>
  );
};

const ScriptEditor = () => {
  const editor = useSlate();
  const renderElement = useCallback(props => <Element {...props} />, []);

  const handleKeyDown = useCallback((event) => {
    // Don't prevent default for most keys - let Slate handle them naturally
    if (event.key === 'Enter') {
      // Let Slate handle Enter naturally - just split the node
      // The format logic can be handled elsewhere if needed
      return;
    }

    // Let all other keys work naturally (backspace, delete, arrows, etc.)
  }, []);

  return (
    <div className="flex-1 bg-muted relative overflow-y-auto flex justify-center">
      <div className="py-12 px-8">
        <div
          className="bg-white"
          style={{
            width: '8.5in',
            minHeight: '11in',
            // Industry standard: 1" margins on top, bottom, and right
            paddingTop: '1.0in',
            paddingBottom: '1.0in',
            paddingLeft: '0', // No left padding - elements handle their own margins
            paddingRight: '0', // No right padding - elements handle their own margins
          }}
        >
          <Editable
            renderElement={renderElement}
            onKeyDown={handleKeyDown}
            placeholder="Start typing your script..."
            autoFocus
            spellCheck={false}
            className="h-full outline-none focus:outline-none"
            style={{
              caretColor: '#1E293B',
              minHeight: '100%',
              width: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScriptEditor;