import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomePanel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Independent Filmmaker",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      quote: "ScriptCraft transformed my writing process. The formatting is flawless and the interface is incredibly intuitive."
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "TV Writer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      quote: "Finally, a screenwriting tool that doesn't get in the way of creativity. The auto-formatting is a game-changer."
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Feature Film Writer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      quote: "Professional results without the complexity. ScriptCraft delivers everything I need for industry-standard scripts."
    }
  ];

  const features = [
    {
      icon: "FileText",
      title: "Industry Standard Formatting",
      description: "Professional screenplay formatting that meets industry standards automatically"
    },
    {
      icon: "Zap",
      title: "Real-time Auto-complete",
      description: "Smart suggestions for character names, locations, and scene headers"
    },
    {
      icon: "Save",
      title: "Auto-save & Backup",
      description: "Never lose your work with automatic saving and cloud backup"
    },
    {
      icon: "Download",
      title: "Export to PDF",
      description: "Generate production-ready PDFs with proper pagination and formatting"
    }
  ];

  return (
    <div className="flex flex-col justify-center h-full p-8 lg:p-12">
      {/* Logo and Brand */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="PenTool" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">ScriptCraft</h1>
            <p className="text-sm text-muted-foreground">Professional Screenwriting Made Simple</p>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
          Write Professional Screenplays with Confidence
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Join thousands of writers who trust ScriptCraft for industry-standard formatting, 
          intuitive writing tools, and seamless project management. Focus on your story while 
          we handle the technical details.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {features.map((feature) => (
          <div key={feature.icon} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground mb-4">Trusted by Professional Writers</h3>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-background rounded-lg p-4 border border-border shadow-soft">
            <div className="flex items-start space-x-3">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm text-foreground mb-2 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-foreground text-xs">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Signals */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span className="text-xs">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} />
            <span className="text-xs">10,000+ Writers</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} />
            <span className="text-xs">4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;