import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistoryModal = ({ isOpen, onClose, script, versions }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showDiff, setShowDiff] = useState(false);

  if (!isOpen || !script) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVersionIcon = (type) => {
    const icons = {
      'major': 'GitBranch',
      'minor': 'GitCommit',
      'patch': 'Edit3',
      'auto': 'Clock'
    };
    return icons[type] || 'GitCommit';
  };

  const getVersionColor = (type) => {
    const colors = {
      'major': 'text-success',
      'minor': 'text-primary',
      'patch': 'text-warning',
      'auto': 'text-muted-foreground'
    };
    return colors[type] || 'text-muted-foreground';
  };

  const handleRestore = (version) => {
    if (confirm(`Are you sure you want to restore to version ${version.number}? This will create a new version with the restored content.`)) {
      console.log('Restoring version:', version);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Version History</h2>
            <p className="text-sm text-muted-foreground mt-1">{script.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDiff(!showDiff)}
              iconName={showDiff ? "Eye" : "GitCompare"}
              iconPosition="left"
            >
              {showDiff ? 'View List' : 'Compare'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {!showDiff ? (
            /* Version List */
            <div className="h-full overflow-y-auto p-6">
              <div className="space-y-4">
                {versions.map((version, index) => (
                  <div
                    key={version.id}
                    className={`border border-border rounded-lg p-4 hover:bg-muted/50 transition-hover cursor-pointer ${
                      selectedVersion?.id === version.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedVersion(version)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-success/10' : 'bg-muted'
                        }`}>
                          <Icon 
                            name={getVersionIcon(version.type)} 
                            size={16} 
                            className={index === 0 ? 'text-success' : getVersionColor(version.type)}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-foreground">
                              Version {version.number}
                              {index === 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-success text-success-foreground text-xs rounded-full">
                                  Current
                                </span>
                              )}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(version.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{version.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>By {version.author}</span>
                            <span>•</span>
                            <span>{version.changes} changes</span>
                            <span>•</span>
                            <span>{version.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {index !== 0 && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedVersion(version);
                                setShowDiff(true);
                              }}
                              iconName="GitCompare"
                            >
                              Compare
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRestore(version);
                              }}
                              iconName="RotateCcw"
                            >
                              Restore
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Download"
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Diff View */
            <div className="h-full flex">
              <div className="w-1/2 border-r border-border">
                <div className="p-4 border-b border-border bg-muted">
                  <h3 className="font-medium text-foreground">Current Version</h3>
                  <p className="text-sm text-muted-foreground">Version {versions[0].number}</p>
                </div>
                <div className="p-4 h-full overflow-y-auto">
                  <div className="font-mono text-sm space-y-2">
                    <div className="p-2 bg-success/10 border-l-4 border-success">
                      <span className="text-success">+ FADE IN:</span>
                    </div>
                    <div className="p-2">
                      <span className="text-foreground">EXT. COFFEE SHOP - DAY</span>
                    </div>
                    <div className="p-2 bg-success/10 border-l-4 border-success">
                      <span className="text-success">+ A bustling coffee shop with large windows overlooking the street.</span>
                    </div>
                    <div className="p-2">
                      <span className="text-foreground">SARAH enters, looking around nervously.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="p-4 border-b border-border bg-muted">
                  <h3 className="font-medium text-foreground">
                    {selectedVersion ? `Version ${selectedVersion.number}` : 'Select a version'}
                  </h3>
                  {selectedVersion && (
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedVersion.createdAt)}
                    </p>
                  )}
                </div>
                <div className="p-4 h-full overflow-y-auto">
                  {selectedVersion ? (
                    <div className="font-mono text-sm space-y-2">
                      <div className="p-2">
                        <span className="text-foreground">FADE IN:</span>
                      </div>
                      <div className="p-2">
                        <span className="text-foreground">EXT. COFFEE SHOP - DAY</span>
                      </div>
                      <div className="p-2 bg-destructive/10 border-l-4 border-destructive">
                        <span className="text-destructive line-through">- A small coffee shop on a quiet street corner.</span>
                      </div>
                      <div className="p-2">
                        <span className="text-foreground">SARAH enters, looking confident.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Icon name="GitCompare" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Select a version to compare</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {versions.length} version{versions.length > 1 ? 's' : ''} available
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            {selectedVersion && showDiff && (
              <Button
                variant="default"
                onClick={() => handleRestore(selectedVersion)}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Restore Version
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistoryModal;