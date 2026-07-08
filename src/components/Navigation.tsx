import React from 'react';
import { Cpu, ChevronRight, Menu, X, Landmark, Award, BookOpen, Settings, Info } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onEnrollClick: () => void;
}

export default function Navigation({ activeTab, setActiveTab, onEnrollClick }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'membership', label: 'CSI Hub & Portal', icon: Landmark },
    { id: 'research', label: 'Research Portal', icon: BookOpen },
    { id: 'stem-lab', label: 'STEM Lab Builder', icon: Settings },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-11 h-11 rounded-lg bg-primary-container flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105">
              <Cpu className="text-secondary-container w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-primary tracking-tight">AICAIML</span>
                <span className="text-[10px] bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-mono font-bold">CSI CO-ALIGNED</span>
              </div>
              <p className="text-[10px] text-on-surface-variant font-sans tracking-wide">Council for AI &amp; Machine Learning</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-sans text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-secondary bg-surface-container-low border-b-2 border-secondary'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Call-to-action button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onEnrollClick}
              className="glow-btn bg-accent-cta hover:bg-on-tertiary-container text-white px-6 py-2.5 rounded-lg text-sm font-display font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1 shadow-md"
            >
              Enroll Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-secondary p-2 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 border-b border-outline-variant animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-md text-left text-base font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-secondary bg-surface-container-low font-semibold'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/50'
                  }`}
                >
                  <Icon className="w-5 h-5 text-secondary" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-2 px-4 border-t border-outline-variant">
              <button
                onClick={() => {
                  onEnrollClick();
                  setIsOpen(false);
                }}
                className="w-full bg-accent-cta text-white text-center py-3 rounded-lg font-display font-semibold shadow-md"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
