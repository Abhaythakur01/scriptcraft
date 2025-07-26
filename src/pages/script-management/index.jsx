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

const ScriptManagement = () => {
  const navigate = useNavigate();
  const [scripts, setScripts] = useState([]);
  const [filteredScripts, setFilteredScripts] = useState([]);
  const [selectedScripts, setSelectedScripts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showExportWizard, setShowExportWizard] = useState(false);
  const [selectedScript, setSelectedScript] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'lastModified', direction: 'desc' });
  const [filters, setFilters] = useState({
    genres: [],
    statuses: [],
    dateRange: { from: '', to: '' },
    tags: []
  });

  // Mock data
  const mockScripts = [
    {
      id: 1,
      title: "The Last Stand",
      description: "A gripping action thriller about survival",
      genre: "Action",
      status: "completed",
      lastModified: new Date(2025, 6, 20),
      pageCount: 120,
      version: "2.1",
      author: "John Writer",
      tags: ["action", "thriller", "completed"]
    },
    {
      id: 2,
      title: "Coffee Shop Chronicles",
      description: "A romantic comedy set in downtown Seattle",
      genre: "Comedy",
      status: "in-progress",
      lastModified: new Date(2025, 6, 24),
      pageCount: 87,
      version: "1.5",
      author: "John Writer",
      tags: ["comedy", "romance", "seattle"]
    },
    {
      id: 3,
      title: "Midnight Detective",
      description: "A noir mystery in 1940s Los Angeles",
      genre: "Mystery",
      status: "draft",
      lastModified: new Date(2025, 6, 15),
      pageCount: 45,
      version: "0.8",
      author: "John Writer",
      tags: ["mystery", "noir", "1940s"]
    },
    {
      id: 4,
      title: "Space Odyssey 2087",
      description: "Humanity\'s first journey to distant galaxies",
      genre: "Sci-Fi",
      status: "in-progress",
      lastModified: new Date(2025, 6, 22),
      pageCount: 98,
      version: "1.2",
      author: "John Writer",
      tags: ["sci-fi", "space", "future"]
    },
    {
      id: 5,
      title: "The Haunted Manor",
      description: "A supernatural horror story",
      genre: "Horror",
      status: "archived",
      lastModified: new Date(2025, 5, 10),
      pageCount: 110,
      version: "3.0",
      author: "John Writer",
      tags: ["horror", "supernatural", "manor"]
    }
  ];

  const mockVersions = [
    {
      id: 1,
      number: "2.1",
      type: "major",
      description: "Final draft with director\'s notes incorporated",
      author: "John Writer",
      createdAt: new Date(2025, 6, 20),
      changes: 47,
      size: "1.2 MB"
    },
    {
      id: 2,
      number: "2.0",
      type: "major",
      description: "Second draft after feedback review",
      author: "John Writer",
      createdAt: new Date(2025, 6, 15),
      changes: 89,
      size: "1.1 MB"
    },
    {
      id: 3,
      number: "1.5",
      type: "minor",
      description: "Character development improvements",
      author: "John Writer",
      createdAt: new Date(2025, 6, 10),
      changes: 23,
      size: "1.0 MB"
    },
    {
      id: 4,
      number: "1.0",
      type: "major",
      description: "First complete draft",
      author: "John Writer",
      createdAt: new Date(2025, 6, 1),
      changes: 156,
      size: "950 KB"
    }
  ];

  const mockSearchResults = [
    {
      id: 1,
      title: "The Last Stand",
      type: "Feature Film",
      genre: "Action",
      snippet: "FADE IN: EXT. ABANDONED WAREHOUSE - NIGHT. The rain pounds against the broken windows...",
      matchType: "content",
      pageNumber: 15
    },
    {
      id: 2,
      title: "Coffee Shop Chronicles",
      type: "Feature Film", 
      genre: "Comedy",
      snippet: "SARAH enters the coffee shop, looking around nervously for her blind date...",
      matchType: "content",
      pageNumber: 8
    }
  ];

  const savedPresets = [
    { id: 1, name: "Completed Scripts", filters: { statuses: ["completed"], genres: [], dateRange: { from: '', to: '' }, tags: [] } },
    { id: 2, name: "Recent Drafts", filters: { statuses: ["draft", "in-progress"], genres: [], dateRange: { from: '', to: '' }, tags: [] } },
    { id: 3, name: "Action & Thriller", filters: { genres: ["Action", "Thriller"], statuses: [], dateRange: { from: '', to: '' }, tags: [] } }
  ];

  useEffect(() => {
    setScripts(mockScripts);
    setFilteredScripts(mockScripts);
  }, []);

  useEffect(() => {
    let filtered = [...scripts];

    // Apply filters
    if (filters.genres.length > 0) {
      filtered = filtered.filter(script => filters.genres.includes(script.genre));
    }

    if (filters.statuses.length > 0) {
      filtered = filtered.filter(script => filters.statuses.includes(script.status));
    }

    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from);
      filtered = filtered.filter(script => script.lastModified >= fromDate);
    }

    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to);
      filtered = filtered.filter(script => script.lastModified <= toDate);
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(script => 
        filters.tags.some(tag => script.tags.includes(tag.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredScripts(filtered);
  }, [scripts, filters, sortConfig]);

  const handleSearch = (query) => {
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      if (query.trim()) {
        setSearchResults(mockSearchResults.filter(result => 
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.snippet.toLowerCase().includes(query.toLowerCase())
        ));
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
      id: Date.now(),
      title: `${script.title} (Copy)`,
      version: "1.0",
      lastModified: new Date()
    };
    setScripts(prev => [newScript, ...prev]);
  };

  const handleArchiveScript = (script) => {
    setScripts(prev => 
      prev.map(s => s.id === script.id ? { ...s, status: 'archived' } : s)
    );
  };

  const handleDeleteScript = (script) => {
    if (confirm(`Are you sure you want to delete "${script.title}"? This action cannot be undone.`)) {
      setScripts(prev => prev.filter(s => s.id !== script.id));
      setSelectedScripts(prev => prev.filter(id => id !== script.id));
    }
  };

  const handleViewHistory = (script) => {
    setSelectedScript(script);
    setShowVersionHistory(true);
  };

  const handleBulkExport = () => {
    setShowExportWizard(true);
  };

  const handleBulkArchive = () => {
    if (confirm(`Archive ${selectedScripts.length} selected scripts?`)) {
      setScripts(prev => 
        prev.map(script => 
          selectedScripts.includes(script.id) 
            ? { ...script, status: 'archived' }
            : script
        )
      );
      setSelectedScripts([]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedScripts.length} selected scripts? This action cannot be undone.`)) {
      setScripts(prev => prev.filter(script => !selectedScripts.includes(script.id)));
      setSelectedScripts([]);
    }
  };

  const handleCreateFolder = () => {
    console.log('Create folder for selected scripts');
  };

  const handleMoveToFolder = () => {
    console.log('Move selected scripts to folder');
  };

  const handleSavePreset = (name, filterSettings) => {
    console.log('Saving preset:', name, filterSettings);
  };

  const handleLoadPreset = (preset) => {
    setFilters(preset.filters);
  };

  const handleNewScript = () => {
    navigate('/script-editor');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScriptContextToolbar />
      
      <div className="pt-32 lg:pt-28">
        <div className="flex h-[calc(100vh-8rem)]">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            onFiltersChange={setFilters}
            onSavePreset={handleSavePreset}
            savedPresets={savedPresets}
            onLoadPreset={handleLoadPreset}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header Section */}
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
                    onClick={() => setShowExportWizard(true)}
                    iconName="Download"
                    iconPosition="left"
                    className="hidden sm:flex"
                  >
                    Export
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

              {/* Search and Controls */}
              <div className="mt-6">
                <SearchBar
                  onSearch={handleSearch}
                  onFilterToggle={() => setShowFilters(!showFilters)}
                  searchResults={searchResults}
                  isSearching={isSearching}
                />
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileText" size={20} className="text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Total Scripts</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">{scripts.length}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={20} className="text-warning" />
                    <span className="text-sm font-medium text-muted-foreground">In Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {scripts.filter(s => s.status === 'in-progress').length}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={20} className="text-success" />
                    <span className="text-sm font-medium text-muted-foreground">Completed</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {scripts.filter(s => s.status === 'completed').length}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Archive" size={20} className="text-secondary" />
                    <span className="text-sm font-medium text-muted-foreground">Archived</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {scripts.filter(s => s.status === 'archived').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Scripts Table */}
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
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedScripts.length}
        onExport={handleBulkExport}
        onArchive={handleBulkArchive}
        onDelete={handleBulkDelete}
        onCreateFolder={handleCreateFolder}
        onMoveToFolder={handleMoveToFolder}
        onClearSelection={() => setSelectedScripts([])}
      />

      {/* Modals */}
      <VersionHistoryModal
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        script={selectedScript}
        versions={mockVersions}
      />

      <ExportWizard
        isOpen={showExportWizard}
        onClose={() => setShowExportWizard(false)}
        selectedScripts={selectedScripts.length > 0 ? selectedScripts : scripts.map(s => s.id)}
      />
    </div>
  );
};

export default ScriptManagement;