import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DistractionFreeMode = ({ isActive, onToggle, activeFormat, onFormatChange, content, onContentChange }) => {
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isActive) {
        // Show toolbar when mouse is near the top
        if (e.clientY < 100) {
          setShowFloatingToolbar(true);
          setToolbarPosition({ x: e.clientX - 150, y: e.clientY + 20 });
        } else {
          setShowFloatingToolbar(false);
        }
      }
    };

    if (isActive) {
      document.addEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'auto';
    };
  }, [isActive]);

  if (!isActive) return null;

  const formatOptions = [
    { id: 'scene-heading', label: 'Scene', icon: 'MapPin' },
    { id: 'action', label: 'Action', icon: 'Play' },
    { id: 'character', label: 'Character', icon: 'User' },
    { id: 'dialogue', label: 'Dialogue', icon: 'MessageSquare' },
    { id: 'parenthetical', label: 'Parenthetical', icon: 'Parentheses' },
    { id: 'transition', label: 'Transition', icon: 'ArrowRight' }
  ];

  const getFormatClass = () => {
    const baseClasses = "font-mono leading-relaxed";
    
    switch (activeFormat) {
      case 'scene-heading':
        return `${baseClasses} font-bold uppercase text-foreground`;
      case 'character':
        return `${baseClasses} font-semibold uppercase text-foreground ml-20`;
      case 'dialogue':
        return `${baseClasses} text-foreground ml-10 mr-10`;
      case 'parenthetical':
        return `${baseClasses} text-muted-foreground ml-16 italic`;
      case 'transition':
        return `${baseClasses} font-semibold uppercase text-foreground text-right`;
      case 'action':
      default:
        return `${baseClasses} text-foreground`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Exit Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 z-60 p-2 bg-muted border border-border rounded-lg hover:bg-card transition-hover"
      >
        <Icon name="Minimize" size={20} className="text-muted-foreground" />
      </button>

      {/* Floating Toolbar */}
      {showFloatingToolbar && (
        <div 
          className="fixed z-60 bg-popover border border-border rounded-lg shadow-elevated p-2 animate-slide-in"
          style={{ 
            left: Math.max(10, Math.min(toolbarPosition.x, window.innerWidth - 320)),
            top: Math.max(10, toolbarPosition.y)
          }}
        >
          <div className="flex items-center space-x-1">
            {formatOptions.map((format) => (
              <button
                key={format.id}
                onClick={() => onFormatChange(format.id)}
                className={`
                  flex items-center space-x-1 px-2 py-1 rounded text-xs transition-hover
                  ${activeFormat === format.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-muted-foreground'
                  }
                `}
                title={format.label}
              >
                <Icon name={format.icon} size={14} />
                <span className="hidden sm:inline">{format.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8 pt-16">
          <div 
            contentEditable
            suppressContentEditableWarning={true}
            onInput={(e) => onContentChange(e.target.textContent)}
            className={`
              min-h-screen outline-none whitespace-pre-wrap
              ${getFormatClass()}
            `}
            style={{
              lineHeight: '2',
              fontSize: '14pt',
              fontFamily: 'Courier New, monospace'
            }}
          >
            {content || "FADE IN:\n\nINT. COFFEE SHOP - DAY\n\nA bustling coffee shop filled with the morning crowd. SARAH (28), a determined journalist, sits at a corner table with her laptop open.\n\nSARAH\nThis story could change everything.\n\n(beat)\n\nBut first, I need more coffee.\n\nShe signals to the BARISTA.\n\nFADE OUT."}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-muted border-t border-border p-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Distraction-Free Mode</span>
            <span>•</span>
            <span className="capitalize">{activeFormat.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Page 1</span>
            <span>•</span>
            <span>1,247 words</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistractionFreeMode;