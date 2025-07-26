import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartTemplates = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 'feature',
      name: 'Feature Film',
      description: 'Full-length screenplay template with industry-standard formatting',
      icon: 'Film',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      estimatedPages: '90-120 pages'
    },
    {
      id: 'tv-pilot',
      name: 'TV Pilot',
      description: 'Television pilot episode template for series development',
      icon: 'Tv',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      estimatedPages: '22-60 pages'
    },
    {
      id: 'short',
      name: 'Short Film',
      description: 'Concise format for short film projects and festival submissions',
      icon: 'Clock',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      estimatedPages: '1-30 pages'
    },
    {
      id: 'stage-play',
      name: 'Stage Play',
      description: 'Theater script template with proper stage directions',
      icon: 'Theater',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      estimatedPages: '60-90 pages'
    }
  ];

  const handleCreateScript = (templateId) => {
    navigate('/script-editor', { state: { template: templateId } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">Quick Start</h2>
        <Button variant="ghost" size="sm" iconName="Zap" />
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            className="group border border-border rounded-lg p-4 hover:shadow-soft transition-hover cursor-pointer"
            onClick={() => handleCreateScript(template.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 ${template.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={template.icon} size={20} className={template.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-body font-semibold text-foreground">
                    {template.name}
                  </h3>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-foreground transition-colors" 
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {template.estimatedPages}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateScript(template.id);
                    }}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          size="sm" 
          fullWidth 
          onClick={() => navigate('/script-editor')}
          iconName="FileText"
          iconPosition="left"
        >
          Start Blank Script
        </Button>
      </div>
    </div>
  );
};

export default QuickStartTemplates;