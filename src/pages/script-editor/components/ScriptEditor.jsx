import React, { useCallback } from 'react';
import { Editable, useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';

// Element component for rendering different script formats
const Element = ({ attributes, children, element }) => {
  const getFormatStyle = (type) => {
    const baseStyle = {
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: '12pt',
      lineHeight: '1.0',
      minHeight: '1.0em',
      margin: 0,
      padding: 0,
      whiteSpace: 'pre-wrap',
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
          marginLeft: '3.7in',
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

// Leaf component for text formatting
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

// Main Script Editor Component
const ScriptEditor = ({ activeFormat, onFormatChange }) => {
  // Use the existing Slate editor from context
  const editor = useSlate();

  // Render functions
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  // Handle keyboard shortcuts and smart formatting
  const handleKeyDown = useCallback((event) => {
    const { key, ctrlKey, metaKey, shiftKey } = event;
    const isModKey = ctrlKey || metaKey;

    // Screenplay formatting shortcuts
    if (isModKey && !shiftKey) {
      switch (key) {
        case '1':
          event.preventDefault();
          onFormatChange?.('scene-heading');
          return;
        case '2':
          event.preventDefault();
          onFormatChange?.('action');
          return;
        case '3':
          event.preventDefault();
          onFormatChange?.('character');
          return;
        case '4':
          event.preventDefault();
          onFormatChange?.('dialogue');
          return;
        case '5':
          event.preventDefault();
          onFormatChange?.('parenthetical');
          return;
        case '6':
          event.preventDefault();
          onFormatChange?.('transition');
          return;
        case '7':
          event.preventDefault();
          onFormatChange?.('shot');
          return;
        case '8':
          event.preventDefault();
          onFormatChange?.('subheader');
          return;
      }
    }

    // Smart Enter behavior
    if (key === 'Enter') {
      event.preventDefault();
      
      try {
        const [match] = Editor.nodes(editor, {
          match: n => Editor.isBlock(editor, n),
        });
        
        if (match) {
          const [node] = match;
          const currentType = node.type;
          let nextType = 'action';
          
          // Smart format transitions
          switch (currentType) {
            case 'scene-heading':
              nextType = 'action';
              break;
            case 'action':
              nextType = 'action';
              break;
            case 'character':
              nextType = 'dialogue';
              break;
            case 'dialogue':
              nextType = 'character';
              break;
            case 'parenthetical':
              nextType = 'dialogue';
              break;
            case 'transition':
              nextType = 'scene-heading';
              break;
            case 'shot':
              nextType = 'action';
              break;
            case 'subheader':
              nextType = 'action';
              break;
            default:
              nextType = 'action';
          }
          
          // Insert new block with smart format
          Transforms.insertNodes(editor, {
            type: nextType,
            children: [{ text: '' }],
          });
          
          // Update active format
          onFormatChange?.(nextType);
        }
      } catch (error) {
        console.warn('Error handling Enter key:', error);
        // Fallback: just insert a new action block
        Transforms.insertNodes(editor, {
          type: 'action',
          children: [{ text: '' }],
        });
      }
    }
    
    // Tab cycling
    if (key === 'Tab' && !isModKey) {
      event.preventDefault();
      const formats = ['scene-heading', 'action', 'character', 'dialogue', 'parenthetical', 'transition'];
      const currentIndex = formats.indexOf(activeFormat || 'action');
      const nextFormat = formats[(currentIndex + 1) % formats.length];
      onFormatChange?.(nextFormat);
    }

    // Shift+Tab reverse cycling
    if (key === 'Tab' && shiftKey) {
      event.preventDefault();
      const formats = ['scene-heading', 'action', 'character', 'dialogue', 'parenthetical', 'transition'];
      const currentIndex = formats.indexOf(activeFormat || 'action');
      const prevFormat = formats[currentIndex === 0 ? formats.length - 1 : currentIndex - 1];
      onFormatChange?.(prevFormat);
    }
  }, [editor, activeFormat, onFormatChange]);

  return (
    <div className="flex-1 bg-muted relative overflow-y-auto flex justify-center">
      <div className="py-12 px-8">
        <div
          className="bg-white"
          style={{
            width: '8.5in',
            minHeight: '11in',
            paddingTop: '1.0in',
            paddingBottom: '1.0in',
            paddingLeft: '0',
            paddingRight: '0',
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
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