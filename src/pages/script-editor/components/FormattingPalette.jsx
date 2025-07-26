import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FormattingPalette = ({ onFormatChange, activeFormat }) => {
  const formatOptions = [
    { 
      id: 'scene-heading', 
      label: 'Scene Heading', 
      icon: 'MapPin', 
      shortcut: 'Ctrl+1',
      description: 'INT./EXT. Location - Time'
    },
    { 
      id: 'action', 
      label: 'Action', 
      icon: 'Play', 
      shortcut: 'Ctrl+2',
      description: 'Scene description and action'
    },
    { 
      id: 'character', 
      label: 'Character', 
      icon: 'User', 
      shortcut: 'Ctrl+3',
      description: 'Character name'
    },
    { 
      id: 'dialogue', 
      label: 'Dialogue', 
      icon: 'MessageSquare', 
      shortcut: 'Ctrl+4',
      description: 'Character speech'
    },
    { 
      id: 'parenthetical', 
      label: 'Parenthetical', 
      icon: 'Parentheses', 
      shortcut: 'Ctrl+5',
      description: '(Character direction)'
    },
    { 
      id: 'transition', 
      label: 'Transition', 
      icon: 'ArrowRight', 
      shortcut: 'Ctrl+6',
      description: 'FADE IN:, CUT TO:'
    },
    { 
      id: 'shot', 
      label: 'Shot', 
      icon: 'Camera', 
      shortcut: 'Ctrl+7',
      description: 'A specific camera shot'
    },
    { 
      id: 'subheader', 
      label: 'Subheader', 
      icon: 'Subtitles', 
      shortcut: 'Ctrl+8',
      description: 'A minor location change'
    }
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-foreground mb-2">Formatting</h3>
        <p className="text-sm text-muted-foreground">Click or use shortcuts to format text</p>
      </div>
      
      <div className="p-4 space-y-2">
        {formatOptions.map((format) => (
          <button
            key={format.id}
            onClick={() => onFormatChange(format.id)}
            className={`
              w-full flex items-start space-x-3 p-3 rounded-lg border transition-hover text-left
              ${activeFormat === format.id 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-background hover:bg-muted border-border'
              }
            `}
          >
            <Icon 
              name={format.icon} 
              size={18} 
              className={activeFormat === format.id ? 'text-primary-foreground' : 'text-muted-foreground'} 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={`font-body font-medium text-sm ${
                  activeFormat === format.id ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {format.label}
                </span>
                <span className={`font-mono text-xs ${
                  activeFormat === format.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {format.shortcut}
                </span>
              </div>
              <p className={`text-xs ${
                activeFormat === format.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
              }`}>
                {format.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <h4 className="font-body font-medium text-sm text-foreground mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Search"
            iconPosition="left"
          >
            Find & Replace
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Maximize"
            iconPosition="left"
          >
            Distraction Free
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="FileText"
            iconPosition="left"
          >
            Script Statistics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormattingPalette;