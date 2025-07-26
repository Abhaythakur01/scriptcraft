import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ScriptContextToolbar from '../../components/ui/ScriptContextToolbar';
import ScriptCard from './components/ScriptCard';
import WritingStats from './components/WritingStats';
import RecentActivity from './components/RecentActivity';
import QuickStartTemplates from './components/QuickStartTemplates';
import SearchAndFilters from './components/SearchAndFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useScriptsStorage, useFoldersStorage, useLocalStorage } from '../../hooks/useLocalStorage';


const Dashboard = () => {
  const { scripts, loading, addScript, updateScript, deleteScript, searchScripts } = useScriptsStorage();
  const { folders } = useFoldersStorage();
  const [userPreferences, setUserPreferences] = useLocalStorage('scriptcraft_user_preferences', {
    viewMode: 'grid',
    sortBy: 'recent',
    filterType: 'all'
  });

  const [filteredScripts, setFilteredScripts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Apply filters and search
  useEffect(() => {
    let filtered = scripts;

    // Apply search
    if (searchQuery) {
      filtered = searchScripts(searchQuery, {
        searchInContent: true,
        searchInTags: true,
        caseSensitive: false
      });
    }

    // Apply type filter
    if (userPreferences.filterType !== 'all') {
      filtered = filtered.filter(script => script.type === userPreferences.filterType);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (userPreferences.sortBy) {
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.createdAt || b.lastModified) - new Date(a.createdAt || a.lastModified);
        case 'pages':
          return (b.pageCount || 0) - (a.pageCount || 0);
        case 'type':
          return a.type?.localeCompare(b.type || '');
        case 'recent':
        default:
          return new Date(b.lastModified) - new Date(a.lastModified);
      }
    });

    setFilteredScripts(filtered);
  }, [scripts, searchQuery, userPreferences.filterType, userPreferences.sortBy, searchScripts]);

  const handleDuplicateScript = (scriptId) => {
    const scriptToDuplicate = scripts.find(s => s.id === scriptId);
    if (scriptToDuplicate) {
      const newScript = {
        ...scriptToDuplicate,
        id: Date.now() + Math.random(),
        title: `${scriptToDuplicate.title} (Copy)`,
        lastModified: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      addScript(newScript);
    }
  };

  const handleDeleteScript = (scriptId) => {
    if (window.confirm('Are you sure you want to delete this script?')) {
      deleteScript(scriptId);
    }
  };

  const handlePreferenceChange = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreateNewScript = () => {
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
    // Navigate to editor with the new script
    window.location.href = `/script-editor?id=${createdScript.id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your scripts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScriptContextToolbar />
      
      <main className="pt-16 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Welcome back, John
            </h1>
            <p className="text-muted-foreground">
              Continue your creative journey. You have {scripts.length} scripts in your portfolio.
            </p>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            onSearch={setSearchQuery}
            onSort={(value) => handlePreferenceChange('sortBy', value)}
            onViewChange={(value) => handlePreferenceChange('viewMode', value)}
            viewMode={userPreferences.viewMode}
            onFilterChange={(value) => handlePreferenceChange('filterType', value)}
          />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-3">
              {/* Scripts Grid/List */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    Your Scripts
                    {filteredScripts.length !== scripts.length && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({filteredScripts.length} of {scripts.length})
                      </span>
                    )}
                  </h2>
                </div>

                {filteredScripts.length === 0 ? (
                  <div className="text-center py-12 bg-card border border-border rounded-lg">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="FileText" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {searchQuery || userPreferences.filterType !== 'all' ? 'No scripts found' : 'No scripts yet'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery || userPreferences.filterType !== 'all' ? 'Try adjusting your search or filters': 'Start your screenwriting journey by creating your first script'
                      }
                    </p>
                    <Button 
                      variant="default"
                      onClick={handleCreateNewScript}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create New Script
                    </Button>
                  </div>
                ) : (
                  <div className={
                    userPreferences.viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6': 'space-y-4'
                  }>
                    {filteredScripts.map((script) => (
                      <ScriptCard
                        key={script.id}
                        script={script}
                        viewMode={userPreferences.viewMode}
                        onDuplicate={handleDuplicateScript}
                        onDelete={handleDeleteScript}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <WritingStats scripts={scripts} />
              <QuickStartTemplates onCreateScript={handleCreateNewScript} />
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;