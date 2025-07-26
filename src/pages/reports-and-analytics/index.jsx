import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ScriptContextToolbar from '../../components/ui/ScriptContextToolbar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportsToolbar from './components/ReportsToolbar';
import ScriptReportsTab from './components/ScriptReportsTab';
import CharacterReportsTab from './components/CharacterReportsTab';
import LocationReportsTab from './components/LocationReportsTab';
import WritingAnalyticsTab from './components/WritingAnalyticsTab';

const ReportsAndAnalytics = () => {
  const [activeTab, setActiveTab] = useState('script-reports');

  const tabs = [
    {
      id: 'script-reports',
      label: 'Script Reports',
      icon: 'FileText',
      description: 'Scene breakdown, page distribution, and story structure analysis'
    },
    {
      id: 'character-reports',
      label: 'Character Reports',
      icon: 'Users',
      description: 'Character analysis, dialogue distribution, and relationship mapping'
    },
    {
      id: 'location-reports',
      label: 'Location Reports',
      icon: 'MapPin',
      description: 'Location usage, scene distribution, and setting analysis'
    },
    {
      id: 'writing-analytics',
      label: 'Writing Analytics',
      icon: 'TrendingUp',
      description: 'Productivity metrics, writing patterns, and goal tracking'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'script-reports':
        return <ScriptReportsTab />;
      case 'character-reports':
        return <CharacterReportsTab />;
      case 'location-reports':
        return <LocationReportsTab />;
      case 'writing-analytics':
        return <WritingAnalyticsTab />;
      default:
        return <ScriptReportsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScriptContextToolbar />
      
      {/* Main Content */}
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Reports Toolbar */}
          <ReportsToolbar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mt-6 overflow-hidden">
            <div className="border-b border-border">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-3 px-6 py-4 text-sm font-body font-medium whitespace-nowrap
                      border-b-2 transition-hover min-w-0 flex-shrink-0
                      ${activeTab === tab.id
                        ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={16} />
                    <div className="text-left">
                      <div>{tab.label}</div>
                      <div className="text-xs text-muted-foreground hidden lg:block">
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-semibold text-card-foreground mb-1">
                  Need More Detailed Analysis?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Generate comprehensive production reports or schedule a detailed script consultation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" iconName="FileText" iconPosition="left">
                  Generate Production Report
                </Button>
                <Button variant="outline" iconName="Calendar" iconPosition="left">
                  Schedule Consultation
                </Button>
                <Button variant="default" iconName="MessageSquare" iconPosition="left">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsAndAnalytics;