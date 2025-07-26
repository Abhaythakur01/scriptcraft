import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReportsToolbar = ({ activeTab, onTabChange }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('current-month');

  const exportOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'json', label: 'JSON Data' }
  ];

  const dateRangeOptions = [
    { value: 'current-month', label: 'Current Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'current-year', label: 'Current Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleExport = () => {
    console.log(`Exporting ${activeTab} report as ${exportFormat} for ${dateRange}`);
    // Simulate export process
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    console.log('Sharing report');
    // Implement share functionality
  };

  const handleRefresh = () => {
    console.log('Refreshing report data');
    // Implement refresh functionality
  };

  return (
    <div className="bg-muted border-b border-border p-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left Section - Report Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h2 className="font-heading font-semibold text-foreground">Reports & Analytics</h2>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>Last updated: {new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
          {/* Date Range Selector */}
          <div className="w-full sm:w-48">
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrint}
              iconName="Printer"
              iconPosition="left"
            >
              Print
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              iconName="Share2"
              iconPosition="left"
            >
              Share
            </Button>

            {/* Export Dropdown */}
            <div className="flex items-center space-x-2">
              <div className="w-32">
                <Select
                  options={exportOptions}
                  value={exportFormat}
                  onChange={setExportFormat}
                  placeholder="Export format"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <p className="text-lg font-heading font-semibold text-foreground">121</p>
            <p className="text-xs text-muted-foreground">Total Pages</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-heading font-semibold text-foreground">102</p>
            <p className="text-xs text-muted-foreground">Total Scenes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-heading font-semibold text-foreground">23</p>
            <p className="text-xs text-muted-foreground">Characters</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-heading font-semibold text-foreground">15</p>
            <p className="text-xs text-muted-foreground">Locations</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-heading font-semibold text-foreground">1,425</p>
            <p className="text-xs text-muted-foreground">Avg Words/Day</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-heading font-semibold text-foreground">96%</p>
            <p className="text-xs text-muted-foreground">Goal Achievement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsToolbar;