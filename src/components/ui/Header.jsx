import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Editor', path: '/script-editor', icon: 'FileText' },
    { label: 'Scripts', path: '/script-management', icon: 'FolderOpen' },
    { label: 'Reports', path: '/reports-and-analytics', icon: 'BarChart3' },
  ];

  const userMenuItems = [
    { label: 'Settings', path: '/settings-and-preferences', icon: 'Settings' },
    { label: 'Help & Support', action: 'help', icon: 'HelpCircle' },
    { label: 'Sign Out', action: 'logout', icon: 'LogOut' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleUserMenuAction = (action, path) => {
    if (path) {
      navigate(path);
    } else if (action === 'logout') {
      // Handle logout logic
      navigate('/user-authentication');
    } else if (action === 'help') {
      // Handle help action
      console.log('Help & Support clicked');
    }
    setUserMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="PenTool" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              ScriptCraft
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium text-sm
                transition-hover hover:bg-muted
                ${isActive(item.path) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-hover"
          >
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-muted-foreground transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated animate-slide-in">
              <div className="p-2">
                <div className="px-3 py-2 border-b border-border mb-2">
                  <p className="font-body font-medium text-sm text-popover-foreground">John Writer</p>
                  <p className="font-body text-xs text-muted-foreground">john@scriptcraft.com</p>
                </div>
                {userMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleUserMenuAction(item.action, item.path)}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-hover text-left"
                  >
                    <Icon name={item.icon} size={16} className="text-muted-foreground" />
                    <span className="font-body text-sm text-popover-foreground">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-background">
        <nav className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-lg
                transition-hover
                ${isActive(item.path) 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-body text-xs">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;