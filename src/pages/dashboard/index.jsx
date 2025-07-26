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



const Dashboard = () => {
  const [scripts, setScripts] = useState([]);
  const [filteredScripts, setFilteredScripts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterType, setFilterType] = useState('all');

  // Mock scripts data
  const mockScripts = [
    {
      id: 1,
      title: "The Last Stand",
      description: "A gripping action thriller about a small town sheriff's final confrontation with a dangerous cartel.",
      type: "feature",
      pageCount: 108,
      wordCount: 24567,
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1489599162163-3f2f0c7c8e7e?w=300&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Midnight Café",
      description: "A romantic drama set in a 24-hour diner where strangers\' lives intersect over coffee and conversation.",
      type: "feature",
      pageCount: 95,
      wordCount: 21890,
      lastModified: new Date(Date.now() - 5 * 60 * 60 * 1000),
      thumbnail: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?w=300&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Urban Dreams",
      description: "A coming-of-age story following a young artist navigating the challenges of city life.",
      type: "short",
      pageCount: 18,
      wordCount: 4250,
      lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=300&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Silicon Valley Secrets",
      description: "A tech thriller pilot exploring corporate espionage in the heart of innovation.",
      type: "tv-pilot",
      pageCount: 52,
      wordCount: 12340,
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=400&fit=crop"
    },
    {
      id: 5,
      title: "The Journey",
      description: "An epic adventure following a group of travelers across mystical lands.",
      type: "feature",
      pageCount: 124,
      wordCount: 28750,
      lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?w=300&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Coffee Shop Chronicles",
      description: "A short film about the daily interactions in a neighborhood coffee shop.",
      type: "short",
      pageCount: 12,
      wordCount: 2890,
      lastModified: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg?w=300&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    setScripts(mockScripts);
    setFilteredScripts(mockScripts);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = scripts;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(script =>
        script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(script => script.type === filterType);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.lastModified) - new Date(a.lastModified);
        case 'pages':
          return b.pageCount - a.pageCount;
        case 'type':
          return a.type.localeCompare(b.type);
        case 'recent':
        default:
          return new Date(b.lastModified) - new Date(a.lastModified);
      }
    });

    setFilteredScripts(filtered);
  }, [scripts, searchQuery, filterType, sortBy]);

  const handleDuplicateScript = (scriptId) => {
    const scriptToDuplicate = scripts.find(s => s.id === scriptId);
    if (scriptToDuplicate) {
      const newScript = {
        ...scriptToDuplicate,
        id: Date.now(),
        title: `${scriptToDuplicate.title} (Copy)`,
        lastModified: new Date()
      };
      setScripts(prev => [newScript, ...prev]);
    }
  };

  const handleDeleteScript = (scriptId) => {
    if (window.confirm('Are you sure you want to delete this script?')) {
      setScripts(prev => prev.filter(s => s.id !== scriptId));
    }
  };

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
            onSort={setSortBy}
            onViewChange={setViewMode}
            viewMode={viewMode}
            onFilterChange={setFilterType}
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
                      {searchQuery || filterType !== 'all' ? 'No scripts found' : 'No scripts yet'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery || filterType !== 'all' ?'Try adjusting your search or filters' :'Start your screenwriting journey by creating your first script'
                      }
                    </p>
                    <Button 
                      variant="default"
                      onClick={() => window.location.href = '/script-editor'}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create New Script
                    </Button>
                  </div>
                ) : (
                  <div className={
                    viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
                  }>
                    {filteredScripts.map((script) => (
                      <ScriptCard
                        key={script.id}
                        script={script}
                        viewMode={viewMode}
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
              <WritingStats />
              <QuickStartTemplates />
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;