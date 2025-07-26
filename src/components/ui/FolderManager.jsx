import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import { useFoldersStorage } from '../../hooks/useLocalStorage';

const FolderManager = ({ 
  isOpen, 
  onClose, 
  selectedScripts = [],
  onScriptsMoved 
}) => {
  const { folders, addFolder, addScriptToFolder } = useFoldersStorage();
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#6366f1');

  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
    '#f59e0b', '#10b981', '#06b6d4', '#84cc16'
  ];

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const folder = addFolder({
        name: newFolderName.trim(),
        color: newFolderColor,
        scriptIds: []
      });
      
      setNewFolderName('');
      setShowCreateFolder(false);
      return folder;
    }
  };

  const handleMoveToFolder = (folderId) => {
    let movedCount = 0;
    selectedScripts.forEach(scriptId => {
      if (addScriptToFolder(scriptId, folderId)) {
        movedCount++;
      }
    });
    
    if (onScriptsMoved) {
      onScriptsMoved(movedCount, folderId);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Manage Folders</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedScripts.length > 0 ? 
                `Move ${selectedScripts.length} selected script${selectedScripts.length > 1 ? 's' : ''}` :
                'Organize your scripts'
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        <div className="p-6">
          {/* Existing Folders */}
          <div className="space-y-2 mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Choose a folder:</h4>
            {folders.filter(f => f.id !== 'default').map(folder => (
              <div
                key={folder.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted cursor-pointer"
                onClick={() => selectedScripts.length > 0 && handleMoveToFolder(folder.id)}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: folder.color }}
                  />
                  <span className="font-medium text-foreground">{folder.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ({folder.scriptIds?.length || 0})
                  </span>
                </div>
                {selectedScripts.length > 0 && (
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                )}
              </div>
            ))}
            
            {folders.filter(f => f.id !== 'default').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Folder" size={32} className="mx-auto mb-2 opacity-50" />
                <p>No folders created yet</p>
              </div>
            )}
          </div>

          {/* Create New Folder */}
          {!showCreateFolder ? (
            <Button
              variant="outline"
              onClick={() => setShowCreateFolder(true)}
              iconName="Plus"
              iconPosition="left"
              className="w-full"
            >
              Create New Folder
            </Button>
          ) : (
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <Input
                label="Folder Name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
              />
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Color
                </label>
                <div className="flex space-x-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded border-2 ${
                        newFolderColor === color ? 'border-foreground' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewFolderColor(color)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCreateFolder(false);
                    setNewFolderName('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                >
                  Create
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FolderManager;