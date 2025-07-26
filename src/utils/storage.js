/**
 * Local Storage Service for ScriptCraft Application
 * Handles all data persistence, import/export, and data management
 */

// Storage keys
const STORAGE_KEYS = {
  SCRIPTS: 'scriptcraft_scripts',
  PROJECTS: 'scriptcraft_projects', 
  SETTINGS: 'scriptcraft_settings',
  FOLDERS: 'scriptcraft_folders',
  TAGS: 'scriptcraft_tags',
  USER_PREFERENCES: 'scriptcraft_user_preferences',
  BACKUP_SETTINGS: 'scriptcraft_backup_settings',
  VERSION_HISTORY: 'scriptcraft_version_history',
  RECENT_ACTIVITY: 'scriptcraft_recent_activity'
};

// Default data structures
const DEFAULT_DATA = {
  scripts: [],
  projects: [],
  settings: {
    theme: 'light',
    autoSave: true,
    autoSaveInterval: 30,
    fontSize: 14,
    fontFamily: 'courier',
    lineSpacing: 1.5
  },
  folders: [
    { id: 'default', name: 'All Scripts', color: '#6366f1', scriptIds: [] }
  ],
  tags: [],
  userPreferences: {
    viewMode: 'grid',
    sortBy: 'recent',
    filterType: 'all'
  },
  backupSettings: {
    autoSaveEnabled: true,
    autoSaveInterval: '30',
    localBackupEnabled: true,
    localBackupFrequency: 'daily',
    versionHistoryEnabled: true,
    maxVersions: '50'
  },
  versionHistory: {},
  recentActivity: []
};

class StorageService {
  constructor() {
    this.initialized = false;
    this.init();
  }

  /**
   * Initialize storage with default data if not exists
   */
  init() {
    try {
      Object.keys(STORAGE_KEYS).forEach(key => {
        const storageKey = STORAGE_KEYS[key];
        const defaultKey = key.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        
        if (!this.getItem(storageKey)) {
          this.setItem(storageKey, DEFAULT_DATA[defaultKey] || {});
        }
      });
      this.initialized = true;
    } catch (error) {
      console.error('Storage initialization failed:', error);
    }
  }

  /**
   * Get item from localStorage with error handling
   */
  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  /**
   * Set item in localStorage with error handling
   */
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      if (error.name === 'QuotaExceededError') {
        this.handleStorageQuotaExceeded();
      }
      return false;
    }
  }

  /**
   * Handle storage quota exceeded
   */
  handleStorageQuotaExceeded() {
    // Clean up old version history
    const versionHistory = this.getVersionHistory();
    const cleanedHistory = {};
    
    Object.keys(versionHistory).forEach(scriptId => {
      const versions = versionHistory[scriptId];
      if (versions && versions.length > 10) {
        cleanedHistory[scriptId] = versions.slice(-10); // Keep last 10 versions
      } else {
        cleanedHistory[scriptId] = versions;
      }
    });
    
    this.setItem(STORAGE_KEYS.VERSION_HISTORY, cleanedHistory);
    
    // Clean up old recent activity
    const recentActivity = this.getRecentActivity();
    if (recentActivity.length > 50) {
      this.setItem(STORAGE_KEYS.RECENT_ACTIVITY, recentActivity.slice(-50));
    }
  }

  // Scripts Management
  getScripts() {
    return this.getItem(STORAGE_KEYS.SCRIPTS) || [];
  }

  setScripts(scripts) {
    return this.setItem(STORAGE_KEYS.SCRIPTS, scripts);
  }

  addScript(script) {
    const scripts = this.getScripts();
    const newScript = {
      ...script,
      id: script.id || Date.now(),
      createdAt: script.createdAt || new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: script.version || '1.0'
    };
    
    scripts.unshift(newScript);
    this.setScripts(scripts);
    this.addRecentActivity('script_created', newScript);
    return newScript;
  }

  updateScript(scriptId, updates) {
    const scripts = this.getScripts();
    const index = scripts.findIndex(s => s.id === scriptId);
    
    if (index !== -1) {
      const oldScript = { ...scripts[index] };
      scripts[index] = {
        ...scripts[index],
        ...updates,
        lastModified: new Date().toISOString()
      };
      
      this.setScripts(scripts);
      this.addVersionHistory(scriptId, oldScript);
      this.addRecentActivity('script_updated', scripts[index]);
      return scripts[index];
    }
    return null;
  }

  deleteScript(scriptId) {
    const scripts = this.getScripts();
    const scriptIndex = scripts.findIndex(s => s.id === scriptId);
    
    if (scriptIndex !== -1) {
      const deletedScript = scripts[scriptIndex];
      scripts.splice(scriptIndex, 1);
      this.setScripts(scripts);
      
      // Remove from folders
      const folders = this.getFolders();
      folders.forEach(folder => {
        folder.scriptIds = folder.scriptIds.filter(id => id !== scriptId);
      });
      this.setFolders(folders);
      
      this.addRecentActivity('script_deleted', deletedScript);
      return true;
    }
    return false;
  }

  // Projects Management
  getProjects() {
    return this.getItem(STORAGE_KEYS.PROJECTS) || [];
  }

  setProjects(projects) {
    return this.setItem(STORAGE_KEYS.PROJECTS, projects);
  }

  // Folders Management
  getFolders() {
    return this.getItem(STORAGE_KEYS.FOLDERS) || DEFAULT_DATA.folders;
  }

  setFolders(folders) {
    return this.setItem(STORAGE_KEYS.FOLDERS, folders);
  }

  addFolder(folder) {
    const folders = this.getFolders();
    const newFolder = {
      ...folder,
      id: folder.id || `folder_${Date.now()}`,
      createdAt: new Date().toISOString(),
      scriptIds: folder.scriptIds || []
    };
    
    folders.push(newFolder);
    this.setFolders(folders);
    return newFolder;
  }

  addScriptToFolder(scriptId, folderId) {
    const folders = this.getFolders();
    const folder = folders.find(f => f.id === folderId);
    
    if (folder && !folder.scriptIds.includes(scriptId)) {
      folder.scriptIds.push(scriptId);
      this.setFolders(folders);
      return true;
    }
    return false;
  }

  // Tags Management
  getTags() {
    return this.getItem(STORAGE_KEYS.TAGS) || [];
  }

  setTags(tags) {
    return this.setItem(STORAGE_KEYS.TAGS, tags);
  }

  addTag(tag) {
    const tags = this.getTags();
    if (!tags.find(t => t.name === tag.name)) {
      const newTag = {
        ...tag,
        id: tag.id || `tag_${Date.now()}`,
        createdAt: new Date().toISOString(),
        usageCount: 0
      };
      tags.push(newTag);
      this.setTags(tags);
      return newTag;
    }
    return null;
  }

  // Settings Management
  getSettings() {
    return this.getItem(STORAGE_KEYS.SETTINGS) || DEFAULT_DATA.settings;
  }

  setSettings(settings) {
    return this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  updateSettings(updates) {
    const settings = this.getSettings();
    const newSettings = { ...settings, ...updates };
    this.setSettings(newSettings);
    return newSettings;
  }

  // User Preferences
  getUserPreferences() {
    return this.getItem(STORAGE_KEYS.USER_PREFERENCES) || DEFAULT_DATA.userPreferences;
  }

  setUserPreferences(preferences) {
    return this.setItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  // Backup Settings
  getBackupSettings() {
    return this.getItem(STORAGE_KEYS.BACKUP_SETTINGS) || DEFAULT_DATA.backupSettings;
  }

  setBackupSettings(settings) {
    return this.setItem(STORAGE_KEYS.BACKUP_SETTINGS, settings);
  }

  // Version History
  getVersionHistory() {
    return this.getItem(STORAGE_KEYS.VERSION_HISTORY) || {};
  }

  addVersionHistory(scriptId, scriptData) {
    const history = this.getVersionHistory();
    
    if (!history[scriptId]) {
      history[scriptId] = [];
    }
    
    const versionEntry = {
      id: Date.now(),
      version: scriptData.version,
      data: scriptData,
      createdAt: new Date().toISOString(),
      changes: this.calculateChanges(scriptData)
    };
    
    history[scriptId].unshift(versionEntry);
    
    // Keep only last 50 versions per script
    if (history[scriptId].length > 50) {
      history[scriptId] = history[scriptId].slice(0, 50);
    }
    
    this.setItem(STORAGE_KEYS.VERSION_HISTORY, history);
  }

  // Recent Activity
  getRecentActivity() {
    return this.getItem(STORAGE_KEYS.RECENT_ACTIVITY) || [];
  }

  addRecentActivity(type, data) {
    const activity = this.getRecentActivity();
    const activityEntry = {
      id: Date.now(),
      type,
      data,
      timestamp: new Date().toISOString()
    };
    
    activity.unshift(activityEntry);
    
    // Keep only last 100 activities
    if (activity.length > 100) {
      activity.splice(100);
    }
    
    this.setItem(STORAGE_KEYS.RECENT_ACTIVITY, activity);
  }

  // Search functionality
  searchScripts(query, options = {}) {
    const scripts = this.getScripts();
    const { 
      searchInContent = true, 
      searchInTags = true, 
      caseSensitive = false,
      folders = [],
      tags = [],
      statuses = []
    } = options;

    if (!query && !folders.length && !tags.length && !statuses.length) {
      return scripts;
    }

    return scripts.filter(script => {
      // Folder filter
      if (folders.length > 0) {
        const scriptFolders = this.getFolders().filter(f => f.scriptIds.includes(script.id));
        if (!scriptFolders.some(f => folders.includes(f.id))) {
          return false;
        }
      }

      // Status filter
      if (statuses.length > 0 && !statuses.includes(script.status)) {
        return false;
      }

      // Tags filter
      if (tags.length > 0) {
        const scriptTags = script.tags || [];
        if (!tags.some(tag => scriptTags.includes(tag))) {
          return false;
        }
      }

      // Text search
      if (query) {
        const searchQuery = caseSensitive ? query : query.toLowerCase();
        const searchText = caseSensitive ? 
          `${script.title} ${script.description} ${script.content || ''}` :
          `${script.title} ${script.description} ${script.content || ''}`.toLowerCase();

        if (searchInTags && script.tags) {
          const tagText = caseSensitive ? script.tags.join(' ') : script.tags.join(' ').toLowerCase();
          return searchText.includes(searchQuery) || tagText.includes(searchQuery);
        }

        return searchText.includes(searchQuery);
      }

      return true;
    });
  }

  // Export functionality
  exportData(options = {}) {
    const { 
      includeScripts = true,
      includeProjects = true,
      includeSettings = true,
      includeFolders = true,
      includeTags = true,
      includeVersionHistory = false,
      scriptIds = []
    } = options;

    const exportData = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      data: {}
    };

    if (includeScripts) {
      const scripts = this.getScripts();
      exportData.data.scripts = scriptIds.length > 0 ? 
        scripts.filter(s => scriptIds.includes(s.id)) : scripts;
    }

    if (includeProjects) {
      exportData.data.projects = this.getProjects();
    }

    if (includeSettings) {
      exportData.data.settings = this.getSettings();
      exportData.data.userPreferences = this.getUserPreferences();
      exportData.data.backupSettings = this.getBackupSettings();
    }

    if (includeFolders) {
      exportData.data.folders = this.getFolders();
    }

    if (includeTags) {
      exportData.data.tags = this.getTags();
    }

    if (includeVersionHistory && scriptIds.length > 0) {
      const allHistory = this.getVersionHistory();
      const filteredHistory = {};
      scriptIds.forEach(id => {
        if (allHistory[id]) {
          filteredHistory[id] = allHistory[id];
        }
      });
      exportData.data.versionHistory = filteredHistory;
    }

    return exportData;
  }

  // Import functionality
  importData(data, options = {}) {
    const {
      overwrite = false,
      mergeScripts = true,
      mergeSettings = true
    } = options;

    try {
      // Validate import data
      if (!data || !data.data) {
        throw new Error('Invalid import data format');
      }

      const results = {
        imported: 0,
        errors: [],
        warnings: []
      };

      // Import scripts
      if (data.data.scripts) {
        const existingScripts = this.getScripts();
        const importedScripts = [...existingScripts];

        data.data.scripts.forEach(script => {
          try {
            const existingIndex = existingScripts.findIndex(s => s.id === script.id);
            
            if (existingIndex !== -1) {
              if (overwrite || mergeScripts) {
                importedScripts[existingIndex] = {
                  ...script,
                  lastModified: new Date().toISOString()
                };
                results.imported++;
              } else {
                results.warnings.push(`Script "${script.title}" already exists, skipped`);
              }
            } else {
              importedScripts.push({
                ...script,
                id: script.id || Date.now() + Math.random(),
                lastModified: new Date().toISOString()
              });
              results.imported++;
            }
          } catch (error) {
            results.errors.push(`Error importing script "${script.title}": ${error.message}`);
          }
        });

        this.setScripts(importedScripts);
      }

      // Import other data similarly
      if (data.data.folders && (overwrite || !this.getFolders().length)) {
        this.setFolders(data.data.folders);
      }

      if (data.data.tags && (overwrite || !this.getTags().length)) {
        this.setTags(data.data.tags);
      }

      if (data.data.settings && (overwrite || mergeSettings)) {
        const existingSettings = this.getSettings();
        this.setSettings({ ...existingSettings, ...data.data.settings });
      }

      this.addRecentActivity('data_imported', { 
        imported: results.imported,
        timestamp: new Date().toISOString()
      });

      return results;
    } catch (error) {
      console.error('Import failed:', error);
      return {
        imported: 0,
        errors: [error.message],
        warnings: []
      };
    }
  }

  // Utility methods
  calculateChanges(scriptData) {
    // Simple change calculation based on content length
    return scriptData.content ? scriptData.content.length : 0;
  }

  getStorageUsage() {
    let totalSize = 0;
    
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += item.length;
      }
    });

    return {
      totalSize,
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
      itemCounts: {
        scripts: this.getScripts().length,
        projects: this.getProjects().length,
        folders: this.getFolders().length,
        tags: this.getTags().length
      }
    };
  }

  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    this.init();
  }
}

// Create singleton instance
const storageService = new StorageService();

export default storageService;