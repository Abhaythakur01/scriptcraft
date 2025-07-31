import React, { useState } from 'react';
import jsPDF from 'jspdf';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useScriptsStorage } from '../../../hooks/useLocalStorage';

// Helper function to convert Slate nodes to plain text
const serializeSlateToString = (nodes) => {
  return nodes.map(n => n.children.map(c => c.text).join('')).join('\n');
};

const ExportWizard = ({ isOpen, onClose, selectedScripts: selectedScriptIds }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [exportSettings, setExportSettings] = useState({
    format: 'pdf',
    includeTitle: true,
    includePageNumbers: true,
    includeSceneNumbers: true,
    watermark: '',
    fontSize: 12,
    margins: 'standard',
    binding: 'none',
    colorPages: false,
    separateFiles: true
  });

  const { scripts } = useScriptsStorage();
  const selectedScripts = scripts.filter(script => selectedScriptIds.includes(script.id));

  const handleExport = () => {
    if (exportSettings.format === 'pdf') {
      generatePdf();
    } else {
      alert(`Exporting as ${exportSettings.format.toUpperCase()} is not yet implemented.`);
    }
    onClose();
  };

  const generatePdf = () => {
    selectedScripts.forEach(script => {
      const doc = new jsPDF({
        unit: 'in',
        format: 'letter'
      });

      // Set font to Courier for screenplay standard
      doc.setFont('Courier', 'normal');
      doc.setFontSize(exportSettings.fontSize);

      const pageHeight = doc.internal.pageSize.getHeight();
      const leftMargin = 1.5; // inches
      const rightMargin = 1.0; // inches
      const topMargin = 1.0;
      const bottomMargin = 1.0;
      const printableWidth = doc.internal.pageSize.getWidth() - leftMargin - rightMargin;
      
      let cursorY = topMargin;
      const lineHeight = 0.2; // Approx height for 12pt font

      const checkPageBreak = () => {
        if (cursorY > pageHeight - bottomMargin) {
          doc.addPage();
          cursorY = topMargin;
        }
      };

      // Ensure script content is in the correct format
      const scriptContent = Array.isArray(script.content) && script.content.length > 0
        ? script.content
        : [{ type: 'action', children: [{ text: script.content || '' }] }];

      scriptContent.forEach(line => {
        const text = line.children.map(c => c.text).join('');
        const lines = doc.splitTextToSize(text, printableWidth);
        
        checkPageBreak();

        let indent = leftMargin;
        switch (line.type) {
          case 'character':
            indent = 3.5;
            break;
          case 'dialogue':
            indent = 2.5;
            break;
          case 'parenthetical':
            indent = 3.0;
            break;
          case 'transition':
            // Transitions are right-aligned, which is more complex.
            // For simplicity, we'll indent it far to the right.
            indent = 5.0;
            break;
          case 'scene-heading':
          case 'action':
          default:
            indent = 1.5;
            break;
        }
        
        doc.text(lines, indent, cursorY);
        cursorY += lines.length * lineHeight;
        
        // Add a small space after each element
        cursorY += lineHeight / 2;
      });

      doc.save(`${script.title}.pdf`);
    });
  };

  if (!isOpen) return null;

  const steps = [
    { number: 1, title: 'Format Selection', description: 'Choose export format and basic options' },
    { number: 2, title: 'Formatting Options', description: 'Configure layout and appearance' },
    { number: 3, title: 'Review & Export', description: 'Review settings and start export' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF', description: 'Industry standard format', icon: 'FileText' },
    { value: 'fountain', label: 'Fountain', description: 'Plain text markup', icon: 'Type' },
  ];

  const marginOptions = [
    { value: 'standard', label: 'Standard (1.5" left, 1" others)' },
  ];
  
  const handleNext = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const handlePrevious = () => currentStep > 1 && setCurrentStep(currentStep - 1);
  const updateSetting = (key, value) => setExportSettings(prev => ({ ...prev, [key]: value }));

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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {currentStep > step.number ? <Icon name="Check" size={16} /> : step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (<div className={`w-12 h-px mx-4 ${currentStep > step.number ? 'bg-primary' : 'bg-border'}`} />)}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
             <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Choose Export Format</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formats.map((format) => (
                    <button key={format.value} onClick={() => updateSetting('format', format.value)} className={`p-4 border rounded-lg text-left transition-hover ${exportSettings.format === format.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${exportSettings.format === format.value ? 'bg-primary/10' : 'bg-muted'}`}>
                          <Icon name={format.icon} size={20} className={exportSettings.format === format.value ? 'text-primary' : 'text-muted-foreground'}/>
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
          )}
          {currentStep === 2 && (
             <div className="space-y-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Formatting Options</h3>
                 <div>
                    <Input label="Font Size" type="number" value={exportSettings.fontSize} onChange={(e) => updateSetting('fontSize', parseInt(e.target.value, 10))} min="10" max="14" description="Standard screenplay font size is 12pt" />
                  </div>
              </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Review & Export</h3>
                <p className="text-sm text-muted-foreground">Review your settings below. The script will be downloaded as a PDF file.</p>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button variant="ghost" onClick={currentStep === 1 ? onClose : handlePrevious} iconName={currentStep === 1 ? "X" : "ChevronLeft"} iconPosition="left">
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          <div className="flex items-center space-x-2">
            {currentStep < 3 ? (
              <Button variant="default" onClick={handleNext} iconName="ChevronRight" iconPosition="right">Next</Button>
            ) : (
              <Button variant="default" onClick={handleExport} iconName="Download" iconPosition="left">Export PDF</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportWizard;