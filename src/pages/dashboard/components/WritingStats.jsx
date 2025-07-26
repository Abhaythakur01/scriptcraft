import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const WritingStats = () => {
  const stats = [
    {
      label: "Today\'s Words",
      value: 847,
      target: 1000,
      icon: 'PenTool',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: "Weekly Goal",
      value: 4250,
      target: 5000,
      icon: 'Target',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: "Scripts This Month",
      value: 3,
      target: 5,
      icon: 'FileText',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: "Writing Streak",
      value: 12,
      unit: 'days',
      icon: 'Flame',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const getProgressPercentage = (value, target) => {
    if (!target) return 100;
    return Math.min((value / target) * 100, 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">Writing Statistics</h2>
        <Button variant="ghost" size="sm" iconName="BarChart3" />
      </div>

      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={stat.icon} size={20} className={stat.color} />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">{stat.label}</p>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-lg font-semibold text-foreground">
                      {stat.value.toLocaleString()}
                    </span>
                    {stat.unit && (
                      <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    )}
                    {stat.target && (
                      <span className="text-sm text-muted-foreground">
                        / {stat.target.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {stat.target && (
                <div className="text-right">
                  <span className="text-sm font-medium text-foreground">
                    {Math.round(getProgressPercentage(stat.value, stat.target))}%
                  </span>
                </div>
              )}
            </div>
            
            {stat.target && (
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stat.color.includes('blue') ? 'bg-blue-600' :
                    stat.color.includes('green') ? 'bg-green-600' :
                    stat.color.includes('purple') ? 'bg-purple-600' :
                    'bg-orange-600'
                  }`}
                  style={{ width: `${getProgressPercentage(stat.value, stat.target)}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">This week's average</span>
          <span className="font-medium text-foreground">892 words/day</span>
        </div>
      </div>
    </div>
  );
};

export default WritingStats;