import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ScriptContextToolbar = () => {
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, error
  const [viewMode, setViewMode] = useState('edit'); // edit, preview, split
  const location = useLocation();

  // Show toolbar only on script editor and script management pages
  const showToolbar = ['/script-editor', '/script-management'].includes(location.pathname);

  if (!showToolbar) return null;

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate save operation
    setTimeout(() => {
      setSaveStatus('saved');
    }, 1000);
  };

  const handleExport = () => {
    console.log('Export script');
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Loader2';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Check';
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-success';
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-muted border-b border-border shadow-soft animate-slide-in">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Save Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getSaveStatusIcon()} 
              size={16} 
              className={`${getSaveStatusColor()} ${saveStatus === 'saving' ? 'animate-spin' : ''}`}
            />
            <span className="font-body text-sm text-muted-foreground">
              {saveStatus === 'saving' ? 'Saving...' : 
               saveStatus === 'error'? 'Save failed' : 'All changes saved'}
            </span>
          </div>

          {location.pathname === '/script-editor' && (
            <div className="flex items-center space-x-1 border-l border-border pl-4">
              <span className="font-body text-sm text-muted-foreground">Word count:</span>
              <span className="font-mono text-sm font-medium text-foreground">1,247</span>
            </div>
          )}
        </div>

        {/* Center Section - View Controls (Script Editor only) */}
        {location.pathname === '/script-editor' && (
          <div className="flex items-center space-x-1 bg-background rounded-lg p-1 border border-border">
            <button
              onClick={() => handleViewModeChange('edit')}
              className={`
                flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-body transition-hover
                ${viewMode === 'edit' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name="Edit3" size={14} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleViewModeChange('preview')}
              className={`
                flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-body transition-hover
                ${viewMode === 'preview' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name="Eye" size={14} />
              <span>Preview</span>
            </button>
            <button
              onClick={() => handleViewModeChange('split')}
              className={`
                flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-body transition-hover
                ${viewMode === 'split' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name="Columns" size={14} />
              <span>Split</span>
            </button>
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            iconName="Save"
            iconPosition="left"
          >
            Save
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>

          {location.pathname === '/script-editor' && (
            <>
              <div className="w-px h-6 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                iconName="Share2"
                iconPosition="left"
              >
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
              />
            </>
          )}

          {location.pathname === '/script-management' && (
            <>
              <div className="w-px h-6 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                iconName="Plus"
                iconPosition="left"
              >
                New Script
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Filter"
                iconPosition="left"
              >
                Filter
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptContextToolbar;