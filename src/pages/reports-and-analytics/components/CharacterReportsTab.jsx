import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const CharacterReportsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dialogue-count');
  const [filterBy, setFilterBy] = useState('all-characters');

  const sortOptions = [
    { value: 'dialogue-count', label: 'Dialogue Count' },
    { value: 'scene-appearances', label: 'Scene Appearances' },
    { value: 'character-name', label: 'Character Name' },
    { value: 'screen-time', label: 'Screen Time' }
  ];

  const filterOptions = [
    { value: 'all-characters', label: 'All Characters' },
    { value: 'main-characters', label: 'Main Characters' },
    { value: 'supporting-characters', label: 'Supporting Characters' },
    { value: 'minor-characters', label: 'Minor Characters' }
  ];

  const characterData = [
    {
      id: 1,
      name: 'JACK MORRISON',
      role: 'Protagonist',
      dialogueLines: 234,
      sceneAppearances: 45,
      firstAppearance: 'Page 1',
      lastAppearance: 'Page 121',
      screenTime: 68,
      emotionalRange: 85,
      conflictLevel: 92,
      relationships: ['Sarah Chen', 'Detective Rivera', 'Marcus Webb'],
      characterArc: {
        development: 88,
        consistency: 92,
        growth: 85,
        motivation: 90,
        dialogue: 87
      }
    },
    {
      id: 2,
      name: 'SARAH CHEN',
      role: 'Love Interest',
      dialogueLines: 156,
      sceneAppearances: 32,
      firstAppearance: 'Page 8',
      lastAppearance: 'Page 118',
      screenTime: 42,
      emotionalRange: 78,
      conflictLevel: 65,
      relationships: ['Jack Morrison', 'Elena Vasquez'],
      characterArc: {
        development: 82,
        consistency: 88,
        growth: 79,
        motivation: 85,
        dialogue: 91
      }
    },
    {
      id: 3,
      name: 'DETECTIVE RIVERA',
      role: 'Antagonist',
      dialogueLines: 98,
      sceneAppearances: 28,
      firstAppearance: 'Page 12',
      lastAppearance: 'Page 115',
      screenTime: 35,
      emotionalRange: 72,
      conflictLevel: 88,
      relationships: ['Jack Morrison', 'Marcus Webb'],
      characterArc: {
        development: 75,
        consistency: 85,
        growth: 70,
        motivation: 88,
        dialogue: 83
      }
    },
    {
      id: 4,
      name: 'MARCUS WEBB',
      role: 'Supporting',
      dialogueLines: 87,
      sceneAppearances: 22,
      firstAppearance: 'Page 15',
      lastAppearance: 'Page 108',
      screenTime: 28,
      emotionalRange: 65,
      conflictLevel: 58,
      relationships: ['Jack Morrison', 'Detective Rivera'],
      characterArc: {
        development: 68,
        consistency: 80,
        growth: 65,
        motivation: 72,
        dialogue: 78
      }
    },
    {
      id: 5,
      name: 'ELENA VASQUEZ',
      role: 'Supporting',
      dialogueLines: 65,
      sceneAppearances: 18,
      firstAppearance: 'Page 22',
      lastAppearance: 'Page 95',
      screenTime: 22,
      emotionalRange: 58,
      conflictLevel: 45,
      relationships: ['Sarah Chen'],
      characterArc: {
        development: 62,
        consistency: 75,
        growth: 58,
        motivation: 68,
        dialogue: 72
      }
    }
  ];

  const dialogueDistribution = [
    { character: 'JACK', count: 234 },
    { character: 'SARAH', count: 156 },
    { character: 'RIVERA', count: 98 },
    { character: 'MARCUS', count: 87 },
    { character: 'ELENA', count: 65 },
    { character: 'OTHERS', count: 142 }
  ];

  const filteredCharacters = characterData.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-muted rounded-lg">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search Characters"
          />
        </div>
        <div className="flex-1">
          <Select
            label="Sort By"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Filter By"
            options={filterOptions}
            value={filterBy}
            onChange={setFilterBy}
          />
        </div>
        <div className="flex items-end space-x-2">
          <Button variant="outline" iconName="Filter">
            Advanced
          </Button>
          <Button variant="outline" iconName="Download">
            Export
          </Button>
        </div>
      </div>

      {/* Character Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Total Characters</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">23</p>
          <p className="text-xs text-muted-foreground">8 speaking roles</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Total Dialogue</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">782</p>
          <p className="text-xs text-success">+45 lines this draft</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Star" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Main Characters</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">5</p>
          <p className="text-xs text-muted-foreground">Well-developed arcs</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Network" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Relationships</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">12</p>
          <p className="text-xs text-muted-foreground">Character connections</p>
        </div>
      </div>

      {/* Dialogue Distribution Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Dialogue Distribution</h3>
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dialogueDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" stroke="#64748B" fontSize={12} />
              <YAxis dataKey="character" type="category" stroke="#64748B" fontSize={12} width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Character Details Table */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Character Analysis</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" iconName="Eye">
              View All
            </Button>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {filteredCharacters.map((character) => (
            <div key={character.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-hover">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Character Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-card-foreground">{character.name}</h4>
                      <p className="text-sm text-muted-foreground">{character.role}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dialogue Lines:</span>
                      <p className="font-medium text-card-foreground">{character.dialogueLines}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Scene Appearances:</span>
                      <p className="font-medium text-card-foreground">{character.sceneAppearances}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">First Appearance:</span>
                      <p className="font-medium text-card-foreground">{character.firstAppearance}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Screen Time:</span>
                      <p className="font-medium text-card-foreground">{character.screenTime}%</p>
                    </div>
                  </div>
                </div>

                {/* Character Arc Radar */}
                <div className="flex justify-center">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={[character.characterArc]}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tick={{ fontSize: 8, fill: '#64748B' }}
                        />
                        <Radar
                          name="Character Arc"
                          dataKey="development"
                          stroke="#2563EB"
                          fill="#2563EB"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Relationships */}
                <div className="space-y-3">
                  <h5 className="font-body font-medium text-card-foreground">Relationships</h5>
                  <div className="space-y-2">
                    {character.relationships.map((relationship, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <Icon name="Users" size={14} className="text-muted-foreground" />
                        <span className="text-sm font-body text-card-foreground">{relationship}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" iconName="Eye" fullWidth>
                      View Character Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterReportsTab;