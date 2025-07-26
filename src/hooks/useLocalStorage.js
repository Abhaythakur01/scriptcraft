import { useState, useEffect, useCallback } from 'react';
import storageService from '../utils/storage';

/**
 * Custom hook for managing local storage with React state
 */
export const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = storageService.getItem(key);
      return item !== null ? item : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storageService.setItem(key, valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

/**
 * Hook for managing scripts with local storage
 */
export const useScriptsStorage = () => {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScripts = () => {
      try {
        const storedScripts = storageService.getScripts();
        setScripts(storedScripts);
      } catch (error) {
        console.error('Error loading scripts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadScripts();
  }, []);

  const addScript = useCallback((script) => {
    const newScript = storageService.addScript(script);
    setScripts(prev => [newScript, ...prev]);
    return newScript;
  }, []);

  const updateScript = useCallback((scriptId, updates) => {
    const updatedScript = storageService.updateScript(scriptId, updates);
    if (updatedScript) {
      setScripts(prev => prev.map(s => s.id === scriptId ? updatedScript : s));
    }
    return updatedScript;
  }, []);

  const saveScript = useCallback((scriptId, content) => {
    const scripts = storageService.getScripts();
    const scriptToUpdate = scripts.find(s => s.id === scriptId);

    if (scriptToUpdate) {
      storageService.addVersionHistory(scriptId, scriptToUpdate);
      updateScript(scriptId, { content });
    }
  }, [updateScript]);


  const deleteScript = useCallback((scriptId) => {
    const deleted = storageService.deleteScript(scriptId);
    if (deleted) {
      setScripts(prev => prev.filter(s => s.id !== scriptId));
    }
    return deleted;
  }, []);

  const searchScripts = useCallback((query, options) => {
    return storageService.searchScripts(query, options);
  }, []);

  return {
    scripts,
    loading,
    addScript,
    updateScript,
    saveScript,
    deleteScript,
    searchScripts,
    refreshScripts: () => setScripts(storageService.getScripts())
  };
};

/**
 * Hook for managing folders
 */
export const useFoldersStorage = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    setFolders(storageService.getFolders());
  }, []);

  const addFolder = useCallback((folder) => {
    const newFolder = storageService.addFolder(folder);
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  }, []);

  const addScriptToFolder = useCallback((scriptId, folderId) => {
    const success = storageService.addScriptToFolder(scriptId, folderId);
    if (success) {
      setFolders(storageService.getFolders());
    }
    return success;
  }, []);

  return {
    folders,
    addFolder,
    addScriptToFolder,
    refreshFolders: () => setFolders(storageService.getFolders())
  };
};

/**
 * Hook for import/export functionality
 */
export const useImportExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const exportData = useCallback(async (options = {}) => {
    setIsExporting(true);
    try {
      const data = storageService.exportData(options);
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `scriptcraft_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error('Export failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsExporting(false);
    }
  }, []);

  const importData = useCallback(async (file, options = {}) => {
    setIsImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const result = storageService.importData(data, options);
      return { success: true, ...result };
    } catch (error) {
      console.error('Import failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsImporting(false);
    }
  }, []);

  return {
    exportData,
    importData,
    isExporting,
    isImporting
  };
};

/**
 * Hook for managing app settings
 */
export const useSettingsStorage = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    setSettings(storageService.getSettings());
  }, []);

  const updateSettings = useCallback((updates) => {
    const newSettings = storageService.updateSettings(updates);
    setSettings(newSettings);
    return newSettings;
  }, []);

  return {
    settings,
    updateSettings,
    refreshSettings: () => setSettings(storageService.getSettings())
  };
};

export default useLocalStorage;