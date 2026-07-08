import React, { useState } from 'react';
import { CHAPTERS_DATA } from '../data';
import { Chapter } from '../types';
import { 
  Landmark, Search, ShieldAlert, CheckCircle, Mail, MapPin, 
  User, ArrowRight, ArrowLeft, BookOpen, Cpu, ShieldCheck, 
  Database, Award, Info, FileText, Globe, Calendar, ExternalLink,
  ChevronRight, Users, Clock, ArrowUpRight
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  author: string;
  designation: string;
  category: string;
  publishedDate: string;
  readingTime: string;
  summary: string;
  content: string;
  citations: string[];
}

interface CSIMember {
  id: string;
  name: string;
  memberType: string;
  region: string;
  state: string;
  affiliation: string;
  division: string;
  status: 'Active' | 'Pending Verification' | 'Expired';
  registeredYear: number;
}

export default function MembershipChaptersSection() {
  // Navigation for the CSI Hub Sub-Tabs
  const [portalTab, setPortalTab] = useState<'overview' | 'publications' | 'divisions' | 'directory' | 'chapters' | 'join'>('overview');
  
  // Chapter list state
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [chapterSearchQuery, setChapterSearchQuery] = useState<string>('');
  
  // Publication / Communications States
  const [pubSearchQuery, setPubSearchQuery] = useState<string>('');
  const [pubCategoryFilter, setPubCategoryFilter] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Directory state
  const [directorySearchQuery, setDirectorySearchQuery] = useState<string>('');
  const [directoryFilterType, setDirectoryFilterType] = useState<string>('All');

  // Membership Wizard States
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardData, setWizardData] = useState({
    fullName: '',
    email: '',
    institutionName: '',
    membershipType: 'Student', // Student, Professional, Corporate
    paymentMethod: 'UPI',
    state: 'Delhi',
    region: 'North' as 'North' | 'South' | 'East' | 'West' | 'Central'
  });
  const [isWizardComplete, setIsWizardComplete] = useState<boolean>(false);
  const [assignedId, setAssignedId] = useState<string>('');

  // Prepopulated directory of verified CSI members
  const [verifiedMembers, setVerifiedMembers] = useState<CSIMember[]>([
    { id: 'CSI-LM-48201', name: 'Dr. Vivek Kumar', memberType: 'Life Member', region: 'North', state: 'Delhi', affiliation: 'AICAIML Delhi Secretariat', division: 'Division V (Education & Research)', status: 'Active', registeredYear: 2011 },
    { id: 'CSI-LM-10932', name: 'Dr. S. Subramanian', memberType: 'Life Member', region: 'South', state: 'Karnataka', affiliation: 'Indian Institute of Science (IISc)', division: 'Division III (Applications)', status: 'Active', registeredYear: 2014 },
    { id: 'CSI-LM-77284', name: 'Meera Deshmukh', memberType: 'Life Member', region: 'West', state: 'Maharashtra', affiliation: 'Tata Consultancy Services (TCS)', division: 'Division II (Software)', status: 'Active', registeredYear: 2016 },
    { id: 'CSI-LM-55102', name: 'Dr. K. Srinivas Rao', memberType: 'Life Member', region: 'South', state: 'Telangana', affiliation: 'IIIT Hyderabad', division: 'Division IV (Communications)', status: 'Active', registeredYear: 2013 },
    { id: 'CSI-LM-66289', name: 'Dr. Arnab Sen', memberType: 'Life Member', region: 'East', state: 'West Bengal', affiliation: 'Jadavpur University', division: 'Division V (Education & Research)', status: 'Active', registeredYear: 2010 },
    { id: 'CSI-LM-22831', name: 'Dr. Elena Vance', memberType: 'Life Member', region: 'North', state: 'Delhi', affiliation: 'AICAIML Secretariat', division: 'Division V (Education & Research)', status: 'Active', registeredYear: 2018 },
    { id: 'CSI-AM-89201', name: 'Prof. Vignesh Ram', memberType: 'Associate Member', region: 'South', state: 'Tamil Nadu', affiliation: 'IIT Madras Student Branch', division: 'Division I (Hardware)', status: 'Active', registeredYear: 2021 },
    { id: 'CSI-ST-99120', name: 'Anand Sharma', memberType: 'Student Member', region: 'Central', state: 'Rajasthan', affiliation: 'BITS Pilani Student Branch', division: 'Student Auxiliary', status: 'Active', registeredYear: 2024 },
    { id: 'CSI-ST-88125', name: 'Priyesh Patel', memberType: 'Student Member', region: 'North', state: 'Delhi', affiliation: 'Delhi Technological University (DTU)', division: 'Student Auxiliary', status: 'Active', registeredYear: 2025 }
  ]);

  const benefits = [
    {
      tier: 'Student Member',
      cost: '₹1,500 / Yr',
      perks: [
        'Free digital access to CSI Communications and AICAIML Transactions',
        'Discounted ticket access to the Annual National CSI Convention',
        'Eligibility for CSI Student Branch project grants & travel scholarships',
        'Participation rights in state-level coding & robotics challenges'
      ]
    },
    {
      tier: 'Professional Member',
      cost: '₹3,500 / Yr',
      perks: [
        'All Student Member privileges included',
        'Eligibility to join CSI National Divisions & Special Interest Groups (SIGs)',
        'Authority to run as a Chapter Chairperson or institutional advisor',
        'Peer-review status for national computing journals and conference papers'
      ]
    },
    {
      tier: 'Corporate / Institutional',
      cost: '₹15,000 / Yr',
      perks: [
        'Official recognition of your institution as a CSI-certified Academic Hub',
        'Bulk student/employee memberships (up to 50 active passes annually)',
        'Sponsorship placement in CSI publications & convention proceedings',
        'Direct advisory assistance for establishing local modern STEM AI labs'
      ]
    }
  ];

  // CSI Communications Articles
  const csiArticles: Article[] = [
    {
      id: 'art-01',
      title: 'UPI Security Protocols & API Isolation Layers: Minimizing Edge-Level Vulnerabilities',
      author: 'Meera Deshmukh',
      designation: 'Chair, West Region Software Division',
      category: 'Cybersecurity & Finance',
      publishedDate: 'July 2026',
      readingTime: '5 mins read',
      summary: 'With India’s Unified Payments Interface processing over 12 billion transactions monthly, edge security represents the primary surface for credential exploits. This study reviews current HSM delays and details endpoint isolation strategies.',
      content: 'The Unified Payments Interface (UPI) represents a monumental paradigm shift in decentralized retail transactions. At the heart of UPI is a secure, real-time messaging layer that operates over a network of national and private banks. However, as transaction volumes scale to hundreds of billions annually, the ecosystem faces novel cybersecurity hurdles. The most critical vulnerabilities reside not at the central servers but at the consumer endpoint and the immediate API routing layers.\n\nTo secure this ecosystem, financial institutions must implement real-time anomaly detection using lightweight machine learning models that screen for unusual transaction frequencies and geographic anomalies directly at the node level. Furthermore, we explore HSM (Hardware Security Module) latency issues during peak-load processing and recommend dynamic load-balancing frameworks. These frameworks can isolate suspicious transaction flows in sandbox containers without halting the core clearance ledger, maintaining high transaction speeds and absolute cryptographic security.',
      citations: [
        'NPCI Technical Specification Draft 4.2.1, 2025.',
        'Deshmukh, M., "Distributed Ledger Safety in UPI Core Modules", Indian Computing Journal, Vol. 14, 2024.',
        'Venkatesh, R., "Edge Security for Real-Time Payment Gateways", IEEE Transactions, 2025.'
      ]
    },
    {
      id: 'art-02',
      title: 'Low-Resource Indic Script Translation Optimization: Overcoming the Tokenization Curse',
      author: 'Dr. Elena Vance',
      designation: 'Specialist Advisory, National Division V',
      category: 'Natural Language Processing',
      publishedDate: 'June 2026',
      readingTime: '6 mins read',
      summary: 'Standard Western tokenizers suffer severe byte inflation when processing morphologically rich Indian languages. This paper demonstrates a customized vocabulary structure reducing token length by 60%.',
      content: 'India’s linguistic diversity presents an extraordinary challenge for modern large language models (LLMs). With 22 constitutionally recognized languages and thousands of regional dialects, standard multilingual models suffer from "the curse of multilinguality," where model capacity is diluted, leading to poor performance on low-resource vernaculars.\n\nStandard subword tokenizers (such as Byte-Pair Encoding) trained primarily on Western corpora are highly inefficient for Indic scripts, producing excessively long token sequences for simple words. This efficiency bottleneck results in prohibitive GPU inference costs and rapid context window exhaustion. Our research demonstrates that training custom subword vocabularies specifically on high-quality monolingual Indic corpora reduces token lengths by up to 60%. Additionally, by employing sparse cross-lingual attention mapping, we can transfer conceptual weights from high-resource languages to low-resource dialects, drastically reducing the volume of supervised training tokens required to achieve conversational fluency in regional Indian languages.',
      citations: [
        'Vance, E., "Tokenization Efficiencies in Devnagri and Dravidian Scripts", AICAIML Transactions, 2025.',
        'Srinivasan, T., "Cross-Lingual Weight Alignment for Low-Resource Languages", ACL Conference, 2024.'
      ]
    },
    {
      id: 'art-03',
      title: 'Integrating Edge AI Microcontrollers in K-12 STEM Education: Empirical Studies',
      author: 'Dr. Vivek Kumar',
      designation: 'Chairperson, Delhi NCR Chapter',
      category: 'Education Technology',
      publishedDate: 'May 2026',
      readingTime: '4 mins read',
      summary: 'Evaluating project-based learning outcomes using Jetson Nano and localized vision sensors across 45 schools. Results indicate a 35% retention boost in mathematical frameworks.',
      content: 'Early exposure to computational thinking and physical engineering is a cornerstone of the National Education Policy (NEP) in India. While standard computer science curriculums focus strictly on screens and syntax, physical robotics offers an immersive, kinesthetic learning experience. Integrating AI-centered robotics in secondary schools requires a carefully scaffolded approach.\n\nFirst, students should master basic microcontroller operations (such as digital I/O pins, sensor polling, and pulse-width modulation) using simple graphical interfaces before transitioning to Python scripting. Next, the introduction of affordable vision processing sensors (such as the Jetson Nano or Raspberry Pi camera modules) allows students to experiment with real-time edge processing—including color-tracking and basic spatial navigation. Our empirical studies across 45 pilot CSI Student Branches show that project-based STEM learning increases student retention of algebra and physical sciences by up to 35% compared to theoretical classrooms.',
      citations: [
        'NEP Implementation Handbook, Ministry of Education, Govt. of India, 2020.',
        'Kumar, V., "Physical Computing Paradigms in Indian High Schools", Journal of STEM Education, Vol. 8, 2025.'
      ]
    },
    {
      id: 'art-04',
      title: 'Local Cached Edge Computing for High-Latency Rural Networks',
      author: 'Dr. Arnab Sen',
      designation: 'Director, East Region Academic Hub',
      category: 'Distributed Systems',
      publishedDate: 'April 2026',
      readingTime: '5 mins read',
      summary: 'Deploying fault-tolerant hybrid servers inside village municipal hubs. Re-caching academic content locally ensures 99.4% school uptime despite network disruption.',
      content: 'Providing reliable internet connectivity and computing infrastructure in remote rural regions remains a critical bottleneck. Standard cloud-dependent architectures fail due to frequent fiber cuts, satellite jitter, and high latent load times. This paper proposes a decentralized, edge-cached computational model designed for rural schools and community portals.\n\nBy installing localized hybrid servers inside village municipal hubs, we cache standard academic resources, digital textbooks, and instructional videos. When the central network link is active, the hub synchronizes user logs and progress files via highly compressed delta packages. In offline scenarios, the edge server continues running localized databases, routing student queries, and compiling software sandboxes. Implementing this fault-tolerant distributed system in eastern Indian remote villages has demonstrated a 99.4% school computer lab uptime for daily operations, transforming educational accessibility.',
      citations: [
        'Sen, A. & Ray, P., "Edge Caching Architectures for Rural Development", IEEE Global Humanitarian Technology Conference, 2024.',
        'TRAI Network Reliability Statistical Summary Report, 2025.'
      ]
    }
  ];

  // CSI Technical Divisions Info
  const csiDivisions = [
    {
      code: 'Division I',
      name: 'Hardware & Microelectronics',
      chair: 'Prof. Aditya Sharma',
      focus: 'VLSI design, semiconductor manufacturing standards, embedded boards, and IoT wireless routing protocols.',
      sig: 'SIG-IoT & Embedded Systems',
      projects: 'Open-Source RISC-V Academic Board Initiatives'
    },
    {
      code: 'Division II',
      name: 'Software Systems & Engineering',
      chair: 'Meera Deshmukh',
      focus: 'Advanced software engineering architectures, microservices optimization, open-source compliance, and compiler design.',
      sig: 'SIG-Software Engineering & Devops',
      projects: 'National Code Repository Standards & Guidelines'
    },
    {
      code: 'Division III',
      name: 'Applications & Cloud Computing',
      chair: 'Dr. S. Subramanian',
      focus: 'Digital healthcare databases, scalable fintech transaction frameworks, agricultural telemetry, and cloud virtualization.',
      sig: 'SIG-Big Data & Cloud Systems',
      projects: 'Rural Tele-medicine High-Throughput Database'
    },
    {
      code: 'Division IV',
      name: 'Communications & Distributed Networks',
      chair: 'Dr. K. Srinivas Rao',
      focus: 'High-throughput wireless networks, 5G/6G deployment optimization, distributed edge nodes, and mesh topologies.',
      sig: 'SIG-Cyber Security & Networks',
      projects: 'Secure Cryptographic Keys over Rural WAN'
    },
    {
      code: 'Division V',
      name: 'Education & Academic Research',
      chair: 'Dr. Arnab Sen',
      focus: 'University curriculum standardizations, Faculty Development Programs (FDPs), doctoral thesis evaluation, and journal indexation.',
      sig: 'SIG-Artificial Intelligence (SIG-AI)',
      projects: 'CSI National Academic Sabbatical Fellowship Core'
    }
  ];

  // Filters
  const filteredChapters = CHAPTERS_DATA.filter(chap => {
    const matchesRegion = regionFilter === 'All' || chap.region === regionFilter;
    const matchesSearch = chap.name.toLowerCase().includes(chapterSearchQuery.toLowerCase()) ||
                          chap.state.toLowerCase().includes(chapterSearchQuery.toLowerCase()) ||
                          chap.chairperson.toLowerCase().includes(chapterSearchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const filteredArticles = csiArticles.filter(art => {
    const matchesCategory = pubCategoryFilter === 'All' || art.category === pubCategoryFilter;
    const matchesSearch = art.title.toLowerCase().includes(pubSearchQuery.toLowerCase()) ||
                          art.author.toLowerCase().includes(pubSearchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(pubSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredMembers = verifiedMembers.filter(mem => {
    const matchesType = directoryFilterType === 'All' || mem.memberType === directoryFilterType;
    const matchesSearch = mem.name.toLowerCase().includes(directorySearchQuery.toLowerCase()) ||
                          mem.id.toLowerCase().includes(directorySearchQuery.toLowerCase()) ||
                          mem.affiliation.toLowerCase().includes(directorySearchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Wizard Handlers
  const handleNextStep = () => {
    if (wizardStep < 3) {
      setWizardStep(wizardStep + 1);
    } else {
      // Complete registration
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const prefix = wizardData.membershipType === 'Student' ? 'CSI-ST-' : 'CSI-LM-';
      const newId = prefix + randomNum;
      setAssignedId(newId);
      setIsWizardComplete(true);

      // Instantly inject the new registration into the verified directory database state!
      const newMemberRecord: CSIMember = {
        id: newId,
        name: wizardData.fullName,
        memberType: wizardData.membershipType === 'Student' ? 'Student Member' : wizardData.membershipType === 'Professional' ? 'Professional Member' : 'Corporate / Institutional',
        region: wizardData.region,
        state: wizardData.state,
        affiliation: wizardData.institutionName,
        division: wizardData.membershipType === 'Student' ? 'Student Auxiliary' : 'Division V (Education & Research)',
        status: 'Active',
        registeredYear: 2026
      };
      setVerifiedMembers(prev => [newMemberRecord, ...prev]);
    }
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) {
      setWizardStep(wizardStep - 1);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. Header block */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-2.5 py-1 rounded-full">
            CSI National Alliance
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Official 1965 Framework</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">
          Computer Society of India Content &amp; Portal
        </h2>
        <p className="text-body-md text-on-surface-variant max-w-4xl leading-relaxed">
          Access publications, digital journals, technical divisions, regional chapters, and member validation registries representing the historical institutional core of the Computer Society of India (CSI).
        </p>
      </div>

      {/* 2. Sub-tab Navigation */}
      <div className="flex overflow-x-auto pb-3 gap-2 border-b border-outline-variant/60 -mx-4 px-4 sm:mx-0 sm:px-0 md:flex-wrap md:overflow-visible scrollbar-none snap-x snap-mandatory">
        {[
          { id: 'overview', label: 'CSI History & Vision', icon: Landmark },
          { id: 'publications', label: 'CSI Communications (Articles)', icon: BookOpen },
          { id: 'divisions', label: 'Divisions & SIGs', icon: Cpu },
          { id: 'directory', label: 'Verified Member Directory', icon: Database },
          { id: 'chapters', label: 'Chapters & Branches', icon: MapPin },
          { id: 'join', label: 'Apply / Join CSI', icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = portalTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setPortalTab(tab.id as any);
                setSelectedArticle(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer shrink-0 snap-start ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-on-surface-variant border-outline-variant hover:bg-surface-container-low hover:text-primary'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. Sub-tab Content Areas */}
      
      {/* A. OVERVIEW & HISTORY TAB */}
      {portalTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <h3 className="font-display text-2xl font-bold text-primary">CSI Core Pillars &amp; Foundations</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Formed in 1965, the Computer Society of India is India's first and largest association of computer professionals. It began with an association of technical pioneers who realized the digital revolution would need a structured, scientific organization to index research papers, standardise academic syllabi, and establish regional networks of computer hobbyists.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Today, CSI operates an expansive institutional framework comprising five national technical divisions, multiple Special Interest Groups (SIGs), over 72 major city chapters, and more than 500 college student branches nationwide.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low/40">
                  <p className="text-2xl font-display font-extrabold text-primary">100,000+</p>
                  <p className="text-xs text-on-surface-variant mt-1">Registered IT Professionals &amp; Students</p>
                </div>
                <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low/40">
                  <p className="text-2xl font-display font-extrabold text-secondary">1965</p>
                  <p className="text-xs text-on-surface-variant mt-1">Foundation of National CSI Chapters</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-primary text-white p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded bg-white/15 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-secondary-container" />
                </div>
                <h4 className="font-display font-bold text-lg">CSI National Charter</h4>
                <ul className="space-y-3 text-xs text-on-primary-container leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Directing curriculum frameworks for national engineering degrees.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Supporting continuous education through Faculty Development Programs.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Publishing the monthly peer-reviewed <strong>CSI Communications</strong> magazine.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">✓</span>
                    <span>Enabling students to organize workshops and technical symposia locally.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Timeline of CSI Milestones */}
          <div className="space-y-6 pt-4">
            <h4 className="font-display font-bold text-lg text-primary text-center">Historical Timeline &amp; Milestones</h4>
            <div className="relative border-l-2 border-outline-variant/60 ml-3 md:ml-32 space-y-8">
              {[
                { year: '1965', title: 'Foundation & Charter', desc: 'CSI is officially established in Delhi by computing pioneers to coordinate hardware standards and coding programs.' },
                { year: '1970', title: 'First National Convention', desc: 'The inaugural Annual National CSI Convention convenes in Mumbai, establishing computing as a formal scientific discipline.' },
                { year: '1985', title: 'Launch of CSI Communications', desc: 'CSI begins circulating its national monthly technical publication, becoming the country’s most popular computing magazine.' },
                { year: '2000', title: 'Global Academic Integrations', desc: 'CSI launches student branch affiliation programs across major regional colleges, including IITs, BITS, and NITs.' },
                { year: '2026', title: 'CSI-AICAIML Digital Transition', desc: 'The alliance introduces instant online credentials, AI Special Interest Groups (SIG-AI), and distributed digital journals.' }
              ].map((m, idx) => (
                <div key={idx} className="relative pl-6 md:pl-8 group">
                  {/* Left Year Label for Desktop */}
                  <div className="hidden md:block absolute -left-32 top-0.5 text-right w-24 font-mono font-bold text-sm text-secondary">
                    {m.year}
                  </div>
                  {/* Point Marker */}
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white group-hover:bg-secondary transition-colors"></div>
                  
                  <div className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm hover:border-primary transition-all duration-200">
                    <p className="md:hidden font-mono font-bold text-xs text-secondary mb-1">{m.year}</p>
                    <h5 className="font-display font-bold text-sm text-primary">{m.title}</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* B. PUBLICATIONS / CSI COMMUNICATIONS TAB */}
      {portalTab === 'publications' && (
        <div className="space-y-8 animate-fadeIn">
          {!selectedArticle ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
                {/* Topic Filters */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x">
                  {['All', 'Cybersecurity & Finance', 'Natural Language Processing', 'Education Technology', 'Distributed Systems'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setPubCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 snap-start transition-all cursor-pointer ${
                        pubCategoryFilter === cat
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Article Search Box */}
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search CSI Communications articles..."
                    value={pubSearchQuery}
                    onChange={(e) => setPubSearchQuery(e.target.value)}
                    className="w-full bg-white text-xs border border-outline-variant rounded-lg pl-9 pr-4 py-2 outline-none focus:border-secondary transition-all"
                  />
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map(art => (
                    <div 
                      key={art.id} 
                      className="bg-white p-6 rounded-xl border border-outline-variant hover:border-secondary hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant">
                          <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold uppercase">
                            {art.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {art.readingTime}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="font-display font-bold text-base text-primary hover:text-secondary transition-colors line-clamp-2">
                            {art.title}
                          </h4>
                          <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                            {art.summary}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-5 mt-5 border-t border-outline-variant/50">
                        <div>
                          <p className="text-xs font-bold text-primary">{art.author}</p>
                          <p className="text-[10px] text-on-surface-variant font-medium">{art.designation}</p>
                        </div>
                        <button
                          onClick={() => setSelectedArticle(art)}
                          className="flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-all cursor-pointer group"
                        >
                          Read Article
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-on-surface-variant font-medium bg-white border border-outline-variant rounded-xl">
                    No CSI articles match your search parameters.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Selected Article Expanded View */
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-outline-variant space-y-6 animate-fadeIn">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Article Library
              </button>

              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded uppercase tracking-wider">
                  CSI COMMUNICATIONS • {selectedArticle.publishedDate} ISSUE
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-primary leading-tight max-w-4xl">
                  {selectedArticle.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 border-b border-outline-variant/60 pb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="text-xs font-bold text-primary">{selectedArticle.author}</p>
                      <p className="text-[9px] text-on-surface-variant font-medium uppercase tracking-wider">{selectedArticle.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Published: {selectedArticle.publishedDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedArticle.readingTime}</span>
                  </div>
                </div>
              </div>

              {/* Full Content paragraphs */}
              <div className="text-sm text-on-surface-variant leading-relaxed space-y-5 font-sans max-w-4xl text-justify pt-2">
                {selectedArticle.content.split('\n\n').map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Citations Box */}
              <div className="bg-surface-container-low/50 p-6 rounded-xl border border-outline-variant/60 space-y-3 max-w-4xl mt-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h5 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">References &amp; Academic Citations</h5>
                </div>
                <ol className="list-decimal pl-4 space-y-1.5 text-xs text-on-surface-variant font-mono">
                  {selectedArticle.citations.map((cite, idx) => (
                    <li key={idx} className="pl-1 leading-normal">{cite}</li>
                  ))}
                </ol>
              </div>

              <div className="pt-6 border-t border-outline-variant/60 flex justify-between items-center">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-surface-container-low border border-outline-variant text-primary hover:bg-surface-container px-5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                >
                  Return to Publications
                </button>
                <button
                  onClick={() => {
                    setWizardData(prev => ({
                      ...prev,
                      membershipType: 'Professional'
                    }));
                    setPortalTab('join');
                  }}
                  className="glow-btn bg-accent-cta text-white hover:bg-on-tertiary-container px-6 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                >
                  Join as Professional
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* C. DIVISIONS & SIGS TAB */}
      {portalTab === 'divisions' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display text-2xl font-bold text-primary">CSI Technical Divisions &amp; SIGs</h3>
            <p className="text-xs text-on-surface-variant">
              Explore the structured committees that govern research, evaluate standards, and coordinate local chapter activities across the nation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {csiDivisions.map((div, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-outline-variant space-y-4 shadow-sm hover:border-secondary transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-primary-container text-white px-2 py-0.5 rounded">
                      {div.code}
                    </span>
                    <h4 className="font-display font-bold text-base text-primary mt-2">{div.name}</h4>
                  </div>
                  <Cpu className="w-5 h-5 text-on-surface-variant" />
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {div.focus}
                </p>

                <div className="border-t border-outline-variant/50 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Division Chairperson:</span>
                    <span className="font-bold text-primary">{div.chair}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Affiliated SIG:</span>
                    <span className="font-mono text-secondary font-bold">{div.sig}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Key Active Project:</span>
                    <span className="font-sans text-on-surface-variant font-medium text-right max-w-xs">{div.projects}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SIGs Highlight Banner */}
          <div className="bg-primary-container text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/15 rounded-full blur-2xl"></div>
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] font-mono font-bold text-secondary-container tracking-widest block">SPECIAL INTEREST GROUPS</span>
              <h4 className="font-display font-bold text-lg sm:text-xl">Establishing Local CSI Special Interest Clubs</h4>
              <p className="text-xs text-on-primary-container leading-relaxed max-w-3xl">
                CSI members can petition the secretariat to form local Special Interest Groups (SIGs) inside their student branches. Standard templates exist for SIG-AI (Artificial Intelligence), SIG-CYBER (Cybersecurity), and SIG-BLOCKCHAIN. Affiliated institutions receive free technical kits and curated laboratory guidelines.
              </p>
              <button
                onClick={() => setPortalTab('join')}
                className="bg-secondary-container hover:bg-secondary text-primary hover:text-white py-2 px-4 rounded text-xs font-semibold cursor-pointer transition-all mt-2"
              >
                Inquire &amp; Register Branch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* D. VERIFIED MEMBER DIRECTORY TAB */}
      {portalTab === 'directory' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold text-primary">Verified CSI Member Directory</h3>
            <p className="text-xs text-on-surface-variant">
              Search and verify certified professional licenses, active student branch affiliates, and lifetime officers in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
            {/* Filter by Category */}
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1.5 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x">
              {['All', 'Life Member', 'Associate Member', 'Student Member'].map(type => (
                <button
                  key={type}
                  onClick={() => setDirectoryFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 snap-start transition-all cursor-pointer ${
                    directoryFilterType === type
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  {type === 'All' ? 'All Types' : type}
                </button>
              ))}
            </div>

            {/* Member Search input */}
            <div className="relative w-full sm:max-w-xs sm:ml-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input
                type="text"
                placeholder="Search by ID, Name, or College..."
                value={directorySearchQuery}
                onChange={(e) => setDirectorySearchQuery(e.target.value)}
                className="w-full bg-white text-xs border border-outline-variant rounded-lg pl-9 pr-4 py-2 outline-none focus:border-secondary transition-all"
              />
            </div>
          </div>

          {/* Directory Table/Grid */}
          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant border-b border-outline-variant font-mono text-[10px] uppercase">
                    <th className="p-4 font-bold">Member Identifier</th>
                    <th className="p-4 font-bold">Full Name</th>
                    <th className="p-4 font-bold">Affiliated Institution</th>
                    <th className="p-4 font-bold">Region &amp; Division</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map(mem => (
                      <tr key={mem.id} className="hover:bg-surface-container-low/45 transition-colors">
                        <td className="p-4 font-mono font-bold text-secondary">
                          {mem.id}
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-primary">{mem.name}</div>
                          <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">{mem.memberType}</div>
                        </td>
                        <td className="p-4 font-medium text-on-surface-variant">
                          {mem.affiliation}
                        </td>
                        <td className="p-4">
                          <div className="text-primary font-semibold">{mem.region} Region | {mem.state}</div>
                          <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">{mem.division}</div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            mem.status === 'Active'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-yellow-50 text-amber-700 border border-yellow-200'
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${mem.status === 'Active' ? 'bg-green-600' : 'bg-amber-500'}`}></span>
                            {mem.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-on-surface-variant font-medium font-sans">
                        No verified member matching "{directorySearchQuery}" was found.
                        <p className="text-[10px] text-on-surface-variant mt-1 font-mono">Tip: Register a profile via the "Join CSI" wizard, and see it instantly verify here!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card-Based List View (Visible on mobile only) */}
            <div className="block md:hidden divide-y divide-outline-variant/50">
              {filteredMembers.length > 0 ? (
                filteredMembers.map(mem => (
                  <div key={mem.id} className="p-4 space-y-3 hover:bg-surface-container-low/45 transition-colors">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="font-semibold text-primary text-sm">{mem.name}</div>
                        <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">{mem.memberType}</div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 ${
                        mem.status === 'Active'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-yellow-50 text-amber-700 border border-yellow-200'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${mem.status === 'Active' ? 'bg-green-600' : 'bg-amber-500'}`}></span>
                        {mem.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[9px] font-mono text-on-surface-variant uppercase">Identifier</p>
                        <p className="font-mono font-bold text-secondary mt-0.5">{mem.id}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-on-surface-variant uppercase">Region</p>
                        <p className="font-semibold text-primary mt-0.5">{mem.region} | {mem.state}</p>
                      </div>
                    </div>

                    <div className="text-xs">
                      <p className="text-[9px] font-mono text-on-surface-variant uppercase">Institution</p>
                      <p className="text-on-surface-variant font-medium mt-0.5">{mem.affiliation}</p>
                    </div>

                    <div className="text-xs">
                      <p className="text-[9px] font-mono text-on-surface-variant uppercase">Technical Division</p>
                      <p className="text-on-surface-variant mt-0.5">{mem.division}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 text-on-surface-variant font-medium font-sans">
                  No verified member matching "{directorySearchQuery}" was found.
                  <p className="text-[10px] text-on-surface-variant mt-2 font-mono">Tip: Register a profile via the "Join CSI" wizard, and see it instantly verify here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* E. CHAPTERS & STUDENT BRANCHES TAB */}
      {portalTab === 'chapters' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold text-primary tracking-tight">Active Chapters &amp; Student Branches</h3>
              <p className="text-sm text-on-surface-variant">Find active CSI and AICAIML councils operating near you.</p>
            </div>
            
            <div className="flex overflow-x-auto pb-1.5 sm:pb-0 gap-1.5 w-full sm:w-auto shrink-0 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
              {['All', 'North', 'South', 'West', 'East', 'Central'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setRegionFilter(reg)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 snap-start ${
                    regionFilter === reg
                      ? 'bg-primary text-white'
                      : 'bg-white text-on-surface-variant border border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Chapters Grid with Search Filter */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 flex items-center gap-3">
            <Search className="text-on-surface-variant w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Filter chapters by State, Chairperson, or Branch Name..."
              value={chapterSearchQuery}
              onChange={(e) => setChapterSearchQuery(e.target.value)}
              className="w-full bg-white text-sm border border-outline-variant rounded-lg px-3 py-2 outline-none focus:border-secondary transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChapters.length > 0 ? (
              filteredChapters.map(chap => (
                <div key={chap.id} className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm space-y-4 hover:border-secondary transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded uppercase">
                        {chap.type}
                      </span>
                      <h4 className="font-display font-bold text-base text-primary mt-2">{chap.name}</h4>
                    </div>
                    <Landmark className="w-5 h-5 text-on-surface-variant" />
                  </div>

                  <div className="space-y-2 text-xs text-on-surface-variant border-t border-outline-variant/50 pt-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      <span>Region: {chap.region} | State: {chap.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-primary" />
                      <span>Chair: {chap.chairperson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-on-tertiary-container" />
                      <span className="hover:underline cursor-pointer">{chap.contactEmail}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-surface-container-low p-2 rounded text-xs font-mono">
                    <span className="text-on-surface-variant">Active Members:</span>
                    <span className="font-bold text-primary">{chap.membersCount}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-on-surface-variant font-medium bg-white border border-outline-variant rounded-xl">
                No regional chapters found matching your search.
              </div>
            )}
          </div>
        </div>
      )}

      {/* F. JOIN CSI WIZARD TAB */}
      {portalTab === 'join' && (
        <div className="space-y-12 animate-fadeIn">
          {/* Tiers Columns */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-primary text-center">Flexible Membership Categories</h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-outline-variant p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary">{benefit.tier}</h3>
                      <p className="text-2xl font-display font-extrabold text-secondary mt-2">{benefit.cost}</p>
                    </div>
                    
                    <ul className="space-y-3 border-t border-outline-variant/60 pt-6">
                      {benefit.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex gap-2.5 text-xs text-on-surface-variant leading-relaxed">
                          <span className="text-secondary font-bold shrink-0 mt-0.5">✓</span>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => {
                      setWizardData(prev => ({
                        ...prev,
                        membershipType: benefit.tier.split(' ')[0]
                      }));
                      setWizardStep(1);
                      setIsWizardComplete(false);
                      const wizardEl = document.getElementById('wizard-form-start');
                      if (wizardEl) wizardEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-8 w-full border border-primary text-primary hover:bg-surface-container-low py-2.5 rounded-lg font-sans font-semibold text-sm transition-all cursor-pointer"
                  >
                    Select {benefit.tier.split(' ')[0]}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Wizard Form */}
          <section id="wizard-form-start" className="bg-surface-container-low border border-outline-variant rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl font-bold text-primary">Interactive Registration Wizard</h3>
              <p className="text-sm text-on-surface-variant">Complete your formal CSI credentials registration. Re-checking your profile is fully supported.</p>
            </div>

            {/* Steps tracker */}
            <div className="flex items-center justify-center gap-4 text-xs font-mono max-w-sm mx-auto">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${wizardStep >= 1 ? 'bg-primary text-white' : 'bg-outline-variant text-on-surface-variant'}`}>1</div>
              <div className="h-0.5 bg-outline-variant flex-grow"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${wizardStep >= 2 ? 'bg-primary text-white' : 'bg-outline-variant text-on-surface-variant'}`}>2</div>
              <div className="h-0.5 bg-outline-variant flex-grow"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${wizardStep >= 3 ? 'bg-primary text-white' : 'bg-outline-variant text-on-surface-variant'}`}>3</div>
            </div>

            {/* Wizard Form Frame */}
            {!isWizardComplete ? (
              <div className="space-y-6">
                
                {/* Step 1: Personal Details */}
                {wizardStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="font-display font-bold text-base text-primary">Step 1: Contact Information</h4>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase">Full Legal Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Anand Sharma"
                          value={wizardData.fullName}
                          onChange={(e) => setWizardData({...wizardData, fullName: e.target.value})}
                          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase">Email Address</label>
                        <input
                          type="email"
                          placeholder="anand@example.com"
                          value={wizardData.email}
                          onChange={(e) => setWizardData({...wizardData, email: e.target.value})}
                          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase">Institution / Employer Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. BITS Pilani or Tech Mahindra"
                        value={wizardData.institutionName}
                        onChange={(e) => setWizardData({...wizardData, institutionName: e.target.value})}
                        className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Select Tier */}
                {wizardStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="font-display font-bold text-base text-primary">Step 2: Affiliation Region</h4>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { key: 'Student', label: 'Student Member', rate: '₹1,500/Yr' },
                        { key: 'Professional', label: 'Professional Member', rate: '₹3,500/Yr' },
                        { key: 'Corporate', label: 'Corporate Tier', rate: '₹15,000/Yr' }
                      ].map(tier => (
                        <div
                          key={tier.key}
                          onClick={() => setWizardData({...wizardData, membershipType: tier.key})}
                          className={`p-5 rounded-xl border cursor-pointer text-center space-y-2 transition-all ${
                            wizardData.membershipType === tier.key
                              ? 'border-secondary bg-secondary/5 font-semibold ring-1 ring-secondary'
                              : 'border-outline-variant bg-white hover:bg-surface-container'
                          }`}
                        >
                          <p className="text-sm font-display text-primary">{tier.label}</p>
                          <p className="text-lg font-bold text-secondary">{tier.rate}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase">State Affiliation</label>
                        <input
                          type="text"
                          placeholder="e.g. Karnataka"
                          value={wizardData.state}
                          onChange={(e) => setWizardData({...wizardData, state: e.target.value})}
                          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold text-on-surface-variant uppercase">National Council Zone</label>
                        <select
                          value={wizardData.region}
                          onChange={(e) => setWizardData({...wizardData, region: e.target.value as any})}
                          className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary"
                        >
                          <option value="North">North Region</option>
                          <option value="South">South Region</option>
                          <option value="East">East Region</option>
                          <option value="West">West Region</option>
                          <option value="Central">Central Region</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment select */}
                {wizardStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    <h4 className="font-display font-bold text-base text-primary">Step 3: Verification Payment Simulation</h4>
                    <p className="text-xs text-on-surface-variant">Complete secure sandbox validation with standard digital processors.</p>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      {['UPI Scan', 'Net Banking', 'Credit / Debit Card'].map(pMethod => (
                        <div
                          key={pMethod}
                          onClick={() => setWizardData({...wizardData, paymentMethod: pMethod})}
                          className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                            wizardData.paymentMethod === pMethod
                              ? 'border-secondary bg-secondary/5 font-semibold'
                              : 'border-outline-variant bg-white hover:bg-surface-container'
                          }`}
                        >
                          <p className="text-xs font-sans text-primary">{pMethod}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3 text-xs text-amber-800">
                      <ShieldAlert className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        This registration wizard acts as a secure academic simulation. No real currency will be charged. Instantly establishes your official CSI digital ID within our directory state.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/50">
                  <button
                    onClick={handlePrevStep}
                    disabled={wizardStep === 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-outline text-primary hover:bg-surface-container-low transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    onClick={handleNextStep}
                    disabled={wizardStep === 1 && (!wizardData.fullName || !wizardData.email || !wizardData.institutionName)}
                    className="glow-btn bg-primary hover:bg-primary-container text-white flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    {wizardStep === 3 ? 'Complete Verification' : 'Next Step'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              /* Wizard Success Frame */
              <div className="text-center space-y-6 animate-fadeIn py-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto text-secondary">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xl text-primary">CSI Credentials Generated!</h4>
                  <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                    Your registration has been processed. You can now use the "Verified Member Directory" tab to look up your profile.
                  </p>
                </div>

                <div className="bg-white border border-outline-variant rounded-2xl p-6 max-w-md mx-auto text-left shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-outline-variant">
                    <span className="font-mono text-[9px] font-bold text-secondary tracking-widest">OFFICIAL COMPUTER SOCIETY OF INDIA LICENSE</span>
                    <span className="font-mono text-xs text-primary font-bold">{assignedId}</span>
                  </div>
                  
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-medium">LICENSED HOLDER</p>
                      <p className="font-bold text-primary">{wizardData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-medium">AFFILIATED INSTITUTION</p>
                      <p className="font-sans text-on-surface-variant">{wizardData.institutionName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[10px] text-on-surface-variant font-medium">REGION ZONE</p>
                        <p className="font-semibold text-primary">{wizardData.region} Region ({wizardData.state})</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-on-surface-variant font-medium">TIER STATUS</p>
                        <p className="font-mono text-xs font-bold text-secondary uppercase">{wizardData.membershipType} Member</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => {
                      setDirectorySearchQuery(wizardData.fullName);
                      setPortalTab('directory');
                    }}
                    className="bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1"
                  >
                    Lookup My ID in Directory
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setWizardStep(1);
                      setWizardData({
                        fullName: '',
                        email: '',
                        institutionName: '',
                        membershipType: 'Student',
                        paymentMethod: 'UPI',
                        state: 'Delhi',
                        region: 'North'
                      });
                      setIsWizardComplete(false);
                    }}
                    className="border border-outline hover:border-primary text-primary px-6 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    Register Another Profile
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

    </div>
  );
}
