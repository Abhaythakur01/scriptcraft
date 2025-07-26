import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EditorPreferences = () => {
  const [preferences, setPreferences] = useState({
    fontFamily: 'courier-new',
    fontSize: '12',
    lineSpacing: '1.5',
    pageMargins: 'standard',
    colorTheme: 'light',
    showLineNumbers: true,
    enableSpellCheck: true,
    autoIndent: true,
    wordWrap: false
  });

  const fontOptions = [
    { value: 'courier-new', label: 'Courier New' },
    { value: 'courier-prime', label: 'Courier Prime' },
    { value: 'source-code-pro', label: 'Source Code Pro' },
    { value: 'jetbrains-mono', label: 'JetBrains Mono' }
  ];

  const fontSizeOptions = [
    { value: '10', label: '10pt' },
    { value: '11', label: '11pt' },
    { value: '12', label: '12pt (Standard)' },
    { value: '13', label: '13pt' },
    { value: '14', label: '14pt' }
  ];

  const lineSpacingOptions = [
    { value: '1.0', label: 'Single' },
    { value: '1.5', label: '1.5x (Standard)' },
    { value: '2.0', label: 'Double' }
  ];

  const marginOptions = [
    { value: 'standard', label: 'Standard (1.5" left, 1" others)' },
    { value: 'wide', label: 'Wide (2" all sides)' },
    { value: 'narrow', label: 'Narrow (1" all sides)' },
    { value: 'custom', label: 'Custom' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'high-contrast', label: 'High Contrast' },
    { value: 'sepia', label: 'Sepia' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving editor preferences:', preferences);
  };

  const handleReset = () => {
    setPreferences({
      fontFamily: 'courier-new',
      fontSize: '12',
      lineSpacing: '1.5',
      pageMargins: 'standard',
      colorTheme: 'light',
      showLineNumbers: true,
      enableSpellCheck: true,
      autoIndent: true,
      wordWrap: false
    });
  };

  return (
    <div className="space-y-8">
      {/* Font Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Type" size={20} className="mr-2 text-primary" />
          Font & Typography
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Font Family"
            options={fontOptions}
            value={preferences.fontFamily}
            onChange={(value) => handlePreferenceChange('fontFamily', value)}
          />
          
          <Select
            label="Font Size"
            options={fontSizeOptions}
            value={preferences.fontSize}
            onChange={(value) => handlePreferenceChange('fontSize', value)}
          />
          
          <Select
            label="Line Spacing"
            options={lineSpacingOptions}
            value={preferences.lineSpacing}
            onChange={(value) => handlePreferenceChange('lineSpacing', value)}
          />
          
          <Select
            label="Page Margins"
            options={marginOptions}
            value={preferences.pageMargins}
            onChange={(value) => handlePreferenceChange('pageMargins', value)}
          />
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Palette" size={20} className="mr-2 text-primary" />
          Theme & Appearance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Color Theme"
            description="Choose your preferred writing environment"
            options={themeOptions}
            value={preferences.colorTheme}
            onChange={(value) => handlePreferenceChange('colorTheme', value)}
          />
        </div>
      </div>

      {/* Editor Behavior */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-primary" />
          Editor Behavior
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Show line numbers"
            description="Display line numbers in the editor margin"
            checked={preferences.showLineNumbers}
            onChange={(e) => handlePreferenceChange('showLineNumbers', e.target.checked)}
          />
          
          <Checkbox
            label="Enable spell check"
            description="Highlight misspelled words while typing"
            checked={preferences.enableSpellCheck}
            onChange={(e) => handlePreferenceChange('enableSpellCheck', e.target.checked)}
          />
          
          <Checkbox
            label="Auto-indent"
            description="Automatically indent new lines based on context"
            checked={preferences.autoIndent}
            onChange={(e) => handlePreferenceChange('autoIndent', e.target.checked)}
          />
          
          <Checkbox
            label="Word wrap"
            description="Wrap long lines to fit within the editor width"
            checked={preferences.wordWrap}
            onChange={(e) => handlePreferenceChange('wordWrap', e.target.checked)}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Eye" size={20} className="mr-2 text-primary" />
          Live Preview
        </h3>
        
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div 
            className="font-mono text-foreground"
            style={{
              fontFamily: preferences.fontFamily === 'courier-new' ? 'Courier New, monospace' : 
                         preferences.fontFamily === 'courier-prime' ? 'Courier Prime, monospace' :
                         preferences.fontFamily === 'source-code-pro'? 'Source Code Pro, monospace' : 'JetBrains Mono, monospace',
              fontSize: `${preferences.fontSize}pt`,
              lineHeight: preferences.lineSpacing
            }}
          >
            <div className="mb-2">INT. COFFEE SHOP - DAY</div>
            <div className="mb-2 ml-8">SARAH sits at a corner table, typing furiously on her laptop. Steam rises from her untouched coffee.</div>
            <div className="mb-2 text-center">SARAH</div>
            <div className="mb-2 ml-8">(frustrated)</div>
            <div className="ml-8">This script has to be perfect. The deadline is tomorrow.</div>
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

export default EditorPreferences;