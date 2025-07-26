import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useScriptsStorage } from '../../../hooks/useLocalStorage';

const ExportWizard = ({ isOpen, onClose, selectedScripts: selectedScriptIds }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [exportSettings, setExportSettings] = useState({
    format: 'pdf',
    includeTitle: true,
    includePageNumbers: true,
    includeSceneNumbers: true,
    watermark: '',
    fontSize: '12',
    margins: 'standard',
    binding: 'none',
    colorPages: false,
    separateFiles: true
  });

  const { scripts } = useScriptsStorage();

  const selectedScripts = scripts.filter(script => selectedScriptIds.includes(script.id));


  if (!isOpen) return null;

  const steps = [
    { number: 1, title: 'Format Selection', description: 'Choose export format and basic options' },
    { number: 2, title: 'Formatting Options', description: 'Configure layout and appearance' },
    { number: 3, title: 'Review & Export', description: 'Review settings and start export' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF', description: 'Industry standard format', icon: 'FileText' },
    { value: 'fdx', label: 'Final Draft', description: 'Final Draft XML format', icon: 'FileCode' },
    { value: 'fountain', label: 'Fountain', description: 'Plain text markup', icon: 'Type' },
    { value: 'docx', label: 'Word Document', description: 'Microsoft Word format', icon: 'FileText' }
  ];

  const marginOptions = [
    { value: 'standard', label: 'Standard (1.5" left, 1" others)' },
    { value: 'wide', label: 'Wide (2" all sides)' },
    { value: 'narrow', label: 'Narrow (1" all sides)' },
    { value: 'custom', label: 'Custom margins' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const downloadFile = (filename, content, mimeType) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const handleExport = () => {
    console.log('Exporting with settings:', exportSettings);
    console.log('Selected scripts:', selectedScripts);

    if (exportSettings.format === 'fountain' || exportSettings.format === 'txt') {
      selectedScripts.forEach(script => {
        const scriptContent = script.content || 'No content available.';
        downloadFile(`${script.title}.txt`, scriptContent, 'text/plain');
      });
    } else {
      alert(`Exporting as ${exportSettings.format.toUpperCase()} is not yet implemented.`);
    }

    onClose();
  };


  const updateSetting = (key, value) => {
    setExportSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Export Scripts</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedScripts.length} script{selectedScripts.length > 1 ? 's' : ''} selected
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep >= step.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {currentStep > step.number ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Choose Export Format</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formats.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => updateSetting('format', format.value)}
                      className={`
                        p-4 border rounded-lg text-left transition-hover
                        ${exportSettings.format === format.value
                          ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          exportSettings.format === format.value ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <Icon
                            name={format.icon}
                            size={20}
                            className={exportSettings.format === format.value ? 'text-primary' : 'text-muted-foreground'}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{format.label}</h4>
                          <p className="text-sm text-muted-foreground">{format.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Basic Options</h3>
                <div className="space-y-3">
                  <Checkbox
                    label="Include title page"
                    checked={exportSettings.includeTitle}
                    onChange={(e) => updateSetting('includeTitle', e.target.checked)}
                  />
                  <Checkbox
                    label="Include page numbers"
                    checked={exportSettings.includePageNumbers}
                    onChange={(e) => updateSetting('includePageNumbers', e.target.checked)}
                  />
                  <Checkbox
                    label="Include scene numbers"
                    checked={exportSettings.includeSceneNumbers}
                    onChange={(e) => updateSetting('includeSceneNumbers', e.target.checked)}
                  />
                  <Checkbox
                    label="Export as separate files"
                    description="Create individual files for each script"
                    checked={exportSettings.separateFiles}
                    onChange={(e) => updateSetting('separateFiles', e.target.checked)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Formatting Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Input
                      label="Font Size"
                      type="number"
                      value={exportSettings.fontSize}
                      onChange={(e) => updateSetting('fontSize', e.target.value)}
                      min="8"
                      max="16"
                      description="Standard screenplay font size is 12pt"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Page Margins
                    </label>
                    <div className="space-y-2">
                      {marginOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="margins"
                            value={option.value}
                            checked={exportSettings.margins === option.value}
                            onChange={(e) => updateSetting('margins', e.target.value)}
                            className="rounded border-border"
                          />
                          <span className="text-sm text-foreground">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Input
                  label="Watermark Text (Optional)"
                  type="text"
                  value={exportSettings.watermark}
                  onChange={(e) => updateSetting('watermark', e.target.value)}
                  placeholder="e.g., DRAFT, CONFIDENTIAL"
                  description="Add a watermark to all pages"
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Additional Options</h4>
                <Checkbox
                  label="Color pages (if applicable)"
                  description="Export in color instead of black and white"
                  checked={exportSettings.colorPages}
                  onChange={(e) => updateSetting('colorPages', e.target.checked)}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Review Export Settings</h3>
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Format:</span>
                    <span className="text-sm font-medium text-foreground">
                      {formats.find(f => f.value === exportSettings.format)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Scripts:</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedScripts.length} script{selectedScripts.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Font Size:</span>
                    <span className="text-sm font-medium text-foreground">{exportSettings.fontSize}pt</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Margins:</span>
                    <span className="text-sm font-medium text-foreground">
                      {marginOptions.find(m => m.value === exportSettings.margins)?.label}
                    </span>
                  </div>
                  {exportSettings.watermark && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Watermark:</span>
                      <span className="text-sm font-medium text-foreground">{exportSettings.watermark}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Export Information</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your scripts will be exported with industry-standard formatting.
                      The export process may take a few moments for multiple scripts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={currentStep === 1 ? onClose : handlePrevious}
            iconName={currentStep === 1 ? "X" : "ChevronLeft"}
            iconPosition="left"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>

          <div className="flex items-center space-x-2">
            {currentStep < 3 ? (
              <Button
                variant="default"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
              >
                Export Scripts
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportWizard;