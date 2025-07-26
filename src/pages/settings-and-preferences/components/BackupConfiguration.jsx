import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import ImportExportModal from '../../../components/ui/ImportExportModal';
import { useLocalStorage, useImportExport } from '../../../hooks/useLocalStorage';
import storageService from '../../../utils/storage';

const BackupConfiguration = () => {
  const [backupSettings, setBackupSettings] = useLocalStorage('scriptcraft_backup_settings', {
    autoSaveEnabled: true,
    autoSaveInterval: '30',
    localBackupEnabled: true,
    localBackupFrequency: 'daily',
    localBackupRetention: '30',
    cloudSyncEnabled: false,
    cloudProvider: 'google-drive',
    cloudSyncFrequency: 'hourly',
    versionHistoryEnabled: true,
    maxVersions: '50',
    compressionEnabled: true,
    encryptionEnabled: false
  });

  const [backupStatus, setBackupStatus] = useState({
    lastAutoSave: 'Never',
    lastLocalBackup: 'Never',
    lastCloudSync: 'Never',
    totalBackups: 0,
    storageUsed: '0 KB',
    nextScheduledBackup: 'Never'
  });

  const [showImportExport, setShowImportExport] = useState(false);
  const [importExportMode, setImportExportMode] = useState('export');
  const { exportData, importData } = useImportExport();

  useEffect(() => {
    // Load actual backup status from storage
    const updateBackupStatus = () => {
      const usage = storageService.getStorageUsage();
      const recentActivity = storageService.getRecentActivity();
      const lastAutoSave = recentActivity.find(a => a.type === 'script_updated');
      const lastBackup = localStorage.getItem('scriptcraft_last_backup');
      
      setBackupStatus({
        lastAutoSave: lastAutoSave ? new Date(lastAutoSave.timestamp).toLocaleString() : 'Never',
        lastLocalBackup: lastBackup ? new Date(lastBackup).toLocaleString() : 'Never',
        lastCloudSync: 'Never', // Cloud sync not implemented yet
        totalBackups: usage.itemCounts.scripts,
        storageUsed: `${usage.totalSizeMB} MB`,
        nextScheduledBackup: backupSettings.localBackupEnabled ? 
          new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString() : 'Never'
      });
    };

    updateBackupStatus();
    const interval = setInterval(updateBackupStatus, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [backupSettings]);

  const intervalOptions = [
    { value: '15', label: 'Every 15 seconds' },
    { value: '30', label: 'Every 30 seconds' },
    { value: '60', label: 'Every minute' },
    { value: '300', label: 'Every 5 minutes' },
    { value: '600', label: 'Every 10 minutes' }
  ];

  const frequencyOptions = [
    { value: 'hourly', label: 'Every hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'manual', label: 'Manual only' }
  ];

  const cloudProviderOptions = [
    { value: 'google-drive', label: 'Google Drive' },
    { value: 'dropbox', label: 'Dropbox' },
    { value: 'onedrive', label: 'Microsoft OneDrive' },
    { value: 'icloud', label: 'iCloud Drive' }
  ];

  const retentionOptions = [
    { value: '7', label: '7 days' },
    { value: '14', label: '14 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: '365', label: '1 year' },
    { value: 'unlimited', label: 'Keep forever' }
  ];

  const versionOptions = [
    { value: '10', label: '10 versions' },
    { value: '25', label: '25 versions' },
    { value: '50', label: '50 versions' },
    { value: '100', label: '100 versions' },
    { value: 'unlimited', label: 'Unlimited' }
  ];

  const handleSettingChange = (key, value) => {
    setBackupSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Settings are automatically saved via useLocalStorage hook
    alert('Backup settings saved successfully!');
  };

  const handleManualBackup = async () => {
    const result = await exportData({
      includeScripts: true,
      includeProjects: true,
      includeSettings: true,
      includeFolders: true,
      includeTags: true,
      includeVersionHistory: backupSettings.versionHistoryEnabled
    });
    
    if (result.success) {
      localStorage.setItem('scriptcraft_last_backup', new Date().toISOString());
      setBackupStatus(prev => ({
        ...prev,
        lastLocalBackup: new Date().toLocaleString(),
        totalBackups: prev.totalBackups + 1
      }));
    }
  };

  const handleCloudSync = () => {
    alert('Cloud sync feature will be available in a future update. For now, use the manual backup feature.');
  };

  const handleRestoreBackup = () => {
    setImportExportMode('import');
    setShowImportExport(true);
  };

  const handleCleanupOldBackups = () => {
    if (confirm('This will clean up old version history to free up storage space. Continue?')) {
      // Clean up version history
      const versionHistory = storageService.getVersionHistory();
      const cleanedHistory = {};
      
      Object.keys(versionHistory).forEach(scriptId => {
        const versions = versionHistory[scriptId];
        if (versions && versions.length > 10) {
          cleanedHistory[scriptId] = versions.slice(-10);
        } else {
          cleanedHistory[scriptId] = versions;
        }
      });
      
      storageService.setItem('scriptcraft_version_history', cleanedHistory);
      
      // Clean up old activity
      const recentActivity = storageService.getRecentActivity();
      if (recentActivity.length > 50) {
        storageService.setItem('scriptcraft_recent_activity', recentActivity.slice(-50));
      }
      
      alert('Old backups cleaned up successfully!');
    }
  };

  const handleReset = () => {
    if (confirm('Reset all backup settings to defaults? This will not affect your existing scripts.')) {
      setBackupSettings({
        autoSaveEnabled: true,
        autoSaveInterval: '30',
        localBackupEnabled: true,
        localBackupFrequency: 'daily',
        localBackupRetention: '30',
        cloudSyncEnabled: false,
        cloudProvider: 'google-drive',
        cloudSyncFrequency: 'hourly',
        versionHistoryEnabled: true,
        maxVersions: '50',
        compressionEnabled: true,
        encryptionEnabled: false
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Backup Status Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={20} className="mr-2 text-primary" />
          Backup Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Auto-Save</label>
              <p className="text-foreground font-medium">{backupStatus.lastAutoSave}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Local Backup</label>
              <p className="text-foreground font-medium">{backupStatus.lastLocalBackup}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Cloud Sync</label>
              <p className="text-foreground font-medium">{backupStatus.lastCloudSync}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Total Scripts</label>
              <p className="text-foreground font-medium">{backupStatus.totalBackups}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Storage Used</label>
              <p className="text-foreground font-medium">{backupStatus.storageUsed}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Next Backup</label>
              <p className="text-foreground font-medium">{backupStatus.nextScheduledBackup}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
          <Button 
            onClick={handleManualBackup}
            iconName="Save"
            iconPosition="left"
          >
            Create Backup Now
          </Button>
          <Button 
            variant="outline"
            onClick={handleCloudSync}
            iconName="Cloud"
            iconPosition="left"
          >
            Sync to Cloud
          </Button>
          <Button 
            variant="outline"
            onClick={handleRestoreBackup}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Restore from Backup
          </Button>
        </div>
      </div>

      {/* Auto-Save Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-primary" />
          Auto-Save Settings
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable auto-save"
            description="Automatically save your work while typing"
            checked={backupSettings.autoSaveEnabled}
            onChange={(e) => handleSettingChange('autoSaveEnabled', e.target.checked)}
          />
          
          {backupSettings.autoSaveEnabled && (
            <div className="ml-6">
              <Select
                label="Auto-save interval"
                description="How often to automatically save your work"
                options={intervalOptions}
                value={backupSettings.autoSaveInterval}
                onChange={(value) => handleSettingChange('autoSaveInterval', value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Local Backup Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="HardDrive" size={20} className="mr-2 text-primary" />
          Local Backup Settings
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable local backups"
            description="Create backup files on your computer"
            checked={backupSettings.localBackupEnabled}
            onChange={(e) => handleSettingChange('localBackupEnabled', e.target.checked)}
          />
          
          {backupSettings.localBackupEnabled && (
            <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Backup frequency"
                description="How often to create local backups"
                options={frequencyOptions}
                value={backupSettings.localBackupFrequency}
                onChange={(value) => handleSettingChange('localBackupFrequency', value)}
              />
              
              <Select
                label="Keep backups for"
                description="How long to retain backup files"
                options={retentionOptions}
                value={backupSettings.localBackupRetention}
                onChange={(value) => handleSettingChange('localBackupRetention', value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Cloud Sync Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Cloud" size={20} className="mr-2 text-primary" />
          Cloud Sync Settings
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable cloud sync"
            description="Sync your scripts and backups to cloud storage"
            checked={backupSettings.cloudSyncEnabled}
            onChange={(e) => handleSettingChange('cloudSyncEnabled', e.target.checked)}
          />
          
          {backupSettings.cloudSyncEnabled && (
            <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Cloud provider"
                description="Choose your preferred cloud storage service"
                options={cloudProviderOptions}
                value={backupSettings.cloudProvider}
                onChange={(value) => handleSettingChange('cloudProvider', value)}
              />
              
              <Select
                label="Sync frequency"
                description="How often to sync to the cloud"
                options={frequencyOptions}
                value={backupSettings.cloudSyncFrequency}
                onChange={(value) => handleSettingChange('cloudSyncFrequency', value)}
              />
            </div>
          )}
          
          {backupSettings.cloudSyncEnabled && (
            <div className="ml-6 mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground flex items-start">
                <Icon name="Info" size={16} className="mr-2 mt-0.5 text-primary" />
                Cloud sync feature will be available in a future update. For now, use manual backup and restore functionality.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Version History Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="History" size={20} className="mr-2 text-primary" />
          Version History Settings
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable version history"
            description="Keep track of changes and allow reverting to previous versions"
            checked={backupSettings.versionHistoryEnabled}
            onChange={(e) => handleSettingChange('versionHistoryEnabled', e.target.checked)}
          />
          
          {backupSettings.versionHistoryEnabled && (
            <div className="ml-6">
              <Select
                label="Maximum versions to keep"
                description="Older versions will be automatically deleted"
                options={versionOptions}
                value={backupSettings.maxVersions}
                onChange={(value) => handleSettingChange('maxVersions', value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Advanced Backup Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-primary" />
          Advanced Options
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable compression"
            description="Compress backup files to save storage space"
            checked={backupSettings.compressionEnabled}
            onChange={(e) => handleSettingChange('compressionEnabled', e.target.checked)}
          />
          
          <Checkbox
            label="Enable encryption"
            description="Encrypt backup files for additional security"
            checked={backupSettings.encryptionEnabled}
            onChange={(e) => handleSettingChange('encryptionEnabled', e.target.checked)}
          />
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <Button 
            variant="outline"
            onClick={handleCleanupOldBackups}
            iconName="Trash2"
            iconPosition="left"
          >
            Clean Up Old Backups
          </Button>
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

      {/* Import/Export Modal */}
      <ImportExportModal
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
        mode={importExportMode}
      />
    </div>
  );
};

export default BackupConfiguration;