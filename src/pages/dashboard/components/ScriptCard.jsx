import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ScriptCard = ({ script, onDuplicate, onDelete, viewMode = 'grid' }) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate('/script-editor', { state: { scriptId: script.id } });
  };

  const handleDuplicate = (e) => {
    e.stopPropagation();
    onDuplicate(script.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(script.id);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'feature': return 'Film';
      case 'tv-pilot': return 'Tv';
      case 'short': return 'Clock';
      default: return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'feature': return 'text-blue-600';
      case 'tv-pilot': return 'text-purple-600';
      case 'short': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="flex items-center p-4 bg-card border border-border rounded-lg hover:shadow-soft transition-hover cursor-pointer"
        onClick={handleOpen}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex-shrink-0 w-12 h-16 bg-muted rounded border overflow-hidden mr-4">
          <Image 
            src={script.thumbnail} 
            alt={`${script.title} thumbnail`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name={getTypeIcon(script.type)} size={16} className={getTypeColor(script.type)} />
            <h3 className="font-heading font-semibold text-foreground truncate">{script.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{script.description}</p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>Modified {formatDate(script.lastModified)}</span>
            <span>{script.pageCount} pages</span>
            <span>{script.wordCount.toLocaleString()} words</span>
          </div>
        </div>

        <div className={`flex items-center space-x-2 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <Button variant="ghost" size="sm" onClick={handleDuplicate} iconName="Copy" />
          <Button variant="ghost" size="sm" onClick={handleDelete} iconName="Trash2" />
          <Button variant="outline" size="sm" onClick={handleOpen}>
            Open
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-soft transition-hover cursor-pointer"
      onClick={handleOpen}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <Image 
          src={script.thumbnail} 
          alt={`${script.title} thumbnail`}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-2 right-2 flex space-x-1 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <Button variant="ghost" size="sm" onClick={handleDuplicate} iconName="Copy" className="bg-background/80 backdrop-blur-sm" />
          <Button variant="ghost" size="sm" onClick={handleDelete} iconName="Trash2" className="bg-background/80 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
          <Icon name={getTypeIcon(script.type)} size={12} className={getTypeColor(script.type)} />
          <span className="text-xs font-medium text-foreground capitalize">{script.type.replace('-', ' ')}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-heading font-semibold text-foreground mb-1 truncate">{script.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{script.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>Modified {formatDate(script.lastModified)}</span>
          <span>{script.pageCount} pages</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{script.wordCount.toLocaleString()} words</span>
          <div className={`transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
            <Button variant="outline" size="sm" onClick={handleOpen}>
              Open
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptCard;