import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ScriptContextToolbar from '../../components/ui/ScriptContextToolbar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ScriptTable from './components/ScriptTable';
import FilterSidebar from './components/FilterSidebar';
import BulkActionsBar from './components/BulkActionsBar';
import VersionHistoryModal from './components/VersionHistoryModal';
import ExportWizard from './components/ExportWizard';
import SearchBar from './components/SearchBar';
import FolderManager from '../../components/ui/FolderManager';
import ImportExportModal from '../../components/ui/ImportExportModal';
import { useScriptsStorage, useFoldersStorage } from '../../hooks/useLocalStorage';
import storageService from '../../utils/storage';

const ScriptManagement = () => {
  const navigate = useNavigate();
  const { scripts, loading, addScript, updateScript, deleteScript, searchScripts } = useScriptsStorage();
  const { folders, addFolder, addScriptToFolder } = useFoldersStorage();
  
  const [filteredScripts, setFilteredScripts] = useState([]);
  const [selectedScripts, setSelectedScripts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showExportWizard, setShowExportWizard] = useState(false);
  const [scriptsToExport, setScriptsToExport] = useState([]);
  const [showFolderManager, setShowFolderManager] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [importExportMode, setImportExportMode] = useState('export');
  const [selectedScriptForHistory, setSelectedScriptForHistory] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'lastModified', direction: 'desc' });
  const [filters, setFilters] = useState({
    genres: [],
    statuses: [],
    dateRange: { from: '', to: '' },
    tags: [],
    folders: []
  });

  useEffect(() => {
    let filtered = scripts;
    if (filters.genres.length > 0) {
      filtered = filtered.filter(script => filters.genres.includes(script.genre || script.type));
    }
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(script => filters.statuses.includes(script.status || 'draft'));
    }
    if (filters.folders.length > 0) {
      const folderScriptIds = new Set();
      filters.folders.forEach(folderId => {
        const folder = folders.find(f => f.id === folderId);
        if (folder?.scriptIds) {
          folder.scriptIds.forEach(id => folderScriptIds.add(id));
        }
      });
      filtered = filtered.filter(script => folderScriptIds.has(script.id));
    }
    if (filters.dateRange.from) {
      filtered = filtered.filter(script => new Date(script.lastModified) >= new Date(filters.dateRange.from));
    }
    if (filters.dateRange.to) {
      filtered = filtered.filter(script => new Date(script.lastModified) <= new Date(filters.dateRange.to));
    }
    if (filters.tags.length > 0) {
      filtered = filtered.filter(script => script.tags && filters.tags.some(tag => script.tags.includes(tag)));
    }
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
    setFilteredScripts(filtered);
  }, [scripts, filters, sortConfig, folders]);

  const handleExportScript = (script) => {
    setScriptsToExport([script.id]);
    setShowExportWizard(true);
  };

  const handleSearch = (query) => {
    setIsSearching(true);
    setTimeout(() => {
      if (query.trim()) {
        const results = searchScripts(query, { searchInContent: true, searchInTags: true, caseSensitive: false });
        setSearchResults(results.map(script => ({
          id: script.id,
          title: script.title,
          type: script.type || 'Feature Film',
          genre: script.genre || script.type || 'Unknown',
          snippet: script.description || (typeof script.content === 'string' && script.content.substring(0, 100)) || 'No content available',
          matchType: 'content',
          pageNumber: 1
        })));
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 300);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectScript = (scriptId) => {
    setSelectedScripts(prev =>
      prev.includes(scriptId)
        ? prev.filter(id => id !== scriptId)
        : [...prev, scriptId]
    );
  };

  const handleSelectAll = () => {
    setSelectedScripts(
      selectedScripts.length === filteredScripts.length
        ? []
        : filteredScripts.map(script => script.id)
    );
  };

  const handleEditScript = (script) => {
    navigate('/script-editor', { state: { script } });
  };

  const handleDuplicateScript = (script) => {
    const newScript = {
      ...script,
      id: Date.now() + Math.random(),
      title: `${script.title} (Copy)`,
      version: "1.0",
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    addScript(newScript);
  };

  const handleArchiveScript = (script) => {
    updateScript(script.id, { status: 'archived' });
  };

  const handleDeleteScript = (script) => {
    if (window.confirm(`Are you sure you want to delete "${script.title}"? This action cannot be undone.`)) {
      deleteScript(script.id);
      setSelectedScripts(prev => prev.filter(id => id !== script.id));
    }
  };
  
  const handleViewHistory = (script) => {
    setSelectedScriptForHistory(script);
    setShowVersionHistory(true);
  };

  const handleBulkExport = () => {
    setScriptsToExport(selectedScripts);
    setShowExportWizard(true);
  };

  const handleBulkDataBackup = () => {
    setImportExportMode('export');
    setShowImportExport(true);
  };

  const handleBulkArchive = () => {
    if (window.confirm(`Archive ${selectedScripts.length} selected scripts?`)) {
      selectedScripts.forEach(scriptId => {
        updateScript(scriptId, { status: 'archived' });
      });
      setSelectedScripts([]);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedScripts.length} selected scripts? This action cannot be undone.`)) {
      selectedScripts.forEach(scriptId => {
        deleteScript(scriptId);
      });
      setSelectedScripts([]);
    }
  };

  const handleCreateFolder = () => {
    setShowFolderManager(true);
  };

  const handleMoveToFolder = () => {
    setShowFolderManager(true);
  };

  const handleSavePreset = (name, filterSettings) => {
    const presets = storageService.getItem('scriptcraft_filter_presets') || [];
    const newPreset = {
      id: Date.now(),
      name,
      filters: filterSettings,
      createdAt: new Date().toISOString()
    };
    storageService.setItem('scriptcraft_filter_presets', [...presets, newPreset]);
  };

  const handleLoadPreset = (preset) => {
    setFilters(preset.filters);
  };

  const handleNewScript = () => {
    const newScript = {
      title: "Untitled Script",
      description: "A new screenplay ready for your creative vision.",
      type: "feature",
      pageCount: 0,
      wordCount: 0,
      content: "",
      tags: [],
      status: "draft"
    };
    const createdScript = addScript(newScript);
    navigate('/script-editor', { state: { script: createdScript } });
  };

  const savedPresets = storageService.getItem('scriptcraft_filter_presets') || [];
  const getVersionHistory = (script) => {
    const allHistory = storageService.getVersionHistory();
    return allHistory[script?.id] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading script management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScriptContextToolbar />
      <div className="pt-32 lg:pt-28">
        <div className="flex h-[calc(100vh-8rem)]">
          <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            onFiltersChange={setFilters}
            onSavePreset={handleSavePreset}
            savedPresets={savedPresets}
            onLoadPreset={handleLoadPreset}
            folders={folders}
            scripts={scripts}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border bg-background">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Script Management</h1>
                  <p className="text-muted-foreground mt-1">
                    Organize and manage your screenplay library
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                   <Button
                    variant="outline"
                    onClick={handleBulkDataBackup}
                    iconName="Database"
                    iconPosition="left"
                    className="hidden sm:flex"
                  >
                    Import/Export Data
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleNewScript}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    New Script
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <SearchBar
                  onSearch={handleSearch}
                  onFilterToggle={() => setShowFilters(!showFilters)}
                  searchResults={searchResults}
                  isSearching={isSearching}
                />
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <ScriptTable
                scripts={filteredScripts}
                selectedScripts={selectedScripts}
                onSelectScript={handleSelectScript}
                onSelectAll={handleSelectAll}
                onEditScript={handleEditScript}
                onDuplicateScript={handleDuplicateScript}
                onArchiveScript={handleArchiveScript}
                onDeleteScript={handleDeleteScript}
                onViewHistory={handleViewHistory}
                onExportScript={handleExportScript}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>
          </div>
        </div>
      </div>
      <BulkActionsBar
        selectedCount={selectedScripts.length}
        onExport={handleBulkExport}
        onArchive={handleBulkArchive}
        onDelete={handleBulkDelete}
        onCreateFolder={handleCreateFolder}
        onMoveToFolder={handleMoveToFolder}
        onClearSelection={() => setSelectedScripts([])}
      />
      <VersionHistoryModal
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        script={selectedScriptForHistory}
        versions={getVersionHistory(selectedScriptForHistory)}
      />
      <ExportWizard
        isOpen={showExportWizard}
        onClose={() => setShowExportWizard(false)}
        selectedScripts={scriptsToExport}
      />
      <FolderManager
        isOpen={showFolderManager}
        onClose={() => setShowFolderManager(false)}
        selectedScripts={selectedScripts}
        onScriptsMoved={() => {
          setSelectedScripts([]);
        }}
      />
      <ImportExportModal
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
        mode={importExportMode}
        selectedScripts={selectedScripts}
      />
    </div>
  );
};

export default ScriptManagement;