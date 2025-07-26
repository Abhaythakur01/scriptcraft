import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import WelcomePanel from './components/WelcomePanel';
import PasswordResetModal from './components/PasswordResetModal';

const UserAuthentication = () => {
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for testing
  const mockCredentials = {
    login: {
      email: 'writer@scriptcraft.com',
      password: 'password123'
    },
    register: {
      email: 'newwriter@scriptcraft.com',
      password: 'newpassword123'
    }
  };

  const handleAuthSubmit = async (formData) => {
    setLoading(true);

    // Mock authentication delay
    setTimeout(() => {
      if (authMode === 'login') {
        // Validate login credentials
        if (
          formData.email === mockCredentials.login.email &&
          formData.password === mockCredentials.login.password
        ) {
          // Successful login
          localStorage.setItem('scriptcraft_user', JSON.stringify({
            id: 1,
            email: formData.email,
            firstName: 'John',
            lastName: 'Writer',
            loginTime: new Date().toISOString()
          }));
          navigate('/dashboard');
        } else {
          // Failed login
          alert(`Invalid credentials. Use:\nEmail: ${mockCredentials.login.email}\nPassword: ${mockCredentials.login.password}`);
        }
      } else {
        // Registration flow
        if (formData.email === mockCredentials.register.email) {
          // Successful registration
          localStorage.setItem('scriptcraft_user', JSON.stringify({
            id: 2,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            registrationTime: new Date().toISOString()
          }));
          navigate('/dashboard');
        } else {
          // Registration validation
          alert(`Registration demo. Use:\nEmail: ${mockCredentials.register.email}\nPassword: ${mockCredentials.register.password}`);
        }
      }
      setLoading(false);
    }, 2000);
  };

  const handleModeChange = (mode) => {
    setAuthMode(mode);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Welcome Panel - Left Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-muted">
          <WelcomePanel />
        </div>

        {/* Authentication Form - Right Side */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-white"
                  >
                    <path d="m12 19 7-7 3 3-7 7-3-3z" />
                    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="m2 2 7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">ScriptCraft</h1>
                  <p className="text-sm text-muted-foreground">Professional Screenwriting</p>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {authMode === 'login' ? 'Welcome Back' : 'Join ScriptCraft'}
              </h2>
              <p className="text-muted-foreground">
                {authMode === 'login' ?'Sign in to continue writing your stories' :'Start your professional screenwriting journey'
                }
              </p>
            </div>

            {/* Authentication Form */}
            <AuthForm
              mode={authMode}
              onModeChange={handleModeChange}
              onSubmit={handleAuthSubmit}
              loading={loading}
            />

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <button
                  onClick={() => setShowPasswordReset(true)}
                  className="hover:text-foreground transition-hover"
                >
                  Forgot Password?
                </button>
                <span>•</span>
                <button className="hover:text-foreground transition-hover">
                  Help & Support
                </button>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <p>
                  By continuing, you agree to our{' '}
                  <button className="text-primary hover:text-primary/80 transition-hover">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button className="text-primary hover:text-primary/80 transition-hover">
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
      />
    </div>
  );
};

export default UserAuthentication;