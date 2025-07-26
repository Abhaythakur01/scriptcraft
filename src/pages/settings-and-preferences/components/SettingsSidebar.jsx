import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsSidebar = ({ activeSection, onSectionChange }) => {
  const settingSections = [
    {
      id: 'editor',
      label: 'Editor Preferences',
      icon: 'Edit3',
      description: 'Customize your writing environment'
    },
    {
      id: 'formatting',
      label: 'Formatting Options',
      icon: 'Type',
      description: 'Script formatting and style settings'
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: 'User',
      description: 'Profile and security preferences'
    },
    {
      id: 'export',
      label: 'Export Settings',
      icon: 'Download',
      description: 'PDF and export configurations'
    },
    {
      id: 'backup',
      label: 'Backup Configuration',
      icon: 'Shield',
      description: 'Auto-save and backup options'
    }
  ];

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Customize your ScriptCraft experience</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {settingSections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={`
                  w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-hover
                  ${activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={section.icon} 
                  size={20} 
                  className={`mt-0.5 ${activeSection === section.id ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-body font-medium text-sm ${activeSection === section.id ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {section.label}
                  </p>
                  <p className={`font-body text-xs mt-0.5 ${activeSection === section.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {section.description}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SettingsSidebar;