import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import CertificationsSection from './components/CertificationsSection';
import MembershipChaptersSection from './components/MembershipChaptersSection';
import ResearchSection from './components/ResearchSection';
import StemLabConfigurator from './components/StemLabConfigurator';
import { Mail, Phone, MapPin, Globe, Cpu, Check, ShieldCheck, Landmark } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Enrollment Modal States
  const [isEnrollOpen, setIsEnrollOpen] = useState<boolean>(false);
  const [enrollCourse, setEnrollCourse] = useState<string>('');
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantRegion, setApplicantRegion] = useState<string>('Delhi NCR');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitDone, setIsSubmitDone] = useState<boolean>(false);

  const handleEnrollClick = (courseTitle?: string) => {
    if (courseTitle) {
      setEnrollCourse(courseTitle);
    } else {
      setEnrollCourse('Senior AI Architect (SAIA)');
    }
    setIsSubmitDone(false);
    setIsEnrollOpen(true);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitDone(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans selection:bg-secondary-container selection:text-on-secondary-container flex flex-col justify-between">
      
      {/* 1. Stick Header Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEnrollClick={() => handleEnrollClick()}
      />

      {/* 2. Main Layout Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        
        {activeTab === 'overview' && (
          <div className="animate-fadeIn">
            <HomeSection
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onEnrollClick={() => handleEnrollClick()}
            />
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="animate-fadeIn">
            <CertificationsSection onEnrollClick={(course) => handleEnrollClick(course)} />
          </div>
        )}

        {activeTab === 'membership' && (
          <div className="animate-fadeIn">
            <MembershipChaptersSection />
          </div>
        )}

        {activeTab === 'research' && (
          <div className="animate-fadeIn">
            <ResearchSection />
          </div>
        )}

        {activeTab === 'stem-lab' && (
          <div className="animate-fadeIn">
            <StemLabConfigurator />
          </div>
        )}

      </main>

      {/* 3. Joint Footer */}
      <footer className="bg-primary text-white border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            
            {/* Col 1: Bio */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center">
                  <Cpu className="text-secondary-container w-5 h-5" />
                </div>
                <span className="text-lg font-display font-bold tracking-tight">AICAIML</span>
              </div>
              <p className="text-xs text-on-primary-container leading-relaxed max-w-sm">
                Leading the world in Artificial Intelligence and Machine Learning validation standards. Curated on the institutional framework of CSI and hands-on robotics engineering protocols.
              </p>
              <div className="flex gap-4 text-xs font-mono pt-2 text-on-primary-container">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-secondary" /> aicaiml.org
                </span>
                <span className="flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-secondary" /> Delhi Hub
                </span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-secondary-container">Ecosystem Links</h4>
              <ul className="space-y-2.5 text-xs text-on-primary-container">
                <li><button onClick={() => setActiveTab('overview')} className="hover:text-white transition-all cursor-pointer">Council Overview</button></li>
                <li><button onClick={() => setActiveTab('certifications')} className="hover:text-white transition-all cursor-pointer">Syllabus &amp; Exam Formats</button></li>
                <li><button onClick={() => setActiveTab('membership')} className="hover:text-white transition-all cursor-pointer">Regional Indian Chapters</button></li>
                <li><button onClick={() => setActiveTab('research')} className="hover:text-white transition-all cursor-pointer">Academic Transactions Archive</button></li>
              </ul>
            </div>

            {/* Col 3: Support Contact info */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-secondary-container">Secretariat Office</h4>
              <ul className="space-y-3 text-xs text-on-primary-container">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>AICAIML Secretariat, Institutional Area, Lodhi Road, New Delhi, India</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-secondary shrink-0" />
                  <span>enquiries@aicaiml.org</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-secondary shrink-0" />
                  <span>+91 11 4050 8090 (10 AM - 6 PM IST)</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-on-primary-container font-mono">
            <p>© 2026 AICAIML. All Rights Reserved. Co-aligned with CSI Publications &amp; STEM Standards.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Security Rules</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Global Sandbox Enrollment Overlay Modal */}
      {isEnrollOpen && (
        <div className="fixed inset-0 bg-primary/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-outline-variant max-w-md w-full overflow-hidden shadow-2xl animate-scaleIn">
            
            <div className="bg-primary text-white p-6 relative">
              <span className="text-[10px] font-mono font-bold text-secondary-container uppercase tracking-widest block">AICAIML Secretariat</span>
              <h3 className="font-display font-bold text-lg">Seat Reservation &amp; Application</h3>
              <button
                onClick={() => setIsEnrollOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {!isSubmitDone ? (
              <form onSubmit={handleEnrollSubmit} className="p-6 space-y-4">
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase">Target Certification Program</label>
                  <input
                    type="text"
                    required
                    readOnly
                    value={enrollCourse}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4.5 py-3 text-xs outline-none text-primary font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase">Full Applicant Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyesh Patel"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-xs outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase">Primary Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="priyesh@example.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-xs outline-none focus:border-secondary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-xs outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold text-on-surface-variant uppercase">Nearest Chapter Region</label>
                    <select
                      value={applicantRegion}
                      onChange={(e) => setApplicantRegion(e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-2.5 text-xs outline-none focus:border-secondary"
                    >
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Bengaluru Corridor">Bengaluru Corridor</option>
                      <option value="Hyderabad Cyberabad">Hyderabad Cyberabad</option>
                      <option value="Mumbai Financial">Mumbai Financial</option>
                      <option value="Kolkata Hub">Kolkata Hub</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-cta hover:bg-on-tertiary-container text-white py-3 rounded-lg font-display font-semibold text-xs transition-all cursor-pointer shadow-md mt-4 disabled:opacity-40"
                >
                  {isSubmitting ? 'Processing Pipeline...' : 'Request Reservation Blueprint'}
                </button>

              </form>
            ) : (
              /* Submission Complete view */
              <div className="p-8 text-center space-y-6">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-base text-primary">Application Successfully Registered</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed px-2">
                    Your sandbox seat application for <strong>{enrollCourse}</strong> has been logged in our regional queue database. Our curriculum advisors will coordinate via <strong>{applicantEmail}</strong>.
                  </p>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant/60 space-y-1.5">
                  <p className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest">Enrollment Details</p>
                  <p className="text-xs text-primary font-semibold">Applicant: {applicantName}</p>
                  <p className="text-[11px] text-on-surface-variant">Assigned Chapter: {applicantRegion} Council</p>
                  <p className="text-[11px] text-on-surface-variant">Reference Identifier: #AIC-REG-{Math.floor(10000 + Math.random() * 90000)}</p>
                </div>

                <button
                  onClick={() => setIsEnrollOpen(false)}
                  className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                >
                  Close &amp; Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
