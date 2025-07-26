import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { Checkbox } from './Checkbox';
import { useImportExport } from '../../hooks/useLocalStorage';

const ImportExportModal = ({ 
  isOpen, 
  onClose, 
  mode = 'export', // 'export' or 'import'
  selectedScripts = []
}) => {
  const { exportData, importData, isExporting, isImporting } = useImportExport();
  
  const [exportOptions, setExportOptions] = useState({
    includeScripts: true,
    includeProjects: true,
    includeSettings: true,
    includeFolders: true,
    includeTags: true,
    includeVersionHistory: false,
    scriptIds: selectedScripts
  });

  const [importOptions, setImportOptions] = useState({
    overwrite: false,
    mergeScripts: true,
    mergeSettings: true
  });

  const [importFile, setImportFile] = useState(null);
  const [importResult, setImportResult] = useState(null);

  const handleExportOptionChange = (key, value) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImportOptionChange = (key, value) => {
    setImportOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = async () => {
    const result = await exportData(exportOptions);
    if (result.success) {
      onClose();
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportFile(file);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!importFile) return;
    
    const result = await importData(importFile, importOptions);
    setImportResult(result);
    
    if (result.success) {
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh to show imported data
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {mode === 'export' ? 'Export Data' : 'Import Data'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'export' ? 
                'Choose what data to export': 'Import scripts and settings from a backup file'
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
          {mode === 'export' ? (
            <div className="space-y-6">
              {/* Export Options */}
              <div>
                <h4 className="font-medium text-foreground mb-3">What to export:</h4>
                <div className="space-y-3">
                  <Checkbox
                    label="Scripts"
                    description={selectedScripts.length > 0 ? 
                      `${selectedScripts.length} selected scripts` : 
                      'All scripts in your library'
                    }
                    checked={exportOptions.includeScripts}
                    onChange={(e) => handleExportOptionChange('includeScripts', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Projects"
                    description="Project configurations and metadata"
                    checked={exportOptions.includeProjects}
                    onChange={(e) => handleExportOptionChange('includeProjects', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Settings & Preferences"
                    description="Editor settings, formatting options, and user preferences"
                    checked={exportOptions.includeSettings}
                    onChange={(e) => handleExportOptionChange('includeSettings', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Folders & Organization"
                    description="Folder structure and script organization"
                    checked={exportOptions.includeFolders}
                    onChange={(e) => handleExportOptionChange('includeFolders', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Tags"
                    description="All tags and tag associations"
                    checked={exportOptions.includeTags}
                    onChange={(e) => handleExportOptionChange('includeTags', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Version History"
                    description="Script revision history (increases file size significantly)"
                    checked={exportOptions.includeVersionHistory}
                    onChange={(e) => handleExportOptionChange('includeVersionHistory', e.target.checked)}
                  />
                </div>
              </div>

              {/* Export Info */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Export Format</p>
                    <p className="text-muted-foreground mt-1">
                      Data will be exported as a JSON file that can be imported back into ScriptCraft 
                      or used as a backup. The file will be saved to your Downloads folder.
                    </p>
                  </div>
                </div>
              </div>

              {/* Export Button */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleExport}
                  disabled={isExporting}
                  iconName={isExporting ? "Loader2" : "Download"}
                  iconPosition="left"
                >
                  {isExporting ? 'Exporting...' : 'Export Data'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Selection */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Select backup file:</h4>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="import-file"
                  />
                  <label 
                    htmlFor="import-file"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Icon name="Upload" size={32} className="text-muted-foreground mb-2" />
                    <p className="text-foreground font-medium">
                      {importFile ? importFile.name : 'Choose a backup file'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      JSON files exported from ScriptCraft
                    </p>
                  </label>
                </div>
              </div>

              {/* Import Options */}
              {importFile && (
                <div>
                  <h4 className="font-medium text-foreground mb-3">Import options:</h4>
                  <div className="space-y-3">
                    <Checkbox
                      label="Overwrite existing data"
                      description="Replace existing scripts and settings with imported data"
                      checked={importOptions.overwrite}
                      onChange={(e) => handleImportOptionChange('overwrite', e.target.checked)}
                    />
                    
                    <Checkbox
                      label="Merge scripts"
                      description="Keep existing scripts and add imported ones"
                      checked={importOptions.mergeScripts}
                      onChange={(e) => handleImportOptionChange('mergeScripts', e.target.checked)}
                      disabled={importOptions.overwrite}
                    />
                    
                    <Checkbox
                      label="Merge settings"
                      description="Combine imported settings with existing preferences"
                      checked={importOptions.mergeSettings}
                      onChange={(e) => handleImportOptionChange('mergeSettings', e.target.checked)}
                      disabled={importOptions.overwrite}
                    />
                  </div>
                </div>
              )}

              {/* Import Result */}
              {importResult && (
                <div className={`p-4 rounded-lg ${
                  importResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start space-x-2">
                    <Icon 
                      name={importResult.success ? "CheckCircle" : "AlertCircle"} 
                      size={16} 
                      className={`mt-0.5 ${
                        importResult.success ? 'text-green-600' : 'text-red-600'
                      }`}
                    />
                    <div className="text-sm">
                      <p className={`font-medium ${
                        importResult.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {importResult.success ? 
                          `Import successful! ${importResult.imported} items imported.` :
                          'Import failed'
                        }
                      </p>
                      {importResult.errors?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {importResult.errors.map((error, index) => (
                            <li key={index} className="text-red-700">• {error}</li>
                          ))}
                        </ul>
                      )}
                      {importResult.warnings?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {importResult.warnings.map((warning, index) => (
                            <li key={index} className="text-yellow-700">• {warning}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Import Button */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleImport}
                  disabled={!importFile || isImporting}
                  iconName={isImporting ? "Loader2" : "Upload"}
                  iconPosition="left"
                >
                  {isImporting ? 'Importing...' : 'Import Data'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportExportModal;