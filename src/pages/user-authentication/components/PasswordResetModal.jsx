import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PasswordResetModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('email'); // email, sent, reset
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setErrors({});
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setStep('sent');
    }, 1500);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (!resetCode) {
      setErrors({ resetCode: 'Reset code is required' });
      return;
    }
    if (resetCode !== '123456') {
      setErrors({ resetCode: 'Invalid reset code. Use: 123456' });
      return;
    }

    setErrors({});
    setStep('reset');
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      onClose();
      // Reset form
      setStep('email');
      setEmail('');
      setResetCode('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  const handleResendCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-background rounded-lg shadow-elevated w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {step === 'email' && 'Reset Password'}
            {step === 'sent' && 'Check Your Email'}
            {step === 'reset' && 'Create New Password'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-hover"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="john@example.com"
                required
              />
              <div className="flex space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={loading}
                  fullWidth
                  iconName="Send"
                  iconPosition="left"
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}

          {step === 'sent' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Mail" size={24} className="text-success" />
              </div>
              <div>
                <p className="text-sm text-foreground mb-2">
                  We've sent a reset code to:
                </p>
                <p className="font-medium text-foreground">{email}</p>
              </div>
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <Input
                  label="Reset Code"
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  error={errors.resetCode}
                  placeholder="Enter 6-digit code"
                  description="Mock code: 123456"
                  required
                />
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResendCode}
                    loading={loading}
                    fullWidth
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Resend Code
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Verify Code
                  </Button>
                </div>
              </form>
            </div>
          )}

          {step === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Create a new password for your account.
              </p>
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
                placeholder="Enter new password"
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                placeholder="Confirm new password"
                required
              />
              <div className="flex space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={loading}
                  fullWidth
                  iconName="Check"
                  iconPosition="left"
                >
                  Reset Password
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;