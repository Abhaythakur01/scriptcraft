import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ScriptContextToolbar from '../../components/ui/ScriptContextToolbar';
import FormattingPalette from './components/FormattingPalette';
import ScriptEditor from './components/ScriptEditor';
import ScriptNavigator from './components/ScriptNavigator';
import FindReplacePanel from './components/FindReplacePanel';
import DistractionFreeMode from './components/DistractionFreeMode';

const ScriptEditorPage = () => {
  const [activeFormat, setActiveFormat] = useState('action');
  const [content, setContent] = useState('');
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'f':
            e.preventDefault();
            setShowFindReplace(true);
            break;
          case 'h':
            e.preventDefault();
            setShowFindReplace(true);
            break;
          case 'Escape':
            setShowFindReplace(false);
            setIsDistractionFree(false);
            break;
          default:
            break;
        }
      }
      
      if (e.key === 'F11') {
        e.preventDefault();
        setIsDistractionFree(!isDistractionFree);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDistractionFree]);

  const handleFormatChange = (format) => {
    setActiveFormat(format);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const toggleDistractionFree = () => {
    setIsDistractionFree(!isDistractionFree);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <Helmet>
        <title>Script Editor - ScriptCraft</title>
        <meta name="description" content="Professional screenplay editor with industry-standard formatting, auto-complete, and real-time collaboration features." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Distraction-Free Mode */}
        <DistractionFreeMode
          isActive={isDistractionFree}
          onToggle={toggleDistractionFree}
          activeFormat={activeFormat}
          onFormatChange={handleFormatChange}
          content={content}
          onContentChange={handleContentChange}
        />

        {/* Normal Mode */}
        {!isDistractionFree && (
          <>
            <Header />
            <ScriptContextToolbar />
            
            <div className="flex pt-32">
              {/* Left Sidebar - Formatting Palette */}
              <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-64'}`}>
                <FormattingPalette
                  onFormatChange={handleFormatChange}
                  activeFormat={activeFormat}
                />
              </div>

              {/* Sidebar Toggle */}
              <button
                onClick={toggleSidebar}
                className="fixed left-2 top-1/2 transform -translate-y-1/2 z-40 p-2 bg-muted border border-border rounded-lg hover:bg-card transition-hover"
              >
                <svg
                  className={`w-4 h-4 text-muted-foreground transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Main Editor */}
              <ScriptEditor
                activeFormat={activeFormat}
                onFormatChange={handleFormatChange}
                content={content}
                onContentChange={handleContentChange}
              />

              {/* Right Sidebar - Navigator */}
              <ScriptNavigator />
            </div>

            {/* Find & Replace Panel */}
            <FindReplacePanel
              isOpen={showFindReplace}
              onClose={() => setShowFindReplace(false)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ScriptEditorPage;