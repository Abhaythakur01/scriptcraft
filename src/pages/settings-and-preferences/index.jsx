import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ScriptContextToolbar from '../../components/ui/ScriptContextToolbar';
import SettingsSidebar from './components/SettingsSidebar';
import EditorPreferences from './components/EditorPreferences';
import FormattingOptions from './components/FormattingOptions';
import AccountSettings from './components/AccountSettings';
import ExportSettings from './components/ExportSettings';
import BackupConfiguration from './components/BackupConfiguration';

const SettingsAndPreferences = () => {
  const [activeSection, setActiveSection] = useState('editor');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'editor':
        return <EditorPreferences />;
      case 'formatting':
        return <FormattingOptions />;
      case 'account':
        return <AccountSettings />;
      case 'export':
        return <ExportSettings />;
      case 'backup':
        return <BackupConfiguration />;
      default:
        return <EditorPreferences />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'editor':
        return 'Editor Preferences';
      case 'formatting':
        return 'Formatting Options';
      case 'account':
        return 'Account Settings';
      case 'export':
        return 'Export Settings';
      case 'backup':
        return 'Backup Configuration';
      default:
        return 'Editor Preferences';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'editor':
        return 'Customize your writing environment for optimal productivity';
      case 'formatting':
        return 'Configure script formatting and style preferences';
      case 'account':
        return 'Manage your profile, security, and subscription settings';
      case 'export':
        return 'Set up default export formats and configurations';
      case 'backup':
        return 'Configure auto-save, backup, and sync preferences';
      default:
        return 'Customize your writing environment for optimal productivity';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScriptContextToolbar />
      
      <div className="pt-16 flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SettingsSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>
        
        {/* Mobile/Tablet Section Selector */}
        <div className="lg:hidden w-full bg-card border-b border-border p-4">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="editor">Editor Preferences</option>
            <option value="formatting">Formatting Options</option>
            <option value="account">Account Settings</option>
            <option value="export">Export Settings</option>
            <option value="backup">Backup Configuration</option>
          </select>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            {/* Section Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {getSectionTitle()}
              </h1>
              <p className="text-lg text-muted-foreground">
                {getSectionDescription()}
              </p>
            </div>
            
            {/* Section Content */}
            <div className="pb-8">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAndPreferences;