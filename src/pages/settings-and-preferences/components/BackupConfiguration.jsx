import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BackupConfiguration = () => {
  const [backupSettings, setBackupSettings] = useState({
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
    lastAutoSave: new Date(Date.now() - 300000).toLocaleString(),
    lastLocalBackup: new Date(Date.now() - 86400000).toLocaleString(),
    lastCloudSync: 'Never',
    totalBackups: 127,
    storageUsed: '2.3 GB',
    nextScheduledBackup: new Date(Date.now() + 3600000).toLocaleString()
  });

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
    console.log('Saving backup settings:', backupSettings);
  };

  const handleManualBackup = () => {
    console.log('Creating manual backup...');
    setBackupStatus(prev => ({
      ...prev,
      lastLocalBackup: new Date().toLocaleString(),
      totalBackups: prev.totalBackups + 1
    }));
  };

  const handleCloudSync = () => {
    console.log('Syncing to cloud...');
    setBackupStatus(prev => ({
      ...prev,
      lastCloudSync: new Date().toLocaleString()
    }));
  };

  const handleRestoreBackup = () => {
    console.log('Opening restore dialog...');
  };

  const handleCleanupOldBackups = () => {
    if (confirm('This will permanently delete old backup files. Continue?')) {
      console.log('Cleaning up old backups...');
    }
  };

  const handleReset = () => {
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
              <label className="text-sm font-medium text-muted-foreground">Total Backups</label>
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
                You'll need to authenticate with your chosen cloud provider to enable sync functionality.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                iconName="Link"
                iconPosition="left"
              >
                Connect to {cloudProviderOptions.find(p => p.value === backupSettings.cloudProvider)?.label}
              </Button>
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
    </div>
  );
};

export default BackupConfiguration;