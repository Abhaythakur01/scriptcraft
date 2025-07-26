import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ScriptEditor = ({ activeFormat, onFormatChange, content, onContentChange }) => {
  const editorRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [autoCompletePosition, setAutoCompletePosition] = useState({ top: 0, left: 0 });

  const characters = ["JOHN", "SARAH", "DETECTIVE MARTINEZ", "DR. WILLIAMS", "ALEX"];
  const locations = [
    "INT. COFFEE SHOP - DAY",
    "EXT. CITY STREET - NIGHT", 
    "INT. POLICE STATION - DAY",
    "EXT. PARK - SUNSET",
    "INT. HOSPITAL ROOM - NIGHT"
  ];

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey) {
      switch (e.key) {
        case '1':
          e.preventDefault();
          onFormatChange('scene-heading');
          break;
        case '2':
          e.preventDefault();
          onFormatChange('action');
          break;
        case '3':
          e.preventDefault();
          onFormatChange('character');
          break;
        case '4':
          e.preventDefault();
          onFormatChange('dialogue');
          break;
        case '5':
          e.preventDefault();
          onFormatChange('parenthetical');
          break;
        case '6':
          e.preventDefault();
          onFormatChange('transition');
          break;
        default:
          break;
      }
    }

    // Handle Tab key for format cycling
    if (e.key === 'Tab') {
      e.preventDefault();
      const formats = ['scene-heading', 'action', 'character', 'dialogue', 'parenthetical', 'transition'];
      const currentIndex = formats.indexOf(activeFormat);
      const nextIndex = (currentIndex + 1) % formats.length;
      onFormatChange(formats[nextIndex]);
    }

    // Handle Enter key for auto-formatting
    if (e.key === 'Enter') {
      handleEnterKey(e);
    }
  };

  const handleEnterKey = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // Auto-format logic based on current format
    switch (activeFormat) {
      case 'character':
        setTimeout(() => onFormatChange('dialogue'), 0);
        break;
      case 'dialogue':
        setTimeout(() => onFormatChange('character'), 0);
        break;
      case 'scene-heading':
        setTimeout(() => onFormatChange('action'), 0);
        break;
      default:
        break;
    }
  };

  const handleInput = (e) => {
    const text = e.target.textContent;
    onContentChange(text);
    
    // Auto-complete logic
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const textBeforeCursor = text.substring(0, range.startOffset);
      const words = textBeforeCursor.split(/\s+/);
      const currentWord = words[words.length - 1];

      if (currentWord.length > 1) {
        let options = [];
        
        if (activeFormat === 'character') {
          options = characters.filter(char => 
            char.toLowerCase().startsWith(currentWord.toLowerCase())
          );
        } else if (activeFormat === 'scene-heading') {
          options = locations.filter(loc => 
            loc.toLowerCase().includes(currentWord.toLowerCase())
          );
        }

        if (options.length > 0) {
          setAutoCompleteOptions(options);
          setShowAutoComplete(true);
          
          // Position auto-complete
          const rect = range.getBoundingClientRect();
          setAutoCompletePosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX
          });
        } else {
          setShowAutoComplete(false);
        }
      } else {
        setShowAutoComplete(false);
      }
    }
  };

  const insertAutoComplete = (option) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const textNode = range.startContainer;
      const text = textNode.textContent;
      const cursorPos = range.startOffset;
      
      // Find the start of the current word
      let wordStart = cursorPos;
      while (wordStart > 0 && !/\s/.test(text[wordStart - 1])) {
        wordStart--;
      }
      
      // Replace the current word with the selected option
      const newText = text.substring(0, wordStart) + option + text.substring(cursorPos);
      textNode.textContent = newText;
      
      // Set cursor position after the inserted text
      const newRange = document.createRange();
      newRange.setStart(textNode, wordStart + option.length);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
      
      onContentChange(newText);
    }
    
    setShowAutoComplete(false);
  };

  const getFormatClass = () => {
    const baseClasses = "screenplay-font leading-relaxed";
    
    switch (activeFormat) {
      case 'scene-heading':
        return `${baseClasses} screenplay-scene-heading text-foreground`;
      case 'character':
        return `${baseClasses} screenplay-character text-foreground`;
      case 'dialogue':
        return `${baseClasses} screenplay-dialogue text-foreground`;
      case 'parenthetical':
        return `${baseClasses} screenplay-parenthetical text-muted-foreground`;
      case 'transition':
        return `${baseClasses} screenplay-transition text-foreground`;
      case 'action':
      default:
        return `${baseClasses} screenplay-action text-foreground`;
    }
  };

  return (
    <div className="flex-1 bg-background relative">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-muted-foreground" />
            <span className="font-body font-medium text-foreground">Untitled Script.fountain</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Page 1 of 1</span>
            <span>•</span>
            <span>Scene 1</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Format:</span>
            <span className="font-mono font-medium text-foreground capitalize">
              {activeFormat.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8" style={{ minHeight: '11in' }}>
          {/* Script Title Area */}
          <div className="text-center mb-16 pb-8 border-b border-border">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
              UNTITLED SCREENPLAY
            </h1>
            <p className="text-muted-foreground">Written by</p>
            <p className="font-medium text-foreground">John Writer</p>
            <p className="text-sm text-muted-foreground mt-4">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Editor Area */}
          <div 
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            className={`
              min-h-96 outline-none whitespace-pre-wrap screenplay-font
              ${getFormatClass()}
            `}
            style={{
              width: '8.5in',
              minHeight: '11in',
              margin: '1in 1.5in 1in 1in',
              padding: 0,
              backgroundColor: 'white'
            }}
          >
            {content || "FADE IN:\n\nINT. COFFEE SHOP - DAY\n\nA bustling coffee shop filled with the morning crowd. SARAH (28), a determined journalist, sits at a corner table with her laptop open.\n\nSARAH\nThis story could change everything.\n\n(beat)\n\nBut first, I need more coffee.\n\nShe signals to the BARISTA.\n\nFADE OUT."}
          </div>
        </div>
      </div>

      {/* Auto-complete Dropdown */}
      {showAutoComplete && (
        <div 
          className="absolute z-50 bg-popover border border-border rounded-lg shadow-elevated max-w-xs"
          style={{
            top: autoCompletePosition.top,
            left: autoCompletePosition.left
          }}
        >
          <div className="p-2">
            {autoCompleteOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => insertAutoComplete(option)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-hover font-mono text-sm"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptEditor;