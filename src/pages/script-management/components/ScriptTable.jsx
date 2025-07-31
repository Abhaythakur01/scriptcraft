import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScriptTable = ({ scripts, selectedScripts, onSelectScript, onSelectAll, onEditScript, onDuplicateScript, onArchiveScript, onDeleteScript, onViewHistory, onExportScript, sortConfig, onSort }) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'draft': { color: 'bg-warning text-warning-foreground', label: 'Draft' },
      'in-progress': { color: 'bg-primary text-primary-foreground', label: 'In Progress' },
      'completed': { color: 'bg-success text-success-foreground', label: 'Completed' },
      'archived': { color: 'bg-secondary text-secondary-foreground', label: 'Archived' }
    };
    
    const config = statusConfig[status] || statusConfig['draft'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedScripts.length === scripts.length && scripts.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              {[
                { key: 'title', label: 'Title' },
                { key: 'genre', label: 'Genre' },
                { key: 'status', label: 'Status' },
                { key: 'lastModified', label: 'Last Modified' },
                { key: 'pageCount', label: 'Pages' },
                { key: 'version', label: 'Version' }
              ].map((column) => (
                <th key={column.key} className="text-left p-4">
                  <button
                    onClick={() => onSort(column.key)}
                    className="flex items-center space-x-2 font-medium text-sm text-muted-foreground hover:text-foreground transition-hover"
                  >
                    <span>{column.label}</span>
                    <Icon name={getSortIcon(column.key)} size={14} />
                  </button>
                </th>
              ))}
              <th className="w-36 p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scripts.map((script) => (
              <tr
                key={script.id}
                className={`border-b border-border hover:bg-muted/50 transition-hover ${
                  selectedScripts.includes(script.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(script.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedScripts.includes(script.id)}
                    onChange={() => onSelectScript(script.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{script.title}</h3>
                      <p className="text-sm text-muted-foreground">{script.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{script.genre}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(script.status)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{formatDate(script.lastModified)}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-mono text-foreground">{script.pageCount}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-mono text-foreground">v{script.version}</span>
                </td>
                <td className="p-4">
                  <div className={`flex items-center justify-center space-x-1 transition-opacity ${
                    hoveredRow === script.id || selectedScripts.includes(script.id) ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button variant="ghost" size="icon" onClick={() => onEditScript(script)} className="h-8 w-8" title="Edit">
                      <Icon name="Edit3" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onExportScript(script)} className="h-8 w-8" title="Export as PDF">
                      <Icon name="Download" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onViewHistory(script)} className="h-8 w-8" title="View History">
                      <Icon name="History" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {scripts.map((script) => (
          <div
            key={script.id}
            className={`bg-background border border-border rounded-lg p-4 ${
              selectedScripts.includes(script.id) ? 'border-primary bg-primary/5' : ''
            }`}
          >
            {/* ... (Mobile card content remains the same) */}
          </div>
        ))}
      </div>

      {scripts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No scripts found</h3>
          <p className="text-muted-foreground mb-4">Create your first script to get started</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create New Script
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScriptTable;