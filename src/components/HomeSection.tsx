import React from 'react';
import { Award, Briefcase, ChevronRight, GraduationCap, ArrowRight, ShieldCheck, Cpu, Beaker, Users, FileText } from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
  onEnrollClick: () => void;
}

export default function HomeSection({ onNavigate, onEnrollClick }: HomeSectionProps) {
  
  const stats = [
    { label: 'Certified Professionals', value: '18,500+', icon: Award, color: 'text-secondary bg-secondary/10' },
    { label: 'Regional Chapters', value: '45+', icon: Users, color: 'text-primary bg-primary/10' },
    { label: 'STEM Labs Installed', value: '320+', icon: Cpu, color: 'text-on-tertiary-container bg-tertiary-fixed' },
    { label: 'Technical Publications', value: '1,400+', icon: FileText, color: 'text-blue-600 bg-blue-50' }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-12 pt-4">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wide text-secondary bg-secondary/10 uppercase">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            Empowering AI Specialists
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold leading-tight tracking-tight">
            Master the Future with Global <span className="text-secondary">AI Certifications</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            AICAIML provides rigorous, industry-recognized certification programs designed for the next generation of artificial intelligence and machine learning specialists.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('certifications')}
              className="glow-btn bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-lg font-display font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
            >
              Explore Pathways
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('stem-lab')}
              className="border border-outline hover:border-primary hover:bg-surface-container-low text-primary px-8 py-4 rounded-lg font-display font-semibold transition-all duration-300 cursor-pointer"
            >
              Configure STEM Lab
            </button>
          </div>
        </div>
        
        {/* Hero Image Block */}
        <div className="relative group h-64 sm:h-80 md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3j0f4WTWrjMika3o6pWfO_nsHC-i3cvqElMw15smX1XdhvZf_wszx8ExIXMIQcCWamVZ0wEYlx8QGQ7ICRO1CMvH34DEuDV130mw_sf3-uBjFR8XPaRkurU8mKvlf1SzbVYq0p1DgqNMrOte_ckfFCNGbzKnirsOVWYjA06WPgVxtsKxhFGDaG7gHPpJHOk6qfo3C1aq4DLfFBDW3i0CTuyAeA1mNjQwupMfMvtRQ6El9Cm99v3Lbr_n91CotRz6ViXhsQ5klBpPt"
            alt="AI professional workspace"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white p-3 sm:p-4 glass-card bg-primary-container/85 border border-white/10 rounded-xl">
            <p className="font-mono text-[10px] sm:text-xs text-secondary-container font-semibold tracking-wider uppercase">Accredited Excellence</p>
            <h3 className="font-display font-bold text-sm sm:text-lg">Curriculum Crafted by Top Academics &amp; Industrial Partners</h3>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Stats Grid */}
      <section className="bg-surface-container-low border border-outline-variant rounded-2xl p-4 sm:p-8 lg:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-4 rounded-xl hover:bg-white transition-all duration-200">
                <div className={`p-3.5 rounded-lg shrink-0 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-display font-extrabold text-primary tracking-tight">{stat.value}</p>
                  <p className="text-sm text-on-surface-variant font-medium mt-1 leading-snug">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Dual Foundation Integration Spotlights */}
      <section className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-primary tracking-tight">
            The CSI Academic Legacy &amp; Practical Engineering Strength
          </h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            The All India Council for Artificial Intelligence and Machine Learning (AICAIML) establishes the highest benchmark for AI validation. Drawing on the institutional model of the <span className="font-semibold text-primary">Computer Society of India (CSI)</span>, we curate a rigorous, peer-reviewed knowledge and transactions catalog.
          </p>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            In collaboration with leading industrial institutions, we offer direct lab set-ups. Our program ensures you gain not just classroom knowledge, but a deep engineering skill set with physical, GPU-powered labs.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center mt-1 text-secondary font-bold">✓</div>
              <p className="text-sm font-sans font-medium text-primary">Professional networking through Regional CSI Student Branches</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center mt-1 text-secondary font-bold">✓</div>
              <p className="text-sm font-sans font-medium text-primary">Hands-on robotics hardware support with customized STEM kits</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center mt-1 text-secondary font-bold">✓</div>
              <p className="text-sm font-sans font-medium text-primary">Bi-annual transactions indexing on generative AI &amp; deep computer vision</p>
            </div>
          </div>
        </div>

        {/* Feature Image Block */}
        <div className="bg-primary-container text-white p-8 sm:p-12 rounded-2xl flex flex-col justify-between relative overflow-hidden group min-h-[350px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
          <div className="space-y-4 relative z-10">
            <span className="font-mono text-xs text-secondary-container font-semibold uppercase tracking-widest block">Collaborative Impact</span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl">Pioneering AI Ecosystems in Schools &amp; Corporates</h3>
            <p className="text-sm text-on-primary-container leading-relaxed max-w-md">
              Whether you are an academic institution hoping to outfit a state-of-the-art AI-centric Robotics Lab, or a researcher submitting your masterwork to the Transactions Archive, AICAIML stands as your ultimate validation authority.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-6 relative z-10">
            <button
              onClick={() => onNavigate('stem-lab')}
              className="bg-accent-cta hover:bg-on-tertiary-container text-white py-3 px-6 rounded-lg font-display font-semibold transition-all duration-200 text-sm cursor-pointer shadow"
            >
              Setup STEM Lab
            </button>
            <button
              onClick={() => onNavigate('research')}
              className="bg-white/10 hover:bg-white/15 text-white py-3 px-6 rounded-lg font-sans font-semibold transition-all duration-200 text-sm cursor-pointer"
            >
              Browse Journals
            </button>
          </div>
        </div>
      </section>

      {/* 4. Professional Pathways Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-display text-3xl font-bold text-primary tracking-tight">Structured Professional Pathways</h2>
          <p className="text-body-md text-on-surface-variant">
            Explore paths constructed for your exact experience level, mapped to validated global benchmarks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1: Students */}
          <div className="glass-card bg-white p-8 rounded-2xl border border-outline-variant flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Student Track</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                For high school and university students looking to build a robust foundation in Python coding, linear algebra foundations, and robotics algorithms.
              </p>
              <div className="border-t border-outline-variant/50 pt-4 space-y-2">
                <p className="text-xs font-mono font-semibold text-secondary">CORE TRAINING</p>
                <p className="text-sm font-sans font-semibold text-primary">STEM Lab Basics &amp; Python</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('certifications')}
              className="mt-6 flex items-center gap-1 text-sm font-sans font-bold text-secondary hover:text-on-secondary-container transition-all cursor-pointer group"
            >
              Explore Certifications
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Professional Pivot */}
          <div className="glass-card bg-white p-8 rounded-2xl border border-outline-variant flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Professional Pivot</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                For experienced software engineers, system admins, and data analysts looking to pivot securely to MLOps, deep computer vision, and neural architecture optimization.
              </p>
              <div className="border-t border-outline-variant/50 pt-4 space-y-2">
                <p className="text-xs font-mono font-semibold text-primary">CORE TRAINING</p>
                <p className="text-sm font-sans font-semibold text-primary">MLOps &amp; Custom Deployments</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('certifications')}
              className="mt-6 flex items-center gap-1 text-sm font-sans font-bold text-secondary hover:text-on-secondary-container transition-all cursor-pointer group"
            >
              Explore Certifications
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Research Fellowships */}
          <div className="glass-card bg-white p-8 rounded-2xl border border-outline-variant flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent-cta/10 flex items-center justify-center">
                <Beaker className="w-6 h-6 text-accent-cta" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary">Research &amp; Ethics</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                For researchers, PhD candidates, and chief architects focused on model compression, generative safety, explainable AI models, and policy alignment.
              </p>
              <div className="border-t border-outline-variant/50 pt-4 space-y-2">
                <p className="text-xs font-mono font-semibold text-accent-cta">CORE TRAINING</p>
                <p className="text-sm font-sans font-semibold text-primary">Senior AI Architect Fellowship</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('certifications')}
              className="mt-6 flex items-center gap-1 text-sm font-sans font-bold text-secondary hover:text-on-secondary-container transition-all cursor-pointer group"
            >
              Explore Certifications
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. Dynamic CTA Banner */}
      <section className="bg-surface-container border border-outline-variant rounded-2xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 relative z-10 max-w-2xl">
          <h3 className="font-display text-2xl font-bold text-primary">Launch Your AICAIML Journey Today</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Get personalized roadmap advice from an assigned technical mentor, access student branch resources, or configure your university's own STEM Robotics lab layout.
          </p>
        </div>
        <div className="flex gap-4 shrink-0 relative z-10">
          <button
            onClick={onEnrollClick}
            className="glow-btn bg-accent-cta hover:bg-on-tertiary-container text-white py-3.5 px-8 rounded-lg font-display font-semibold transition-all cursor-pointer shadow-md text-sm"
          >
            Apply/Enroll Now
          </button>
          <button
            onClick={() => onNavigate('membership')}
            className="bg-white border border-outline hover:border-primary text-primary py-3.5 px-6 rounded-lg font-sans font-semibold transition-all cursor-pointer text-sm"
          >
            Join Membership
          </button>
        </div>
      </section>

    </div>
  );
}
