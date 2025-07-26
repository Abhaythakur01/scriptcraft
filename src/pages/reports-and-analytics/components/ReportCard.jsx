import React from 'react';
import Icon from '../../../components/AppIcon';

const ReportCard = ({ title, value, change, changeType, icon, description }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-medium text-card-foreground">{title}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-heading font-semibold text-card-foreground">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
                <span className={`text-sm font-body ${getChangeColor()}`}>
                  {change}
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            )}
            {description && (
              <p className="text-sm text-muted-foreground font-body">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;