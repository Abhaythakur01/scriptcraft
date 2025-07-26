import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'script_created',
      title: 'Created new script',
      description: 'The Last Stand - Feature Film',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'Plus',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'script_edited',
      title: 'Updated script',
      description: 'Midnight Café - Added 3 new scenes',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: 'Edit3',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'script_exported',
      title: 'Exported to PDF',
      description: 'Urban Dreams - Final Draft',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Download',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'goal_achieved',
      title: 'Daily goal achieved',
      description: 'Wrote 1,200 words today',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Target',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      type: 'script_shared',
      title: 'Script shared',
      description: 'Shared "The Journey" with collaborator',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Share2',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">Recent Activity</h2>
        <Button variant="ghost" size="sm" iconName="Clock" />
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 ${activity.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={activity.icon} size={16} className={activity.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-body font-medium text-foreground text-sm">
                  {activity.title}
                </p>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" fullWidth iconName="MoreHorizontal">
          View All Activity
        </Button>
      </div>
    </div>
  );
};

export default RecentActivity;