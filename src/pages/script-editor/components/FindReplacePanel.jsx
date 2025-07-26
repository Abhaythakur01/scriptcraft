import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FindReplacePanel = ({ isOpen, onClose }) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  if (!isOpen) return null;

  const handleFind = () => {
    // Mock search functionality
    setTotalMatches(3);
    setCurrentMatch(1);
  };

  const handleReplace = () => {
    console.log('Replace current match');
  };

  const handleReplaceAll = () => {
    console.log('Replace all matches');
  };

  const handleNext = () => {
    if (currentMatch < totalMatches) {
      setCurrentMatch(currentMatch + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMatch > 1) {
      setCurrentMatch(currentMatch - 1);
    }
  };

  return (
    <div className="fixed top-32 right-6 z-50 w-96 bg-popover border border-border rounded-lg shadow-elevated animate-slide-in">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-foreground">Find & Replace</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          iconName="X"
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Find Input */}
        <div className="space-y-2">
          <Input
            label="Find"
            type="text"
            placeholder="Enter text to find..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
          />
          
          {totalMatches > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {currentMatch} of {totalMatches} matches
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentMatch <= 1}
                  iconName="ChevronUp"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentMatch >= totalMatches}
                  iconName="ChevronDown"
                />
              </div>
            </div>
          )}
        </div>

        {/* Replace Input */}
        <Input
          label="Replace with"
          type="text"
          placeholder="Enter replacement text..."
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />

        {/* Options */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={matchCase}
              onChange={(e) => setMatchCase(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Match case</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={wholeWord}
              onChange={(e) => setWholeWord(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Whole word</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-foreground">Use regex</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFind}
              iconName="Search"
              iconPosition="left"
              fullWidth
            >
              Find
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReplace}
              disabled={totalMatches === 0}
              iconName="Replace"
              iconPosition="left"
              fullWidth
            >
              Replace
            </Button>
          </div>
          
          <Button
            variant="default"
            size="sm"
            onClick={handleReplaceAll}
            disabled={totalMatches === 0}
            iconName="ReplaceAll"
            iconPosition="left"
            fullWidth
          >
            Replace All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindReplacePanel;