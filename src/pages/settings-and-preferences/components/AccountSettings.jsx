import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Writer',
    email: 'john@scriptcraft.com',
    phone: '+1 (555) 123-4567',
    bio: 'Professional screenwriter with 10+ years of experience in feature films and television.',
    website: 'https://johnwriter.com',
    location: 'Los Angeles, CA'
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    emailNotifications: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const [subscription, setSubscription] = useState({
    plan: 'Professional',
    status: 'Active',
    nextBilling: '2025-08-25',
    amount: '$19.99/month',
    autoRenew: true
  });

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubscriptionChange = (field, value) => {
    setSubscription(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
  };

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Changing password');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account');
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2 text-primary" />
          Profile Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            type="text"
            value={profile.firstName}
            onChange={(e) => handleProfileChange('firstName', e.target.value)}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            value={profile.lastName}
            onChange={(e) => handleProfileChange('lastName', e.target.value)}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            value={profile.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={profile.phone}
            onChange={(e) => handleProfileChange('phone', e.target.value)}
          />
          
          <Input
            label="Website"
            type="url"
            value={profile.website}
            onChange={(e) => handleProfileChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
          
          <Input
            label="Location"
            type="text"
            value={profile.location}
            onChange={(e) => handleProfileChange('location', e.target.value)}
            placeholder="City, State/Country"
          />
        </div>
        
        <div className="mt-6">
          <Input
            label="Bio"
            type="text"
            value={profile.bio}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
            description="Tell others about your writing background and experience"
            placeholder="Brief description of your writing experience..."
          />
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveProfile} iconName="Save" iconPosition="left">
            Save Profile
          </Button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Security & Privacy
        </h3>
        
        <div className="space-y-6">
          {/* Password Change */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-body font-medium text-foreground mb-4">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Current Password"
                type="password"
                value={security.currentPassword}
                onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                required
              />
              
              <Input
                label="New Password"
                type="password"
                value={security.newPassword}
                onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                required
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                value={security.confirmPassword}
                onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                onClick={handleChangePassword}
                iconName="Key"
                iconPosition="left"
              >
                Update Password
              </Button>
            </div>
          </div>
          
          {/* Two-Factor Authentication */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-body font-medium text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${security.twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                  {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <Button 
                  variant={security.twoFactorEnabled ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleSecurityChange('twoFactorEnabled', !security.twoFactorEnabled)}
                >
                  {security.twoFactorEnabled ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Notification Preferences */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-body font-medium text-foreground mb-4">Notification Preferences</h4>
            <div className="space-y-3">
              <Checkbox
                label="Email notifications"
                description="Receive notifications about account activity and updates"
                checked={security.emailNotifications}
                onChange={(e) => handleSecurityChange('emailNotifications', e.target.checked)}
              />
              
              <Checkbox
                label="Marketing emails"
                description="Receive promotional emails and product updates"
                checked={security.marketingEmails}
                onChange={(e) => handleSecurityChange('marketingEmails', e.target.checked)}
              />
              
              <Checkbox
                label="Security alerts"
                description="Receive alerts about suspicious account activity"
                checked={security.securityAlerts}
                onChange={(e) => handleSecurityChange('securityAlerts', e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2 text-primary" />
          Subscription & Billing
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Current Plan</label>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-semibold text-foreground">{subscription.plan}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  subscription.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {subscription.status}
                </span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">Billing Amount</label>
              <p className="text-lg font-semibold text-foreground mt-1">{subscription.amount}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground">Next Billing Date</label>
              <p className="text-foreground mt-1">{subscription.nextBilling}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Checkbox
              label="Auto-renewal"
              description="Automatically renew your subscription"
              checked={subscription.autoRenew}
              onChange={(e) => handleSubscriptionChange('autoRenew', e.target.checked)}
            />
            
            <div className="space-y-2">
              <Button variant="outline" fullWidth iconName="CreditCard" iconPosition="left">
                Update Payment Method
              </Button>
              <Button variant="outline" fullWidth iconName="Download" iconPosition="left">
                Download Invoice
              </Button>
              <Button variant="outline" fullWidth iconName="ArrowUpDown" iconPosition="left">
                Change Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-destructive rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-destructive mb-4 flex items-center">
          <Icon name="AlertTriangle" size={20} className="mr-2" />
          Danger Zone
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
            <div>
              <h4 className="font-body font-medium text-foreground">Delete Account</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;