import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, searchResults, isSearching }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState(-1);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setSelectedResult(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        onSearch(searchQuery);
        setShowResults(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setShowResults(false);
      onSearch('');
    }
  }, [searchQuery, onSearch]);

  const handleKeyDown = (e) => {
    if (!showResults || !searchResults.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedResult(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedResult(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedResult >= 0) {
          handleResultClick(searchResults[selectedResult]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedResult(-1);
        break;
    }
  };

  const handleResultClick = (result) => {
    console.log('Opening script:', result);
    setShowResults(false);
    setSelectedResult(-1);
    setSearchQuery('');
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-warning/30 text-foreground">{part}</mark>
      ) : part
    );
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center space-x-2">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? (
              <Icon name="Loader2" size={20} className="text-muted-foreground animate-spin" />
            ) : (
              <Icon name="Search" size={20} className="text-muted-foreground" />
            )}
          </div>
          <input
            type="text"
            placeholder="Search scripts, content, characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.trim() && setShowResults(true)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowResults(false);
                onSearch('');
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Icon name="X" size={16} className="text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          size="default"
          onClick={onFilterToggle}
          iconName="Filter"
          iconPosition="left"
          className="hidden sm:flex"
        >
          Filters
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={onFilterToggle}
          className="sm:hidden"
        >
          <Icon name="Filter" size={20} />
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-96 overflow-y-auto"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border mb-2">
              {searchResults.length} result{searchResults.length > 1 ? 's' : ''} found
            </div>
            {searchResults.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className={`w-full text-left p-3 rounded-lg hover:bg-muted transition-hover ${
                  selectedResult === index ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {highlightText(result.title, searchQuery)}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.type} • {result.genre}
                    </p>
                    {result.snippet && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {highlightText(result.snippet, searchQuery)}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {result.matchType === 'title' ? 'Title match' : 
                         result.matchType === 'content' ? 'Content match' :
                         result.matchType === 'character' ? 'Character match' : 'Match'}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        Page {result.pageNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {showResults && searchQuery.trim() && searchResults.length === 0 && !isSearching && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-elevated z-50">
          <div className="p-6 text-center">
            <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-1">No results found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or check the filters
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;