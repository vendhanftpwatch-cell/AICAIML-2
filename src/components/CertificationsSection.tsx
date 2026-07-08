import React, { useState } from 'react';
import { CERTIFICATIONS_DATA } from '../data';
import { Certification } from '../types';
import { Award, Clock, BookOpen, User, DollarSign, ChevronDown, ChevronUp, Search, GraduationCap, Compass, Briefcase, PlayCircle } from 'lucide-react';

interface CertificationsSectionProps {
  onEnrollClick: (courseTitle?: string) => void;
}

export default function CertificationsSection({ onEnrollClick }: CertificationsSectionProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>('saia'); // SAIA expanded by default for visual punch

  // Quiz Recommendation States
  const [background, setBackground] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [recommendedCert, setRecommendedCert] = useState<Certification | null>(null);

  // Recommendations logic
  const handleRecommendationQuiz = () => {
    if (!background || !goal) return;
    
    let suggestedId = 'aif'; // default fallback
    
    if (background === 'non-tech') {
      suggestedId = 'aif';
    } else if (background === 'dev' && goal === 'career-leap') {
      suggestedId = 'saia';
    } else if (background === 'dev' && goal === 'operations') {
      suggestedId = 'mlops';
    } else if (background === 'stats' && goal === 'leadership') {
      suggestedId = 'dsl';
    } else if (background === 'student') {
      if (goal === 'research') {
        suggestedId = 'cve';
      } else {
        suggestedId = 'aif';
      }
    }
    
    const cert = CERTIFICATIONS_DATA.find(c => c.id === suggestedId);
    if (cert) {
      setRecommendedCert(cert);
    }
  };

  const filteredCerts = CERTIFICATIONS_DATA.filter(cert => {
    const matchesLevel = selectedLevel === 'All' || cert.level === selectedLevel;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest block">Accredited Standards</span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">Professional Certifications</h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl">
            Validate your expertise with our tier-one credentialing system, designed in compliance with CSI academic rigor and standard lab guidelines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
          <span className="text-xs font-mono text-secondary font-bold tracking-wider">LATEST 2026 SYLLABI ACTIVE</span>
        </div>
      </div>

      {/* Grid of Interactive Filters + Certifications Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
        
        {/* Level Filters */}
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Advanced', 'Specialist', 'Foundation'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg text-sm font-sans font-semibold transition-all shrink-0 cursor-pointer ${
                selectedLevel === level
                  ? 'bg-primary text-white shadow'
                  : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            type="text"
            placeholder="Search syllabus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2 text-sm border border-outline-variant rounded-lg focus:border-secondary transition-all outline-none"
          />
        </div>
      </div>

      {/* Main Certifications List */}
      <div className="space-y-6">
        {filteredCerts.length > 0 ? (
          filteredCerts.map((cert) => {
            const isExpanded = expandedCourseId === cert.id;
            return (
              <div
                key={cert.id}
                className={`glass-card bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'border-secondary/60 ring-1 ring-secondary/10' : 'border-outline-variant hover:border-primary/30'
                }`}
              >
                {/* Main Visible Header Card */}
                <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  
                  {/* Title Block */}
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        cert.level === 'Advanced' ? 'bg-primary-container text-primary-fixed' :
                        cert.level === 'Specialist' ? 'bg-secondary-container text-on-secondary-container' :
                        'bg-surface-container-high text-primary'
                      }`}>
                        {cert.level}
                      </span>
                      {cert.bestSeller && (
                        <span className="text-[10px] font-mono font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant px-2.5 py-1 rounded-full tracking-wider uppercase">
                          BEST SELLER
                        </span>
                      )}
                      <span className="text-xs font-mono text-on-surface-variant">{cert.code}</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  {/* Actions Block */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/60 gap-4 shrink-0">
                    <div className="text-left md:text-right">
                      <p className="text-xs text-on-surface-variant font-medium">Standard Fee</p>
                      <p className="text-xl font-display font-bold text-primary">{cert.cost}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpandedCourseId(isExpanded ? null : cert.id)}
                        className="p-2.5 border border-outline-variant hover:border-primary hover:bg-surface-container-low text-primary rounded-lg transition-all cursor-pointer"
                        title={isExpanded ? "Collapse Syllabus" : "View Curriculum"}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => onEnrollClick(cert.title)}
                        className="bg-accent-cta hover:bg-on-tertiary-container text-white font-display font-semibold text-sm px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm"
                      >
                        Enroll Course
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Curriculum Drawer */}
                {isExpanded && (
                  <div className="bg-surface-container-low/70 border-t border-outline-variant/60 p-6 sm:p-8 animate-fadeIn space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      
                      {/* Left: Syllabus Modules */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <BookOpen className="w-4 h-4 text-secondary" />
                          <h4 className="font-display font-bold text-sm tracking-tight uppercase text-secondary">Course Syllabus (5 Core Modules)</h4>
                        </div>
                        <ul className="space-y-3">
                          {cert.curriculum.map((module, index) => (
                            <li key={index} className="flex gap-3 text-sm text-on-surface-variant leading-relaxed">
                              <span className="font-mono text-xs font-bold text-secondary shrink-0 mt-0.5">
                                [M{index + 1}]
                              </span>
                              <span>{module}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: metadata stats */}
                      <div className="space-y-6">
                        
                        <div className="bg-white p-5 rounded-xl border border-outline-variant/50 space-y-4 shadow-sm">
                          <h4 className="font-display font-bold text-sm text-primary">Key Execution Details</h4>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-on-surface-variant">
                              <Clock className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-[10px] text-on-surface-variant font-medium">DURATION</p>
                                <p className="font-semibold text-primary">{cert.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-on-surface-variant">
                              <PlayCircle className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-[10px] text-on-surface-variant font-medium">LEARNING MODE</p>
                                <p className="font-semibold text-primary">{cert.mode}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5 text-sm pt-2 border-t border-outline-variant/50">
                            <User className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[10px] text-on-surface-variant font-medium">TARGET AUDIENCE</p>
                              <p className="text-xs text-on-surface-variant leading-relaxed">{cert.audience}</p>
                            </div>
                          </div>
                        </div>

                        {/* Note about credentials */}
                        <div className="bg-secondary-container/20 p-4 rounded-xl border border-secondary-container/50 text-xs text-on-secondary-container flex items-start gap-3">
                          <span className="text-base">ℹ️</span>
                          <p className="leading-relaxed">
                            <strong>Official Joint Credential:</strong> Upon successful examination, you receive a dual-accredited physical certificate co-issued by the AICAIML Research Board and the regional student alignment committee.
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-outline-variant">
            <p className="text-on-surface-variant font-medium">No certifications found matching your criteria.</p>
            <button
              onClick={() => { setSelectedLevel('All'); setSearchQuery(''); }}
              className="mt-4 text-sm text-secondary font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 2. Recommendation Micro-Quiz */}
      <section className="bg-primary text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-secondary-container uppercase tracking-widest">
              <Compass className="w-4 h-4" /> Recommended Guidance
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">Don't Know Where to Begin?</h3>
            <p className="text-sm text-on-primary-container max-w-xl">
              Answer two brief questions below to let our algorithmic Career Planner select the ideal certification curriculum path for your engineering objectives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            
            {/* Question 1 */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono font-bold tracking-wider text-secondary-container uppercase">1. What is your current technical background?</label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3 text-sm focus:border-secondary-container focus:bg-primary-container transition-all outline-none [&>option]:text-primary"
              >
                <option value="">Select Background...</option>
                <option value="non-tech">Non-Technical Professional / Business Leader</option>
                <option value="student">Student / Early Graduate</option>
                <option value="dev">Software Developer / Cloud Admin</option>
                <option value="stats">Data Analyst / Senior Statistician</option>
              </select>
            </div>

            {/* Question 2 */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono font-bold tracking-wider text-secondary-container uppercase">2. What is your primary career target?</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3 text-sm focus:border-secondary-container focus:bg-primary-container transition-all outline-none [&>option]:text-primary"
              >
                <option value="">Select Goal...</option>
                <option value="awareness">Build AI awareness &amp; core terminology literacy</option>
                <option value="career-leap">Lead large-scale LLM architecting &amp; fine-tuning</option>
                <option value="operations">Automate continuous integration pipelines (MLOps)</option>
                <option value="leadership">Transition to product strategic &amp; managerial leads</option>
                <option value="research">Deploy hardware vision models &amp; robot manipulators</option>
              </select>
            </div>

          </div>

          <div className="flex justify-start pt-4">
            <button
              onClick={handleRecommendationQuiz}
              className="bg-accent-cta hover:bg-on-tertiary-container text-white py-3 px-8 rounded-lg font-display font-bold text-sm transition-all cursor-pointer shadow-md"
              disabled={!background || !goal}
            >
              Analyze My Path
            </button>
          </div>

          {/* Quiz Result Box */}
          {recommendedCert && (
            <div className="bg-white text-primary p-6 rounded-2xl border border-secondary-container/40 animate-slideUp mt-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-secondary/10 text-secondary px-2.5 py-1 rounded-full uppercase tracking-wider">
                    RECOMMENDED PATHWAY
                  </span>
                  <h4 className="font-display font-bold text-lg sm:text-xl text-primary mt-2">
                    {recommendedCert.title} ({recommendedCert.code})
                  </h4>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-on-surface-variant">Fee: {recommendedCert.cost}</p>
                  <p className="text-xs text-secondary font-mono font-semibold">{recommendedCert.duration}</p>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {recommendedCert.description}
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    setExpandedCourseId(recommendedCert.id);
                    const element = document.getElementById(recommendedCert.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-lg font-sans font-bold text-xs cursor-pointer transition-all"
                >
                  View Details &amp; Syllabus
                </button>
                <button
                  onClick={() => onEnrollClick(recommendedCert.title)}
                  className="bg-accent-cta hover:bg-on-tertiary-container text-white px-5 py-2 rounded-lg font-display font-semibold text-xs cursor-pointer transition-all"
                >
                  Apply Directly
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
