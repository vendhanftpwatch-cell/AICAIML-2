import React, { useState } from 'react';
import { RESEARCH_PAPERS } from '../data';
import { ResearchPaper } from '../types';
import { BookOpen, Search, Filter, UploadCloud, Check, User, Calendar, BookOpenCheck, ArrowRight } from 'lucide-react';

export default function ResearchSection() {
  const [papers, setPapers] = useState<ResearchPaper[]>(RESEARCH_PAPERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>('p1');

  // Submission Form States
  const [submissionTitle, setSubmissionTitle] = useState<string>('');
  const [submissionAuthors, setSubmissionAuthors] = useState<string>('');
  const [submissionCategory, setSubmissionCategory] = useState<string>('Foundation Models');
  const [submissionAbstract, setSubmissionAbstract] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const categories = ['All', 'Foundation Models', 'Computer Vision / Robotics', 'NLP', 'Reinforcement Learning'];

  const filteredPapers = papers.filter(paper => {
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          paper.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handlePaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle || !submissionAuthors || !submissionAbstract) return;

    // Create a mock new paper
    const newPaper: ResearchPaper = {
      id: 'mock-' + Date.now(),
      title: submissionTitle,
      authors: submissionAuthors,
      journal: 'AICAIML Transactions on AI',
      issue: 'Vol. 13, Issue 1 (In Review)',
      publishedYear: 2026,
      reads: 12,
      category: submissionCategory,
      abstract: submissionAbstract
    };

    // Prepend to state
    setPapers([newPaper, ...papers]);
    setSubmitSuccess(true);

    // Reset fields
    setSubmissionTitle('');
    setSubmissionAuthors('');
    setSubmissionAbstract('');
    setUploadedFile(null);

    // Fade out success notification
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4500);
  };

  const contributors = [
    {
      name: 'Dr. Elena Vance',
      title: 'Principal NLP Researcher',
      tag: 'Natural Language Processing',
      quote: 'Optimizing attention alignment is the true bottleneck for small, robust edge transformers.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJROjO94ikrE1gIGtWUBmsVkXiZWeW8t9CYxQKd3WOoR452fTn7ibnaLDwwwRwpqr5DoVMnq19C26mkkMdRml5UxFhD9Idrd73laVw5OutKLfRHiz4mWTAJuLj6g8lybmq0VET0EtDd-Z8-enwoEYigSqENwLg22v3SFKJikhwOp2aYlEDlHFfucTjKuVV5ftzArHOpl8mbhYDpaQCJ4KBS0ITaeSwM6dUTGDOjwbVfOcLYvhFXT36gs6O5hndCka4LH2j16YRftAr'
    },
    {
      name: 'Prof. Marcus Thorne',
      title: 'Senior Vision Director',
      tag: 'Computer Vision',
      quote: 'Fast 3D volumetric sweeps will redefine search-and-rescue UAV pathing protocols.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBedi91Dz9NCPt0kdQ2EY5o41BZAcnniRUHUhoGjuiOXdEEc11W1eidexaqeeOdLCbjt2xS0es7m59-e6hKu156PhkpV_o0wfnIsE7XOVvqfOrqyTkcmqRczoZ9DI2Zilu9aV9vWP9XYBMNHfVYCWxtp0SqZNSDH7OUddnUeGFd-BYHfLhT65Dn8Eq-HOdgPIujMcL4OOcu6zVhp1CCyT4pczhhAdUZL7eNpOjrX98Q8MIV95y2nmxYQltPTmcNITnO9iaZVpSECM4Q'
    },
    {
      name: 'Dr. Sarah Jenkins',
      title: 'Lead Architect',
      tag: 'Model Architecture',
      quote: 'High accuracy is redundant if your inference framework takes 200ms extra per token.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsGnrc6pf8SweVvzBhy-ZpliDc3nl1YRCot25NP_JLws94BnYgvRCd_7J45j2nmCzTZ_MrJ1wBNrw_4k87n5Ptxp1EYrjMqzp9cBwjXG-6Hhy9NGu_T-RAXZxEuO1VjSjgx29zSZ8qEkqD_bTChn0pRiMNmZKdYMz-FFjk-8HqabISiLSMHn-z7krx8dCxlP25lHvllFrj6rhLSJTfWiTUm7sdR6Pl-h0cAFrCnaHwdwHLpcXuz3_x36tRmgDTnQQKqseNZu60r3CD'
    },
    {
      name: 'Dr. Robert Lang',
      title: 'Fellow, Autonomic Systems',
      tag: 'Reinforcement Learning',
      quote: 'Multi-agent environments require sparse cooperative rewards rather than global aggregates.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWbvxlZ2BXBrz8iQ13Aq28XAqQEOEuEWaNaxJWvIkOnkXn9OzYpvxwXI3Z2Pqk8VmJ_CAXsNw-qCU0TANWSqV3UEiQj5SRkyPSMjuQPpbfxoncKcbYwPQq-9mtZldLtheMOZP7HMkeU_zu_XQhV1_BqrEPZGv-0Yk7pOj6jzL09HeqTYRVcRWqE08EdbrsMyIa2kBjonxnLh2gZD6FCQlMf-jM06nd_F_kYimHHQXWIyKXg8C0wtY1GGO7obdpobx8RTuGjNA4ajXA'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Area */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest block">Technical Journals</span>
        <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">Research &amp; Publications Archive</h2>
        <p className="text-body-md text-on-surface-variant max-w-3xl">
          Access a comprehensive database of journals, technical letters, and theoretical transactions co-curated with CSI standards to document computing breakthroughs.
        </p>
      </div>

      {/* 2. Main Search & Filter Console */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Selectors */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 snap-start transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Query Input */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input
              type="text"
              placeholder="Search journals or abstracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-xs border border-outline-variant rounded-lg pl-10 pr-4 py-2 outline-none focus:border-secondary transition-all"
            />
          </div>

        </div>

        {/* Papers List */}
        <div className="space-y-4">
          {filteredPapers.length > 0 ? (
            filteredPapers.map((paper) => {
              const isExpanded = expandedPaperId === paper.id;
              return (
                <div
                  key={paper.id}
                  className={`bg-white border border-outline-variant rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                    isExpanded ? 'ring-1 ring-secondary border-secondary/50 shadow-sm' : 'hover:bg-surface-container-low/50'
                  }`}
                  onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] font-mono font-bold bg-surface-container text-primary px-2 py-0.5 rounded">
                          {paper.category}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-mono font-medium">
                          {paper.journal} | {paper.issue}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-primary hover:text-secondary transition-colors">
                        {paper.title}
                      </h4>
                      <p className="text-xs font-sans text-on-surface-variant font-semibold">
                        Authors: {paper.authors}
                      </p>
                    </div>
                    
                    <span className="text-[10px] font-mono bg-secondary-container/35 text-on-secondary-container px-2 py-1 rounded shrink-0">
                      {paper.reads} Reads
                    </span>
                  </div>

                  {/* Expanded Abstract Section */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-outline-variant/50 space-y-3 animate-fadeIn">
                      <p className="text-xs font-mono font-bold uppercase text-secondary tracking-wider">Abstract Outline</p>
                      <p className="text-sm text-on-surface-variant leading-relaxed font-sans bg-surface-container-low/40 p-4 rounded-lg border border-outline-variant/30">
                        {paper.abstract}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-on-surface-variant font-medium bg-white border border-outline-variant rounded-xl">
              No published papers match your specific query.
            </div>
          )}
        </div>
      </div>

      {/* 3. Joint Submission Portal & Call for Papers */}
      <section className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Paper Submission Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-secondary tracking-wider uppercase">Submit Paper Abstract</span>
            <h3 className="font-display font-bold text-xl text-primary">Academic Submission Portal</h3>
            <p className="text-xs text-on-surface-variant">Your submission will undergo peer-review evaluation. Once submitted, it appears in our live simulation directory below.</p>
          </div>

          <form onSubmit={handlePaperSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono font-bold text-on-surface-variant uppercase">Research Paper Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Robust Edge Deployment of Visual Inception Filters"
                value={submissionTitle}
                onChange={(e) => setSubmissionTitle(e.target.value)}
                className="w-full bg-white text-sm border border-outline-variant rounded-lg px-4 py-3 outline-none focus:border-secondary transition-all"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold text-on-surface-variant uppercase">Authors &amp; Affiliations</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Anand Verma; Amit Rao"
                  value={submissionAuthors}
                  onChange={(e) => setSubmissionAuthors(e.target.value)}
                  className="w-full bg-white text-sm border border-outline-variant rounded-lg px-4 py-3 outline-none focus:border-secondary transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold text-on-surface-variant uppercase">Core Research Stream</label>
                <select
                  value={submissionCategory}
                  onChange={(e) => setSubmissionCategory(e.target.value)}
                  className="w-full bg-white text-sm border border-outline-variant rounded-lg px-4 py-3 outline-none focus:border-secondary transition-all"
                >
                  <option value="Foundation Models">Foundation Models</option>
                  <option value="Computer Vision / Robotics">Computer Vision / Robotics</option>
                  <option value="NLP">NLP</option>
                  <option value="Reinforcement Learning">Reinforcement Learning</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono font-bold text-on-surface-variant uppercase">Abstract Text</label>
              <textarea
                required
                placeholder="Paste your 150-word formal research abstract summary here..."
                value={submissionAbstract}
                onChange={(e) => setSubmissionAbstract(e.target.value)}
                className="w-full bg-white text-sm border border-outline-variant rounded-lg px-4 py-3 h-32 outline-none focus:border-secondary transition-all"
              ></textarea>
            </div>

            {/* Usability Pattern: Drag and Drop Upload */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono font-bold text-on-surface-variant uppercase">Manuscript PDF Attachment</label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                  isDragOver ? 'border-secondary bg-secondary/5' : 'border-outline-variant hover:border-primary/40 bg-surface-container-low/30'
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer space-y-2 block">
                  <UploadCloud className="w-8 h-8 text-secondary mx-auto" />
                  <p className="text-xs font-sans text-primary font-semibold">
                    {uploadedFile ? `Attached: ${uploadedFile.name}` : 'Drag &amp; drop PDF manuscript, or click to browse'}
                  </p>
                  <p className="text-[10px] text-on-surface-variant font-medium">Max Size: 15MB (.pdf format only)</p>
                </label>
              </div>
            </div>

            {/* Notification of Success */}
            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-start gap-3 text-xs text-green-800 animate-fadeIn">
                <Check className="w-4 h-4 text-green-600 shrink-0" />
                <p><strong>Manuscript Uploaded Successfully!</strong> Your paper has been cataloged in our system and prepended to the live peer-review table above.</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-accent-cta hover:bg-on-tertiary-container text-white py-3.5 rounded-lg font-display font-semibold transition-all shadow cursor-pointer"
            >
              Submit Draft for Review
            </button>

          </form>
        </div>

        {/* Right: Upcoming Deadlines & Highlight (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-primary-container text-white p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-secondary-container tracking-wider uppercase">UPCOMING ACADEMIC SUMMIT</span>
              <h4 className="font-display font-bold text-xl">AICAIML Delhi Summit 2025</h4>
              <p className="text-xs text-on-primary-container">Accepted papers are co-published under joint CSI journals indexations.</p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-4 bg-white/5 p-3.5 rounded-lg">
                <div className="w-11 h-11 rounded bg-secondary/15 flex flex-col items-center justify-center shrink-0">
                  <span className="text-base font-extrabold text-secondary-container">15</span>
                  <span className="text-[8px] uppercase font-bold text-white/70">Mar</span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-white text-sm">Abstract Submission</p>
                  <p className="text-[10px] text-on-primary-container">Strict Deadline - Midnight UTC</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-3.5 rounded-lg">
                <div className="w-11 h-11 rounded bg-secondary/15 flex flex-col items-center justify-center shrink-0">
                  <span className="text-base font-extrabold text-secondary-container">28</span>
                  <span className="text-[8px] uppercase font-bold text-white/70">Apr</span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-white text-sm">Full Paper Decision</p>
                  <p className="text-[10px] text-on-primary-container">Formal Committee Acceptance Announcement</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-xs text-on-primary-container flex items-start gap-3">
              <span>💡</span>
              <p className="leading-relaxed">
                Researchers of student branches are eligible to request full AICAIML travel scholarships to present their approved thesis in Delhi.
              </p>
            </div>
          </div>

          {/* New Resource Download */}
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl flex flex-col justify-between min-h-[180px]">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest block">Resource Download</span>
              <h4 className="font-display font-bold text-base text-primary">2026 AI Ethics &amp; Bias Whitepaper</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Co-drafted by senior researchers at BITS student council branch on multi-lingual alignment benchmarks.
              </p>
            </div>
            
            <a href="#" className="font-sans font-bold text-xs text-secondary hover:text-on-secondary-container flex items-center gap-1.5 mt-4 group">
              Download PDF Manuscript
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </section>

      {/* 4. Distinguished Contributors Spotlights */}
      <section className="space-y-8">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <h3 className="font-display font-bold text-2xl text-primary">Distinguished Contributors</h3>
          <p className="text-sm text-on-surface-variant">Prominent scientists co-publishing core breakthroughs under our standards.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((c, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-outline-variant hover:border-secondary transition-all duration-300 text-center space-y-4 flex flex-col justify-between shadow-sm">
              <div className="space-y-3">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    src={c.image}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-primary">{c.name}</h4>
                  <p className="text-[10px] font-mono text-secondary font-semibold uppercase tracking-wider">{c.tag}</p>
                </div>
                <p className="text-xs text-on-surface-variant font-sans italic leading-relaxed px-2">
                  "{c.quote}"
                </p>
              </div>
              <p className="text-[10px] text-on-surface-variant font-medium pt-3 border-t border-outline-variant/40">
                {c.title}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
