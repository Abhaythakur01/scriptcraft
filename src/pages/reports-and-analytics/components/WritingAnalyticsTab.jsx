import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const WritingAnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [metricType, setMetricType] = useState('word-count');

  const timeRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'last-year', label: 'Last Year' }
  ];

  const metricOptions = [
    { value: 'word-count', label: 'Word Count' },
    { value: 'page-count', label: 'Page Count' },
    { value: 'session-duration', label: 'Session Duration' },
    { value: 'productivity-score', label: 'Productivity Score' }
  ];

  const dailyWritingData = [
    { date: '2025-07-01', words: 1250, pages: 1.5, duration: 120, sessions: 2 },
    { date: '2025-07-02', words: 890, pages: 1.1, duration: 95, sessions: 1 },
    { date: '2025-07-03', words: 1450, pages: 1.8, duration: 140, sessions: 3 },
    { date: '2025-07-04', words: 0, pages: 0, duration: 0, sessions: 0 },
    { date: '2025-07-05', words: 2100, pages: 2.6, duration: 180, sessions: 2 },
    { date: '2025-07-06', words: 1680, pages: 2.1, duration: 155, sessions: 2 },
    { date: '2025-07-07', words: 1320, pages: 1.6, duration: 110, sessions: 1 },
    { date: '2025-07-08', words: 1850, pages: 2.3, duration: 165, sessions: 3 },
    { date: '2025-07-09', words: 1200, pages: 1.5, duration: 100, sessions: 2 },
    { date: '2025-07-10', words: 950, pages: 1.2, duration: 85, sessions: 1 },
    { date: '2025-07-11', words: 1750, pages: 2.2, duration: 145, sessions: 2 },
    { date: '2025-07-12', words: 2250, pages: 2.8, duration: 190, sessions: 3 },
    { date: '2025-07-13', words: 1400, pages: 1.7, duration: 125, sessions: 2 },
    { date: '2025-07-14', words: 1600, pages: 2.0, duration: 135, sessions: 2 }
  ];

  const weeklyGoals = [
    { week: 'Week 1', target: 8000, achieved: 7590, percentage: 95 },
    { week: 'Week 2', target: 8000, achieved: 8450, percentage: 106 },
    { week: 'Week 3', target: 8000, achieved: 7200, percentage: 90 },
    { week: 'Week 4', target: 8000, achieved: 8950, percentage: 112 }
  ];

  const productivityMetrics = [
    { metric: 'Average Words/Day', value: '1,425', change: '+12%', changeType: 'positive' },
    { metric: 'Writing Streak', value: '12 days', change: '+3 days', changeType: 'positive' },
    { metric: 'Avg Session Duration', value: '135 min', change: '+8 min', changeType: 'positive' },
    { metric: 'Weekly Goal Achievement', value: '96%', change: '+4%', changeType: 'positive' }
  ];

  const writingHabits = [
    { time: '6:00 AM', sessions: 15, productivity: 85 },
    { time: '9:00 AM', sessions: 25, productivity: 92 },
    { time: '12:00 PM', sessions: 8, productivity: 65 },
    { time: '3:00 PM', sessions: 12, productivity: 78 },
    { time: '6:00 PM', sessions: 20, productivity: 88 },
    { time: '9:00 PM', sessions: 18, productivity: 82 }
  ];

  const monthlyProgress = [
    { month: 'Jan', words: 28500, pages: 35.6, goal: 30000 },
    { month: 'Feb', words: 32100, pages: 40.1, goal: 30000 },
    { month: 'Mar', words: 29800, pages: 37.3, goal: 30000 },
    { month: 'Apr', words: 31500, pages: 39.4, goal: 30000 },
    { month: 'May', words: 33200, pages: 41.5, goal: 30000 },
    { month: 'Jun', words: 30900, pages: 38.6, goal: 30000 },
    { month: 'Jul', words: 28750, pages: 35.9, goal: 30000 }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted rounded-lg">
        <div className="flex-1">
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Primary Metric"
            options={metricOptions}
            value={metricType}
            onChange={setMetricType}
          />
        </div>
        <div className="flex items-end space-x-2">
          <Button variant="outline" iconName="Target">
            Set Goals
          </Button>
          <Button variant="outline" iconName="Download">
            Export
          </Button>
        </div>
      </div>

      {/* Productivity Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {productivityMetrics.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="space-y-2">
              <p className="text-sm font-body text-muted-foreground">{metric.metric}</p>
              <p className="text-2xl font-heading font-semibold text-card-foreground">{metric.value}</p>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={metric.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className={metric.changeType === 'positive' ? 'text-success' : 'text-error'} 
                />
                <span className={`text-sm font-body ${metric.changeType === 'positive' ? 'text-success' : 'text-error'}`}>
                  {metric.change}
                </span>
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Writing Progress */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Daily Writing Progress</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" iconName="Calendar">
              View Calendar
            </Button>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyWritingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B" 
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              />
              <Area 
                type="monotone" 
                dataKey="words" 
                stroke="#2563EB" 
                fill="#2563EB" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goal Achievement */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-card-foreground">Weekly Goal Achievement</h3>
            <Button variant="ghost" size="sm" iconName="Target">
              Edit Goals
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyGoals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="week" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="target" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="achieved" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Writing Time Patterns */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-card-foreground">Optimal Writing Times</h3>
            <Button variant="ghost" size="sm" iconName="Clock">
              Schedule
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={writingHabits}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
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
                  dataKey="productivity" 
                  stroke="#059669" 
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Progress Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Monthly Progress Overview</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" iconName="TrendingUp">
              Trends
            </Button>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="goal" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="words" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Writing Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-card-foreground">Writing Insights & Recommendations</h3>
          <Button variant="ghost" size="sm" iconName="Lightbulb">
            More Tips
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="TrendingUp" size={20} className="text-success mt-1" />
              <div>
                <h4 className="font-body font-medium text-success mb-1">Peak Performance</h4>
                <p className="text-sm text-card-foreground">Your most productive writing time is 9:00 AM with 92% efficiency. Consider scheduling important scenes during this window.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Target" size={20} className="text-warning mt-1" />
              <div>
                <h4 className="font-body font-medium text-warning mb-1">Goal Adjustment</h4>
                <p className="text-sm text-card-foreground">You're consistently exceeding weekly goals by 6%. Consider increasing your target to maintain challenge and growth.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={20} className="text-primary mt-1" />
              <div>
                <h4 className="font-body font-medium text-primary mb-1">Consistency Streak</h4>
                <p className="text-sm text-card-foreground">You're on a 12-day writing streak! Maintain momentum by setting smaller daily goals on busy days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingAnalyticsTab;