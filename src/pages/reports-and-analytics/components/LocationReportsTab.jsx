import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const LocationReportsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('usage-frequency');
  const [filterBy, setFilterBy] = useState('all-locations');

  const sortOptions = [
    { value: 'usage-frequency', label: 'Usage Frequency' },
    { value: 'scene-count', label: 'Scene Count' },
    { value: 'location-name', label: 'Location Name' },
    { value: 'first-appearance', label: 'First Appearance' }
  ];

  const filterOptions = [
    { value: 'all-locations', label: 'All Locations' },
    { value: 'interior', label: 'Interior Locations' },
    { value: 'exterior', label: 'Exterior Locations' },
    { value: 'day-scenes', label: 'Day Scenes' },
    { value: 'night-scenes', label: 'Night Scenes' }
  ];

  const locationData = [
    {
      id: 1,
      name: 'JACK\'S APARTMENT',
      type: 'INT.',
      timeOfDay: 'Various',
      sceneCount: 18,
      pageCount: 22,
      firstAppearance: 'Page 1',
      lastAppearance: 'Page 115',
      usageFrequency: 85,
      characters: ['Jack Morrison', 'Sarah Chen', 'Elena Vasquez'],
      description: 'Modern downtown apartment with city view. Primary character residence and intimate dialogue scenes.',
      mood: 'Intimate, Personal',
      significance: 'High'
    },
    {
      id: 2,
      name: 'POLICE STATION',
      type: 'INT.',
      timeOfDay: 'Day/Night',
      sceneCount: 15,
      pageCount: 18,
      firstAppearance: 'Page 12',
      lastAppearance: 'Page 108',
      usageFrequency: 72,
      characters: ['Detective Rivera', 'Jack Morrison', 'Marcus Webb'],
      description: 'Busy metropolitan police station. Interrogation rooms, bullpen, and detective offices.',
      mood: 'Tense, Official',
      significance: 'High'
    },
    {
      id: 3,
      name: 'DOWNTOWN STREET',
      type: 'EXT.',
      timeOfDay: 'Day',
      sceneCount: 12,
      pageCount: 15,
      firstAppearance: 'Page 8',
      lastAppearance: 'Page 95',
      usageFrequency: 58,
      characters: ['Jack Morrison', 'Sarah Chen', 'Various'],
      description: 'Bustling city street with shops, cafes, and pedestrian traffic. Key chase sequences.',
      mood: 'Dynamic, Urban',
      significance: 'Medium'
    },
    {
      id: 4,
      name: 'SARAH\'S OFFICE',
      type: 'INT.',
      timeOfDay: 'Day',
      sceneCount: 10,
      pageCount: 12,
      firstAppearance: 'Page 15',
      lastAppearance: 'Page 88',
      usageFrequency: 45,
      characters: ['Sarah Chen', 'Jack Morrison', 'Elena Vasquez'],
      description: 'Modern corporate office with glass walls. Professional meetings and private conversations.',
      mood: 'Professional, Clean',
      significance: 'Medium'
    },
    {
      id: 5,
      name: 'WAREHOUSE DISTRICT',
      type: 'EXT.',
      timeOfDay: 'Night',
      sceneCount: 8,
      pageCount: 11,
      firstAppearance: 'Page 45',
      lastAppearance: 'Page 112',
      usageFrequency: 38,
      characters: ['Jack Morrison', 'Detective Rivera', 'Marcus Webb'],
      description: 'Industrial area with abandoned buildings. Climactic confrontation and action sequences.',
      mood: 'Dark, Suspenseful',
      significance: 'High'
    },
    {
      id: 6,
      name: 'COFFEE SHOP',
      type: 'INT.',
      timeOfDay: 'Day',
      sceneCount: 6,
      pageCount: 8,
      firstAppearance: 'Page 22',
      lastAppearance: 'Page 78',
      usageFrequency: 28,
      characters: ['Jack Morrison', 'Sarah Chen'],
      description: 'Cozy neighborhood coffee shop. Casual meetings and relationship development scenes.',
      mood: 'Warm, Casual',
      significance: 'Low'
    }
  ];

  const locationTypeDistribution = [
    { name: 'Interior', value: 65, color: '#2563EB' },
    { name: 'Exterior', value: 35, color: '#059669' }
  ];

  const timeOfDayDistribution = [
    { timeOfDay: 'Day', scenes: 45, percentage: 62 },
    { timeOfDay: 'Night', scenes: 28, percentage: 38 }
  ];

  const usageFrequencyData = locationData.map(location => ({
    name: location.name.split(' ')[0],
    frequency: location.usageFrequency,
    scenes: location.sceneCount
  }));

  const filteredLocations = locationData.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-muted rounded-lg">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search Locations"
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
          <Button variant="outline" iconName="Map">
            Map View
          </Button>
          <Button variant="outline" iconName="Download">
            Export
          </Button>
        </div>
      </div>

      {/* Location Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Total Locations</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">15</p>
          <p className="text-xs text-muted-foreground">12 unique settings</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Home" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Interior Scenes</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">47</p>
          <p className="text-xs text-success">65% of total scenes</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Trees" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Exterior Scenes</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">25</p>
          <p className="text-xs text-muted-foreground">35% of total scenes</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Most Used</span>
          </div>
          <p className="text-lg font-heading font-semibold text-card-foreground">Jack's Apt</p>
          <p className="text-xs text-muted-foreground">18 scenes</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Usage Frequency */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-card-foreground">Location Usage Frequency</h3>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="scenes" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interior vs Exterior Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-card-foreground">Interior vs Exterior</h3>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {locationTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Location Breakdown</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {filteredLocations.map((location) => (
            <div key={location.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-hover">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Location Info */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={location.type === 'INT.' ? 'Home' : 'Trees'} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-semibold text-card-foreground">{location.name}</h4>
                      <p className="text-sm text-muted-foreground">{location.type} - {location.timeOfDay}</p>
                      <p className="text-sm text-card-foreground mt-1">{location.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Scene Count:</span>
                      <p className="font-medium text-card-foreground">{location.sceneCount}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Page Count:</span>
                      <p className="font-medium text-card-foreground">{location.pageCount}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">First Appearance:</span>
                      <p className="font-medium text-card-foreground">{location.firstAppearance}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Significance:</span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        location.significance === 'High' ? 'bg-success/10 text-success' :
                        location.significance === 'Medium'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                      }`}>
                        {location.significance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="space-y-3">
                  <h5 className="font-body font-medium text-card-foreground">Usage Statistics</h5>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Usage Frequency</span>
                        <span className="text-card-foreground">{location.usageFrequency}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${location.usageFrequency}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <span className="text-sm text-muted-foreground">Mood: </span>
                      <span className="text-sm font-medium text-card-foreground">{location.mood}</span>
                    </div>
                  </div>
                </div>

                {/* Characters */}
                <div className="space-y-3">
                  <h5 className="font-body font-medium text-card-foreground">Characters Present</h5>
                  <div className="space-y-2">
                    {location.characters.map((character, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <Icon name="User" size={14} className="text-muted-foreground" />
                        <span className="text-sm font-body text-card-foreground">{character}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" iconName="Eye" fullWidth>
                      View Scene Details
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

export default LocationReportsTab;