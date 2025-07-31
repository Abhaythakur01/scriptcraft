import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Find & Replace Modal Component
const FindReplaceModal = ({ isOpen, onClose, editor }) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = () => {
    if (!findText.trim() || !editor) return;

    const results = [];
    const nodes = Array.from(editor.nodes({ at: [] }));
    
    nodes.forEach(([node, path]) => {
      if (node.text) {
        const text = matchCase ? node.text : node.text.toLowerCase();
        const searchTerm = matchCase ? findText : findText.toLowerCase();
        
        if (wholeWord) {
          const regex = new RegExp(`\\b${searchTerm}\\b`, matchCase ? 'g' : 'gi');
          let match;
          while ((match = regex.exec(node.text)) !== null) {
            results.push({
              path,
              offset: match.index,
              length: match[0].length,
              text: match[0]
            });
          }
        } else {
          let index = text.indexOf(searchTerm);
          while (index !== -1) {
            results.push({
              path,
              offset: index,
              length: searchTerm.length,
              text: findText
            });
            index = text.indexOf(searchTerm, index + 1);
          }
        }
      }
    });

    setSearchResults(results);
    setTotalMatches(results.length);
    setCurrentMatch(results.length > 0 ? 1 : 0);
  };

  const goToMatch = (matchIndex) => {
    if (matchIndex < 0 || matchIndex >= searchResults.length || !editor) return;
    
    const result = searchResults[matchIndex];
    const start = { path: result.path, offset: result.offset };
    const end = { path: result.path, offset: result.offset + result.length };
    
    try {
      editor.select({ anchor: start, focus: end });
      setCurrentMatch(matchIndex + 1);
    } catch (error) {
      console.error('Error selecting match:', error);
    }
  };

  const handleNext = () => {
    const nextIndex = currentMatch < totalMatches ? currentMatch : 0;
    goToMatch(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentMatch > 1 ? currentMatch - 2 : totalMatches - 1;
    goToMatch(prevIndex);
  };

  const handleReplace = () => {
    if (currentMatch === 0 || !editor) return;
    
    const result = searchResults[currentMatch - 1];
    const start = { path: result.path, offset: result.offset };
    const end = { path: result.path, offset: result.offset + result.length };
    
    try {
      editor.select({ anchor: start, focus: end });
      editor.insertText(replaceText);
      performSearch(); // Refresh search after replace
    } catch (error) {
      console.error('Error replacing text:', error);
    }
  };

  const handleReplaceAll = () => {
    if (searchResults.length === 0 || !editor) return;
    
    // Replace from last to first to maintain correct offsets
    const sortedResults = [...searchResults].reverse();
    
    try {
      sortedResults.forEach(result => {
        const start = { path: result.path, offset: result.offset };
        const end = { path: result.path, offset: result.offset + result.length };
        editor.select({ anchor: start, focus: end });
        editor.insertText(replaceText);
      });
      performSearch(); // Refresh search after replace all
    } catch (error) {
      console.error('Error replacing all text:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg w-96 max-w-[90vw]">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Find & Replace</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Find Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Find</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded text-sm"
                placeholder="Enter text to find..."
                onKeyDown={(e) => e.key === 'Enter' && performSearch()}
              />
              <button
                onClick={performSearch}
                className="px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
              >
                <Icon name="Search" size={14} />
              </button>
            </div>
            {totalMatches > 0 && (
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>{currentMatch} of {totalMatches} matches</span>
                <div className="flex space-x-1">
                  <button
                    onClick={handlePrevious}
                    disabled={totalMatches === 0}
                    className="p-1 hover:bg-muted rounded disabled:opacity-50"
                  >
                    <Icon name="ChevronUp" size={12} />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={totalMatches === 0}
                    className="p-1 hover:bg-muted rounded disabled:opacity-50"
                  >
                    <Icon name="ChevronDown" size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Replace Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Replace with</label>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded text-sm"
              placeholder="Enter replacement text..."
            />
          </div>

          {/* Options */}
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
                className="rounded"
              />
              <span>Match case</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={wholeWord}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="rounded"
              />
              <span>Whole word</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleReplace}
              disabled={currentMatch === 0}
              className="flex-1 px-3 py-2 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90 disabled:opacity-50"
            >
              Replace
            </button>
            <button
              onClick={handleReplaceAll}
              disabled={totalMatches === 0}
              className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 disabled:opacity-50"
            >
              Replace All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormattingPalette = ({ onFormatChange, activeFormat, onToggleDistraction, onToggleFindReplace, editor }) => {
  // Debug logging
  console.log('FormattingPalette - activeFormat:', activeFormat);
  console.log('FormattingPalette - onFormatChange:', typeof onFormatChange);
  const formatOptions = [
    { 
      id: 'scene-heading', 
      label: 'Scene Heading', 
      icon: 'MapPin', 
      shortcut: 'Ctrl+1',
      description: 'INT./EXT. Location - Time',
      example: 'INT. COFFEE SHOP - DAY'
    },
    { 
      id: 'action', 
      label: 'Action', 
      icon: 'Play', 
      shortcut: 'Ctrl+2',
      description: 'Scene description and action',
      example: 'John walks into the room.'
    },
    { 
      id: 'character', 
      label: 'Character', 
      icon: 'User', 
      shortcut: 'Ctrl+3',
      description: 'Character name',
      example: 'JOHN'
    },
    { 
      id: 'dialogue', 
      label: 'Dialogue', 
      icon: 'MessageSquare', 
      shortcut: 'Ctrl+4',
      description: 'Character speech',
      example: 'I can\'t believe this happened.'
    },
    { 
      id: 'parenthetical', 
      label: 'Parenthetical', 
      icon: 'Parentheses', 
      shortcut: 'Ctrl+5',
      description: 'Character direction',
      example: '(beat)'
    },
    { 
      id: 'transition', 
      label: 'Transition', 
      icon: 'ArrowRight', 
      shortcut: 'Ctrl+6',
      description: 'Scene transitions',
      example: 'FADE IN:'
    },
    { 
      id: 'shot', 
      label: 'Shot', 
      icon: 'Camera', 
      shortcut: 'Ctrl+7',
      description: 'Camera direction',
      example: 'CLOSE-UP ON:'
    },
    { 
      id: 'subheader', 
      label: 'Subheader', 
      icon: 'Subtitles', 
      shortcut: 'Ctrl+8',
      description: 'Minor location change',
      example: 'LATER'
    }
  ];

  const quickActions = [
    {
      label: 'Find & Replace',
      icon: 'Search',
      shortcut: 'Ctrl+F',
      action: onToggleFindReplace,
      description: 'Search and replace text'
    },
    {
      label: 'Distraction Free',
      icon: 'Maximize',
      shortcut: 'F11',
      action: onToggleDistraction,
      description: 'Full-screen writing mode'
    }
  ];

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-foreground mb-2">Screenplay Formats</h3>
        <p className="text-sm text-muted-foreground">Use keyboard shortcuts for faster writing</p>
      </div>
      
      {/* Current Format Indicator */}
      <div className="p-4 bg-primary/5 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <div>
            <p className="text-sm font-medium text-foreground">Currently Active</p>
            <p className="text-lg font-semibold text-primary capitalize">
              {activeFormat?.replace('-', ' ') || 'Action'}
            </p>
          </div>
        </div>
      </div>

      {/* Format Options */}
      <div className="p-4 space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">FORMAT SHORTCUTS</h4>
        {formatOptions.map((format) => (
          <button
            key={format.id}
            onClick={() => {
              console.log('Format button clicked:', format.id);
              if (onFormatChange) {
                onFormatChange(format.id);
              } else {
                console.error('onFormatChange is not defined');
              }
            }}
            className={`
              w-full flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 text-left group
              ${activeFormat === format.id 
                ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                : 'bg-background hover:bg-muted border-border hover:border-primary/20'
              }
            `}
          >
            <Icon 
              name={format.icon} 
              size={18} 
              className={`mt-0.5 ${activeFormat === format.id ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'}`} 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={`font-medium text-sm ${
                  activeFormat === format.id ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {format.label}
                </span>
                <span className={`font-mono text-xs px-2 py-1 rounded ${
                  activeFormat === format.id 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                }`}>
                  {format.shortcut}
                </span>
              </div>
              <p className={`text-xs mb-1 ${
                activeFormat === format.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
              }`}>
                {format.description}
              </p>
              <p className={`text-xs font-mono italic ${
                activeFormat === format.id ? 'text-primary-foreground/60' : 'text-muted-foreground/80'
              }`}>
                {format.example}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation Shortcuts */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">NAVIGATION</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <span className="text-foreground">Tab</span>
            <span className="text-muted-foreground">Next format</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <span className="text-foreground">Shift+Tab</span>
            <span className="text-muted-foreground">Previous format</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <span className="text-foreground">Enter</span>
            <span className="text-muted-foreground">Smart line break</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">QUICK ACTIONS</h4>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted hover:border-primary/20 transition-all duration-200 text-left group"
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={action.icon} 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary" 
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded group-hover:bg-primary/10 group-hover:text-primary">
                {action.shortcut}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Writing Tips */}
      <div className="p-4 border-t border-border bg-muted/30">
        <h4 className="text-sm font-medium text-foreground mb-2">💡 Writing Tips</h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>• Character names are always UPPERCASE</p>
          <p>• Scene headings start with INT. or EXT.</p>
          <p>• Keep action lines concise and visual</p>
          <p>• Use parentheticals sparingly</p>
        </div>
      </div>
    </div>
  );
};

export default FormattingPalette;