import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportSettings = () => {
  const [exportSettings, setExportSettings] = useState({
    defaultFormat: 'pdf',
    pdfQuality: 'high',
    includePageNumbers: true,
    includeSceneNumbers: false,
    watermarkEnabled: false,
    watermarkText: 'DRAFT',
    watermarkOpacity: '30',
    titlePageIncluded: true,
    titlePageTemplate: 'standard',
    headerText: '',
    footerText: '',
    margins: {
      top: '1.0',
      bottom: '1.0',
      left: '1.5',
      right: '1.0'
    }
  });

  const [titlePageSettings, setTitlePageSettings] = useState({
    title: 'Untitled Script',
    subtitle: '',
    author: 'John Writer',
    basedOn: '',
    contact: `John Writer\njohn@scriptcraft.com\n+1 (555) 123-4567`,
    copyright: `© ${new Date().getFullYear()} John Writer`,
    draftDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  });

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'docx', label: 'Microsoft Word' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'fdx', label: 'Final Draft (FDX)' },
    { value: 'fountain', label: 'Fountain Format' }
  ];

  const qualityOptions = [
    { value: 'high', label: 'High Quality (300 DPI)' },
    { value: 'medium', label: 'Medium Quality (150 DPI)' },
    { value: 'low', label: 'Low Quality (72 DPI)' }
  ];

  const templateOptions = [
    { value: 'standard', label: 'Standard Industry Template' },
    { value: 'minimal', label: 'Minimal Template' },
    { value: 'detailed', label: 'Detailed Template' },
    { value: 'custom', label: 'Custom Template' }
  ];

  const handleExportSettingChange = (key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMarginChange = (side, value) => {
    setExportSettings(prev => ({
      ...prev,
      margins: {
        ...prev.margins,
        [side]: value
      }
    }));
  };

  const handleTitlePageChange = (key, value) => {
    setTitlePageSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving export settings:', { exportSettings, titlePageSettings });
  };

  const handleTestExport = () => {
    console.log('Testing export with current settings');
  };

  const handleReset = () => {
    setExportSettings({
      defaultFormat: 'pdf',
      pdfQuality: 'high',
      includePageNumbers: true,
      includeSceneNumbers: false,
      watermarkEnabled: false,
      watermarkText: 'DRAFT',
      watermarkOpacity: '30',
      titlePageIncluded: true,
      titlePageTemplate: 'standard',
      headerText: '',
      footerText: '',
      margins: {
        top: '1.0',
        bottom: '1.0',
        left: '1.5',
        right: '1.0'
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Default Export Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Download" size={20} className="mr-2 text-primary" />
          Default Export Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Default Format"
            description="Choose your preferred export format"
            options={formatOptions}
            value={exportSettings.defaultFormat}
            onChange={(value) => handleExportSettingChange('defaultFormat', value)}
          />
          
          <Select
            label="PDF Quality"
            description="Higher quality means larger file size"
            options={qualityOptions}
            value={exportSettings.pdfQuality}
            onChange={(value) => handleExportSettingChange('pdfQuality', value)}
          />
        </div>
        
        <div className="mt-6 space-y-4">
          <Checkbox
            label="Include page numbers"
            description="Add page numbers to exported documents"
            checked={exportSettings.includePageNumbers}
            onChange={(e) => handleExportSettingChange('includePageNumbers', e.target.checked)}
          />
          
          <Checkbox
            label="Include scene numbers"
            description="Add scene numbers to the margins"
            checked={exportSettings.includeSceneNumbers}
            onChange={(e) => handleExportSettingChange('includeSceneNumbers', e.target.checked)}
          />
          
          <Checkbox
            label="Include title page"
            description="Add a title page to the beginning of the script"
            checked={exportSettings.titlePageIncluded}
            onChange={(e) => handleExportSettingChange('titlePageIncluded', e.target.checked)}
          />
        </div>
      </div>

      {/* Page Margins */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Layout" size={20} className="mr-2 text-primary" />
          Page Margins (inches)
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            label="Top"
            type="number"
            step="0.1"
            min="0.5"
            max="3.0"
            value={exportSettings.margins.top}
            onChange={(e) => handleMarginChange('top', e.target.value)}
          />
          
          <Input
            label="Bottom"
            type="number"
            step="0.1"
            min="0.5"
            max="3.0"
            value={exportSettings.margins.bottom}
            onChange={(e) => handleMarginChange('bottom', e.target.value)}
          />
          
          <Input
            label="Left"
            type="number"
            step="0.1"
            min="0.5"
            max="3.0"
            value={exportSettings.margins.left}
            onChange={(e) => handleMarginChange('left', e.target.value)}
          />
          
          <Input
            label="Right"
            type="number"
            step="0.1"
            min="0.5"
            max="3.0"
            value={exportSettings.margins.right}
            onChange={(e) => handleMarginChange('right', e.target.value)}
          />
        </div>
        
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground flex items-start">
            <Icon name="Info" size={16} className="mr-2 mt-0.5 text-primary" />
            Standard screenplay margins: 1.5" left, 1" top/bottom/right. Left margin accommodates binding.
          </p>
        </div>
      </div>

      {/* Watermark Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Watermark Settings
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable watermark"
            description="Add a watermark to protect your script drafts"
            checked={exportSettings.watermarkEnabled}
            onChange={(e) => handleExportSettingChange('watermarkEnabled', e.target.checked)}
          />
          
          {exportSettings.watermarkEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
              <Input
                label="Watermark Text"
                type="text"
                value={exportSettings.watermarkText}
                onChange={(e) => handleExportSettingChange('watermarkText', e.target.value)}
                placeholder="DRAFT"
              />
              
              <Input
                label="Opacity (%)"
                type="number"
                min="10"
                max="80"
                value={exportSettings.watermarkOpacity}
                onChange={(e) => handleExportSettingChange('watermarkOpacity', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Header and Footer */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="AlignCenter" size={20} className="mr-2 text-primary" />
          Header & Footer
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Header Text"
            type="text"
            value={exportSettings.headerText}
            onChange={(e) => handleExportSettingChange('headerText', e.target.value)}
            placeholder="Optional header text"
            description="Appears at the top of each page"
          />
          
          <Input
            label="Footer Text"
            type="text"
            value={exportSettings.footerText}
            onChange={(e) => handleExportSettingChange('footerText', e.target.value)}
            placeholder="Optional footer text"
            description="Appears at the bottom of each page"
          />
        </div>
      </div>

      {/* Title Page Configuration */}
      {exportSettings.titlePageIncluded && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
            <Icon name="FileText" size={20} className="mr-2 text-primary" />
            Title Page Configuration
          </h3>
          
          <div className="space-y-6">
            <Select
              label="Title Page Template"
              options={templateOptions}
              value={exportSettings.titlePageTemplate}
              onChange={(value) => handleExportSettingChange('titlePageTemplate', value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Script Title"
                type="text"
                value={titlePageSettings.title}
                onChange={(e) => handleTitlePageChange('title', e.target.value)}
                required
              />
              
              <Input
                label="Subtitle"
                type="text"
                value={titlePageSettings.subtitle}
                onChange={(e) => handleTitlePageChange('subtitle', e.target.value)}
                placeholder="Optional subtitle"
              />
              
              <Input
                label="Author"
                type="text"
                value={titlePageSettings.author}
                onChange={(e) => handleTitlePageChange('author', e.target.value)}
                required
              />
              
              <Input
                label="Based On"
                type="text"
                value={titlePageSettings.basedOn}
                onChange={(e) => handleTitlePageChange('basedOn', e.target.value)}
                placeholder="Based on a story by..."
              />
              
              <Input
                label="Copyright"
                type="text"
                value={titlePageSettings.copyright}
                onChange={(e) => handleTitlePageChange('copyright', e.target.value)}
              />
              
              <Input
                label="Draft Date"
                type="text"
                value={titlePageSettings.draftDate}
                onChange={(e) => handleTitlePageChange('draftDate', e.target.value)}
              />
            </div>
            
            <Input
              label="Contact Information"
              type="text"
              value={titlePageSettings.contact}
              onChange={(e) => handleTitlePageChange('contact', e.target.value)}
              description="Author contact details (use line breaks for multiple lines)"
              placeholder="Name, email, phone..."
            />
          </div>
        </div>
      )}

      {/* Export Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Eye" size={20} className="mr-2 text-primary" />
          Export Preview
        </h3>
        
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Format:</strong> {formatOptions.find(f => f.value === exportSettings.defaultFormat)?.label}</p>
            <p><strong>Quality:</strong> {qualityOptions.find(q => q.value === exportSettings.pdfQuality)?.label}</p>
            <p><strong>Margins:</strong> {exportSettings.margins.top}" top, {exportSettings.margins.bottom}" bottom, {exportSettings.margins.left}" left, {exportSettings.margins.right}" right</p>
            <p><strong>Page Numbers:</strong> {exportSettings.includePageNumbers ? 'Included' : 'Not included'}</p>
            <p><strong>Scene Numbers:</strong> {exportSettings.includeSceneNumbers ? 'Included' : 'Not included'}</p>
            <p><strong>Title Page:</strong> {exportSettings.titlePageIncluded ? 'Included' : 'Not included'}</p>
            <p><strong>Watermark:</strong> {exportSettings.watermarkEnabled ? `"${exportSettings.watermarkText}" at ${exportSettings.watermarkOpacity}% opacity` : 'None'}</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            onClick={handleTestExport}
            iconName="Download"
            iconPosition="left"
          >
            Test Export with Current Settings
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={handleReset}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset to Defaults
        </Button>
        
        <div className="flex space-x-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave} iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportSettings;