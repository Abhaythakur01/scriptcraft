import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ScriptReportsTab = () => {
  const [selectedScript, setSelectedScript] = useState('current-project');
  const [dateRange, setDateRange] = useState('last-30-days');

  const scriptOptions = [
    { value: 'current-project', label: 'The Last Stand - Feature Film' },
    { value: 'pilot-script', label: 'City Lights - TV Pilot' },
    { value: 'short-film', label: 'Morning Coffee - Short Film' },
    { value: 'all-scripts', label: 'All Scripts Combined' }
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'all-time', label: 'All Time' }
  ];

  const sceneBreakdownData = [
    { name: 'Act I', scenes: 24, pages: 28, percentage: 23 },
    { name: 'Act II-A', scenes: 32, pages: 35, percentage: 29 },
    { name: 'Act II-B', scenes: 28, pages: 33, percentage: 27 },
    { name: 'Act III', scenes: 18, pages: 25, percentage: 21 }
  ];

  const dialogueActionRatio = [
    { name: 'Dialogue', value: 65, color: '#2563EB' },
    { name: 'Action', value: 28, color: '#059669' },
    { name: 'Parenthetical', value: 7, color: '#F59E0B' }
  ];

  const characterScreenTime = [
    { character: 'JACK MORRISON', scenes: 45, dialogueLines: 234, screenTime: '68%' },
    { character: 'SARAH CHEN', scenes: 32, dialogueLines: 156, screenTime: '42%' },
    { character: 'DETECTIVE RIVERA', scenes: 28, dialogueLines: 98, screenTime: '35%' },
    { character: 'MARCUS WEBB', scenes: 22, dialogueLines: 87, screenTime: '28%' },
    { character: 'ELENA VASQUEZ', scenes: 18, dialogueLines: 65, screenTime: '22%' }
  ];

  const pageDistribution = [
    { page: 1, scenes: 3, type: 'Setup' },
    { page: 15, scenes: 2, type: 'Inciting Incident' },
    { page: 30, scenes: 4, type: 'Plot Point 1' },
    { page: 45, scenes: 3, type: 'Midpoint' },
    { page: 75, scenes: 2, type: 'Plot Point 2' },
    { page: 90, scenes: 3, type: 'Climax' },
    { page: 105, scenes: 2, type: 'Resolution' }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted rounded-lg">
        <div className="flex-1">
          <Select
            label="Select Script"
            options={scriptOptions}
            value={selectedScript}
            onChange={setSelectedScript}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
        <div className="flex items-end">
          <Button variant="outline" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>

      {/* Script Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Total Pages</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">121</p>
          <p className="text-xs text-success">+3 from last draft</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Camera" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Total Scenes</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">102</p>
          <p className="text-xs text-success">+5 from last draft</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Characters</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">23</p>
          <p className="text-xs text-muted-foreground">8 speaking roles</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm font-body text-muted-foreground">Locations</span>
          </div>
          <p className="text-2xl font-heading font-semibold text-card-foreground">15</p>
          <p className="text-xs text-muted-foreground">12 unique settings</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scene Breakdown by Act */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-card-foreground">Scene Breakdown by Act</h3>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sceneBreakdownData}>
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

        {/* Dialogue vs Action Ratio */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-card-foreground">Dialogue vs Action Ratio</h3>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dialogueActionRatio}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {dialogueActionRatio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Character Screen Time Analysis */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Character Screen Time Analysis</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground">Character</th>
                <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground">Scenes</th>
                <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground">Dialogue Lines</th>
                <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground">Screen Time</th>
                <th className="text-left py-3 px-4 font-body font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {characterScreenTime.map((character, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50 transition-hover">
                  <td className="py-3 px-4 font-body font-medium text-card-foreground">{character.character}</td>
                  <td className="py-3 px-4 font-body text-card-foreground">{character.scenes}</td>
                  <td className="py-3 px-4 font-body text-card-foreground">{character.dialogueLines}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: character.screenTime }}
                        ></div>
                      </div>
                      <span className="font-body text-sm text-card-foreground">{character.screenTime}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page Distribution Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Story Structure & Page Distribution</h3>
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="page" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="scenes" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ScriptReportsTab;