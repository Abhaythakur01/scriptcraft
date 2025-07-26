import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange, onSavePreset, savedPresets, onLoadPreset }) => {
  const [presetName, setPresetName] = useState('');
  const [showPresetInput, setShowPresetInput] = useState(false);

  const genres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Documentary', 'Animation', 'Fantasy'
  ];

  const statuses = [
    { value: 'draft', label: 'Draft' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleGenreChange = (genre, checked) => {
    const newGenres = checked
      ? [...filters.genres, genre]
      : filters.genres.filter(g => g !== genre);
    onFiltersChange({ ...filters, genres: newGenres });
  };

  const handleStatusChange = (status, checked) => {
    const newStatuses = checked
      ? [...filters.statuses, status]
      : filters.statuses.filter(s => s !== status);
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: { ...filters.dateRange, [field]: value }
    });
  };

  const handleTagsChange = (value) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    onFiltersChange({ ...filters, tags });
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim(), filters);
      setPresetName('');
      setShowPresetInput(false);
    }
  };

  const clearAllFilters = () => {
    onFiltersChange({
      genres: [],
      statuses: [],
      dateRange: { from: '', to: '' },
      tags: []
    });
  };

  const hasActiveFilters = filters.genres.length > 0 || filters.statuses.length > 0 || 
                          filters.dateRange.from || filters.dateRange.to || filters.tags.length > 0;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-background border-r border-border
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Saved Presets */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Saved Presets</h3>
              <div className="space-y-2">
                {savedPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onLoadPreset(preset)}
                    className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-hover text-left"
                  >
                    <span className="text-sm font-medium text-foreground">{preset.name}</span>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </button>
                ))}
                
                {!showPresetInput ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPresetInput(true)}
                    iconName="Plus"
                    iconPosition="left"
                    className="w-full justify-start"
                  >
                    Save Current Filters
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Preset name"
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSavePreset}
                        disabled={!presetName.trim()}
                      >
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowPresetInput(false);
                          setPresetName('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Genre Filter */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Genre</h3>
              <div className="space-y-2">
                {genres.map((genre) => (
                  <Checkbox
                    key={genre}
                    label={genre}
                    checked={filters.genres.includes(genre)}
                    onChange={(e) => handleGenreChange(genre, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Status</h3>
              <div className="space-y-2">
                {statuses.map((status) => (
                  <Checkbox
                    key={status.value}
                    label={status.label}
                    checked={filters.statuses.includes(status.value)}
                    onChange={(e) => handleStatusChange(status.value, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Date Range</h3>
              <div className="space-y-3">
                <Input
                  type="date"
                  label="From"
                  value={filters.dateRange.from}
                  onChange={(e) => handleDateRangeChange('from', e.target.value)}
                />
                <Input
                  type="date"
                  label="To"
                  value={filters.dateRange.to}
                  onChange={(e) => handleDateRangeChange('to', e.target.value)}
                />
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Tags</h3>
              <Input
                type="text"
                placeholder="Enter tags separated by commas"
                value={filters.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                description="e.g. action, thriller, short-film"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;