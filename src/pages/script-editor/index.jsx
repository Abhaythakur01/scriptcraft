import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createEditor, Transforms } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Header from '../../components/ui/Header';
import ScriptContextToolbar from '../../components/ui/ScriptContextToolbar';
import FormattingPalette from './components/FormattingPalette';
import ScriptEditor from './components/ScriptEditor';
import ScriptNavigator from './components/ScriptNavigator';
import { useScriptsStorage } from '../../hooks/useLocalStorage';
import Icon from '../../components/AppIcon';

// Constants
const DEFAULT_INITIAL_VALUE = [
  {
    type: 'action',
    children: [{ text: 'FADE IN:' }],
  },
];

const AUTOSAVE_DELAY = 1500;

// Helper functions
const validateSlateContent = (content) => {
  return Array.isArray(content) && content.length > 0;
};

const normalizeContentToSlate = (content) => {
  if (validateSlateContent(content)) {
    return content;
  }
  
  if (typeof content === 'string' && content.trim()) {
    return [{ type: 'action', children: [{ text: content }] }];
  }
  
  return DEFAULT_INITIAL_VALUE;
};

// Loading component
const EditorLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <Icon 
        name="Loader2" 
        size={32} 
        className="animate-spin text-primary mx-auto mb-4" 
      />
      <p className="text-muted-foreground">Loading Editor...</p>
    </div>
  </div>
);

// Main component
const ScriptEditorPage = () => {
  // Editor instance (stable reference)
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  
  // State management
  const [slateValue, setSlateValue] = useState(DEFAULT_INITIAL_VALUE);
  const [scriptId, setScriptId] = useState(null);
  const [activeFormat, setActiveFormat] = useState('action');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Hooks
  const location = useLocation();
  const { scripts, updateScript } = useScriptsStorage();
  
  // Initialize editor content
  useEffect(() => {
    const scriptToEdit = location.state?.script;
    let initialValue = DEFAULT_INITIAL_VALUE;
    let currentScriptId = null;
    
    if (scriptToEdit) {
      const foundScript = scripts.find(s => s.id === scriptToEdit.id);
      if (foundScript) {
        initialValue = normalizeContentToSlate(foundScript.content);
        currentScriptId = foundScript.id;
      }
    }
    
    setSlateValue(initialValue);
    setScriptId(currentScriptId);
    setIsInitialized(true);
  }, [location.state, scripts]);
  
  // Auto-save functionality
  useEffect(() => {
    if (!scriptId || !isInitialized) {
      return;
    }
    
    const timeoutId = setTimeout(() => {
      updateScript(scriptId, { content: slateValue });
    }, AUTOSAVE_DELAY);
    
    return () => clearTimeout(timeoutId);
  }, [slateValue, scriptId, isInitialized, updateScript]);
  
  // Event handlers
  const handleFormatChange = useCallback((newFormat) => {
    setActiveFormat(newFormat);
    
    // Apply format to current selection/block
    try {
      Transforms.setNodes(
        editor,
        { type: newFormat },
        { 
          match: n => editor.isBlock(n)
        }
      );
      
      // Focus editor after format change
      setTimeout(() => {
        editor.focus();
      }, 0);
    } catch (error) {
      console.warn('Error applying format:', error);
    }
  }, [editor]);
  
  const handleValueChange = useCallback((newValue) => {
    setSlateValue(newValue);
  }, []);
  
  if (!isInitialized) {
    return <EditorLoader />;
  }
  
  return (
    <>
      <Helmet>
        <title>Script Editor - ScriptCraft</title>
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Slate 
          editor={editor} 
          initialValue={slateValue}
          onChange={handleValueChange}
        >
          <Header />
          
          <ScriptContextToolbar content={slateValue} />
          
          <div className="flex flex-1 pt-32">
            <FormattingPalette
              onFormatChange={handleFormatChange}
              activeFormat={activeFormat}
            />
            
            <ScriptEditor />
            
            <ScriptNavigator content={slateValue} />
          </div>
        </Slate>
      </div>
    </>
  );
};

export default ScriptEditorPage;