import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScriptNavigator = ({ content = '' }) => {
  const [activeTab, setActiveTab] = useState('stats');

  // Memoized calculation for all statistics
  const { 
    wordCount, 
    characterCount, 
    pageCount, 
    sceneCount, 
    estimatedRuntime 
  } = useMemo(() => {
    // Create a temporary element to strip HTML tags for accurate counting
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || '';

    // Word and Character Count
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length === 1 && words[0] === '' ? 0 : words.length;
    const characterCount = text.length;

    // Scene Count (counts lines starting with INT. or EXT.)
    const sceneMatches = text.match(/^(INT\.|EXT\.)/gm) || [];
    const sceneCount = sceneMatches.length;

    // Page Count & Estimated Runtime (based on standard screenplay line counts)
    const lines = text.split('\n').length;
    const calculatedPageCount = Math.max(1, Math.ceil(lines / 55)); // Approx. 55 lines per page
    const runtime = `${calculatedPageCount} min`;

    return {
      wordCount,
      characterCount,
      pageCount: calculatedPageCount,
      sceneCount,
      estimatedRuntime: runtime,
    };
  }, [content]);

  const scenes = [
    { id: 1, title: "INT. COFFEE SHOP - DAY", page: 1, duration: "2 min" },
    { id: 2, title: "EXT. CITY STREET - DAY", page: 3, duration: "1 min" },
    { id: 3, title: "INT. POLICE STATION - DAY", page: 4, duration: "3 min" },
    { id: 4, title: "INT. SARAH'S APARTMENT - NIGHT", page: 7, duration: "2 min" },
    { id: 5, title: "EXT. PARK - SUNSET", page: 9, duration: "1 min" }
  ];

  const characters = [
    { name: "SARAH", scenes: 4, lines: 23, description: "Determined journalist, 28" },
    { name: "DETECTIVE MARTINEZ", scenes: 2, lines: 12, description: "Experienced detective, 45" },
    { name: "JOHN", scenes: 3, lines: 18, description: "Sarah's colleague, 30" },
    { name: "DR. WILLIAMS", scenes: 1, lines: 8, description: "Medical examiner, 55" },
    { name: "ALEX", scenes: 2, lines: 6, description: "Coffee shop barista, 22" }
  ];

  const statistics = [
    { label: "Total Pages", value: pageCount, icon: "FileText" },
    { label: "Scene Count", value: sceneCount, icon: "Camera" },
    { label: "Dialogue Lines", value: "67", icon: "MessageSquare" }, // Placeholder
    { label: "Estimated Runtime", value: estimatedRuntime, icon: "Clock" },
    { label: "Word Count", value: wordCount.toLocaleString(), icon: "Type" },
    { label: "Character Count", value: characterCount.toLocaleString(), icon: "Users" },
  ];

  const tabs = [
    { id: 'scenes', label: 'Scenes', icon: 'MapPin' },
    { id: 'characters', label: 'Characters', icon: 'Users' },
    { id: 'stats', label: 'Statistics', icon: 'BarChart3' }
  ];

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-body font-medium transition-hover
              ${activeTab === tab.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden lg:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'scenes' && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Scene Navigator</h3>
              <Button variant="ghost" size="sm" iconName="Plus">
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              {scenes.map((scene) => (
                <div
                  key={scene.id}
                  className="p-3 rounded-lg border border-border hover:bg-muted transition-hover cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-sm font-medium text-foreground leading-tight">
                      {scene.title}
                    </span>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" iconName="Edit3" />
                      <Button variant="ghost" size="sm" iconName="Trash2" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Page {scene.page}</span>
                    <span>{scene.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">Characters</h3>
              <Button variant="ghost" size="sm" iconName="Plus">
                Add
              </Button>
            </div>
            
            <div className="space-y-3">
              {characters.map((character, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-border hover:bg-muted transition-hover cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-semibold text-foreground">
                      {character.name}
                    </span>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {character.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{character.scenes} scenes</span>
                    <span>{character.lines} lines</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="p-4">
            <h3 className="font-heading font-semibold text-foreground mb-4">Script Statistics</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted border border-border"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name={stat.icon} size={16} className="text-primary" />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="font-heading font-bold text-lg text-foreground">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Download"
                iconPosition="left"
              >
                Export Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="FileText"
                iconPosition="left"
              >
                Character Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="MapPin"
                iconPosition="left"
              >
                Location Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptNavigator;