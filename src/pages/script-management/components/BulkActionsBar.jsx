import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onExport, onArchive, onDelete, onCreateFolder, onMoveToFolder, onClearSelection }) => {
  const [showFolderActions, setShowFolderActions] = useState(false);

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-slide-in">
      <div className="bg-card border border-border rounded-lg shadow-elevated p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">{selectedCount}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCount} script{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="w-px h-6 bg-border" />

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFolderActions(!showFolderActions)}
                iconName="Folder"
                iconPosition="left"
              >
                Organize
              </Button>

              {showFolderActions && (
                <div className="absolute bottom-full mb-2 left-0 w-48 bg-popover border border-border rounded-lg shadow-elevated">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        onCreateFolder();
                        setShowFolderActions(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-hover text-left"
                    >
                      <Icon name="FolderPlus" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-popover-foreground">Create Folder</span>
                    </button>
                    <button
                      onClick={() => {
                        onMoveToFolder();
                        setShowFolderActions(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-hover text-left"
                    >
                      <Icon name="FolderOpen" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-popover-foreground">Move to Folder</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onArchive}
              iconName="Archive"
              iconPosition="left"
            >
              Archive
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              iconName="Trash2"
              iconPosition="left"
              className="text-destructive hover:text-destructive"
            >
              Delete
            </Button>
          </div>

          <div className="w-px h-6 bg-border" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;