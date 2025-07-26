import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FormattingOptions = () => {
  const [formatting, setFormatting] = useState({
    sceneHeadingCase: 'uppercase',
    characterNameCase: 'uppercase',
    transitionCase: 'uppercase',
    autoCapitalization: true,
    smartQuotes: true,
    pageNumbering: true,
    sceneNumbering: false,
    continuedDialogue: true,
    moreDialogue: true,
    customShortcuts: {
      sceneHeading: 'Tab',
      character: 'Enter',
      dialogue: 'Enter',
      action: 'Enter',
      parenthetical: 'Ctrl+P',
      transition: 'Ctrl+T'
    }
  });

  const caseOptions = [
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'lowercase', label: 'lowercase' },
    { value: 'titlecase', label: 'Title Case' },
    { value: 'as-typed', label: 'As Typed' }
  ];

  const handleFormattingChange = (key, value) => {
    setFormatting(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleShortcutChange = (element, shortcut) => {
    setFormatting(prev => ({
      ...prev,
      customShortcuts: {
        ...prev.customShortcuts,
        [element]: shortcut
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving formatting options:', formatting);
  };

  const handleReset = () => {
    setFormatting({
      sceneHeadingCase: 'uppercase',
      characterNameCase: 'uppercase',
      transitionCase: 'uppercase',
      autoCapitalization: true,
      smartQuotes: true,
      pageNumbering: true,
      sceneNumbering: false,
      continuedDialogue: true,
      moreDialogue: true,
      customShortcuts: {
        sceneHeading: 'Tab',
        character: 'Enter',
        dialogue: 'Enter',
        action: 'Enter',
        parenthetical: 'Ctrl+P',
        transition: 'Ctrl+T'
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Text Case Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Type" size={20} className="mr-2 text-primary" />
          Text Case Formatting
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Scene Headings"
            description="INT./EXT. formatting"
            options={caseOptions}
            value={formatting.sceneHeadingCase}
            onChange={(value) => handleFormattingChange('sceneHeadingCase', value)}
          />
          
          <Select
            label="Character Names"
            description="Speaker name formatting"
            options={caseOptions}
            value={formatting.characterNameCase}
            onChange={(value) => handleFormattingChange('characterNameCase', value)}
          />
          
          <Select
            label="Transitions"
            description="CUT TO:, FADE IN: formatting"
            options={caseOptions}
            value={formatting.transitionCase}
            onChange={(value) => handleFormattingChange('transitionCase', value)}
          />
        </div>
      </div>

      {/* Auto-Formatting Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-primary" />
          Auto-Formatting Features
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Auto-capitalization"
            description="Automatically capitalize scene headings, character names, and transitions"
            checked={formatting.autoCapitalization}
            onChange={(e) => handleFormattingChange('autoCapitalization', e.target.checked)}
          />
          
          <Checkbox
            label="Smart quotes"
            description="Convert straight quotes to curly quotes automatically"
            checked={formatting.smartQuotes}
            onChange={(e) => handleFormattingChange('smartQuotes', e.target.checked)}
          />
          
          <Checkbox
            label="Continued dialogue indicators"
            description="Add (CONT'D) when character dialogue continues after action"
            checked={formatting.continuedDialogue}
            onChange={(e) => handleFormattingChange('continuedDialogue', e.target.checked)}
          />
          
          <Checkbox
            label="More dialogue indicators"
            description="Add (MORE) when dialogue continues on next page"
            checked={formatting.moreDialogue}
            onChange={(e) => handleFormattingChange('moreDialogue', e.target.checked)}
          />
        </div>
      </div>

      {/* Page and Scene Numbering */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Hash" size={20} className="mr-2 text-primary" />
          Numbering Options
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Page numbering"
            description="Display page numbers in the top-right corner"
            checked={formatting.pageNumbering}
            onChange={(e) => handleFormattingChange('pageNumbering', e.target.checked)}
          />
          
          <Checkbox
            label="Scene numbering"
            description="Add scene numbers to the left and right margins"
            checked={formatting.sceneNumbering}
            onChange={(e) => handleFormattingChange('sceneNumbering', e.target.checked)}
          />
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Keyboard" size={20} className="mr-2 text-primary" />
          Keyboard Shortcuts
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Scene Heading"
              description="Shortcut to format as scene heading"
              value={formatting.customShortcuts.sceneHeading}
              onChange={(e) => handleShortcutChange('sceneHeading', e.target.value)}
              placeholder="Tab"
            />
            
            <Input
              label="Character Name"
              description="Shortcut to format as character name"
              value={formatting.customShortcuts.character}
              onChange={(e) => handleShortcutChange('character', e.target.value)}
              placeholder="Enter"
            />
            
            <Input
              label="Dialogue"
              description="Shortcut to format as dialogue"
              value={formatting.customShortcuts.dialogue}
              onChange={(e) => handleShortcutChange('dialogue', e.target.value)}
              placeholder="Enter"
            />
          </div>
          
          <div className="space-y-4">
            <Input
              label="Action"
              description="Shortcut to format as action line"
              value={formatting.customShortcuts.action}
              onChange={(e) => handleShortcutChange('action', e.target.value)}
              placeholder="Enter"
            />
            
            <Input
              label="Parenthetical"
              description="Shortcut to format as parenthetical"
              value={formatting.customShortcuts.parenthetical}
              onChange={(e) => handleShortcutChange('parenthetical', e.target.value)}
              placeholder="Ctrl+P"
            />
            
            <Input
              label="Transition"
              description="Shortcut to format as transition"
              value={formatting.customShortcuts.transition}
              onChange={(e) => handleShortcutChange('transition', e.target.value)}
              placeholder="Ctrl+T"
            />
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground flex items-start">
            <Icon name="Info" size={16} className="mr-2 mt-0.5 text-primary" />
            Use standard keyboard notation: Ctrl+Key, Alt+Key, Shift+Key, or single keys like Tab, Enter, Space
          </p>
        </div>
      </div>

      {/* Format Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Eye" size={20} className="mr-2 text-primary" />
          Formatting Preview
        </h3>
        
        <div className="bg-muted rounded-lg p-4 border border-border font-mono text-sm">
          <div className={`mb-2 ${formatting.sceneHeadingCase === 'uppercase' ? 'uppercase' : formatting.sceneHeadingCase === 'lowercase' ? 'lowercase' : 'capitalize'}`}>
            INT. WRITER'S ROOM - DAY
          </div>
          <div className="mb-2 ml-8">
            A SCREENWRITER sits at their desk, adjusting formatting preferences in ScriptCraft.
          </div>
          <div className={`mb-2 text-center ${formatting.characterNameCase === 'uppercase' ? 'uppercase' : formatting.characterNameCase === 'lowercase' ? 'lowercase' : 'capitalize'}`}>
            SCREENWRITER
          </div>
          <div className="mb-2 ml-8">(excited)</div>
          <div className="ml-8">
            {formatting.smartQuotes ? '"Perfect! Now my script looks professional."' : '"Perfect! Now my script looks professional."'}
          </div>
          <div className={`mt-4 text-right ${formatting.transitionCase === 'uppercase' ? 'uppercase' : formatting.transitionCase === 'lowercase' ? 'lowercase' : 'capitalize'}`}>
            FADE OUT.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handleReset}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset to Defaults
        </Button>
        
        <div className="flex space-x-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave} iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormattingOptions;