import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilters = ({ onSearch, onSort, onViewChange, viewMode, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterType, setFilterType] = useState('all');

  const sortOptions = [
    { value: 'recent', label: 'Recently Modified' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'created', label: 'Date Created' },
    { value: 'pages', label: 'Page Count' },
    { value: 'type', label: 'Script Type' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'feature', label: 'Feature Films' },
    { value: 'tv-pilot', label: 'TV Pilots' },
    { value: 'short', label: 'Short Films' },
    { value: 'stage-play', label: 'Stage Plays' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSort(value);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
    onFilterChange(value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search scripts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex items-center space-x-3">
          {/* Type Filter */}
          <Select
            options={typeOptions}
            value={filterType}
            onChange={handleFilterChange}
            placeholder="Filter by type"
            className="w-40"
          />

          {/* Sort */}
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Sort by"
            className="w-44"
          />

          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewChange('grid')}
              className={`
                p-2 rounded-md transition-colors
                ${viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }
              `}
              title="Grid view"
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`
                p-2 rounded-md transition-colors
                ${viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }
              `}
              title="List view"
            >
              <Icon name="List" size={16} />
            </button>
          </div>

          {/* New Script Button */}
          <Button 
            variant="default"
            onClick={() => window.location.href = '/script-editor'}
            iconName="Plus"
            iconPosition="left"
          >
            New Script
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || filterType !== 'all') && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm">
              <span>Search: "{searchQuery}"</span>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  onSearch('');
                }}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {filterType !== 'all' && (
            <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded text-sm">
              <span>Type: {typeOptions.find(opt => opt.value === filterType)?.label}</span>
              <button 
                onClick={() => {
                  setFilterType('all');
                  onFilterChange('all');
                }}
                className="hover:bg-accent/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;