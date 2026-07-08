import { Certification, ResearchPaper, Chapter, STEMKit } from './types';

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'saia',
    title: 'Senior AI Architect (SAIA)',
    code: 'AICAIML-ARCH-701',
    level: 'Advanced',
    category: 'Architecture & Design',
    duration: '48 Hours',
    mode: 'Hybrid',
    cost: '₹45,000',
    bestSeller: true,
    description: 'The gold standard for professionals leading enterprise AI transformations. Covers LLM orchestration, scalable machine learning pipelines, multi-agent architectures, and ethical AI deployment frameworks.',
    curriculum: [
      'Enterprise LLM Engineering & Retrieval-Augmented Generation (RAG)',
      'High-Throughput ML System Design & Inference Serving',
      'Advanced Model Fine-Tuning & Parameter-Efficient Transfer Learning',
      'Multi-Agent System Choreography & Autonomic Computing',
      'Responsible AI Governance, Privacy-Preserving ML, & Trustworthy Systems'
    ],
    audience: 'Senior Software Engineers, Technical Architects, Data Engineering Leads with 5+ years of experience.',
    enrolledCount: '1.2k+ enrolled this month'
  },
  {
    id: 'mlops',
    title: 'MLOps Specialist (MOS)',
    code: 'AICAIML-OPS-502',
    level: 'Specialist',
    category: 'Operations',
    duration: '36 Hours',
    mode: 'Self-Paced / Guided',
    cost: '₹32,000',
    bestSeller: true,
    description: 'Master the continuous integration, continuous delivery, and monitoring of production-grade Machine Learning pipelines. Essential for scaling AI implementations across cloud environments.',
    curriculum: [
      'Data & Feature Store Management (Tecton, Feast)',
      'CI/CD Pipelines for ML with GitHub Actions & GitLab CI',
      'Model Registry, Tracking, & Auditing with MLflow / Weights & Biases',
      'Kubernetes Orchestration & KFServing / Triton Inference Server',
      'Real-Time Concept Drift Detection & Alerting Architectures'
    ],
    audience: 'DevOps Engineers, ML Engineers, Cloud Architects, and Database Administrators.',
    enrolledCount: '850+ enrolled this month'
  },
  {
    id: 'dsl',
    title: 'Data Science Lead (DSL)',
    code: 'AICAIML-DS-603',
    level: 'Advanced',
    category: 'Analytics & Strategy',
    duration: '40 Hours',
    mode: 'Live Virtual',
    cost: '₹38,000',
    description: 'Designed for professionals transitioning from technical analysis to strategic leadership roles. Bridges the gap between raw statistical data modeling and business value optimization.',
    curriculum: [
      'Translating Strategic Goals into Quantifiable Data Science OKRs',
      'Advanced Statistical Modeling, Causal Inference, & Experimentation',
      'Managing Multi-disciplinary Data Science Teams & Agile Data Lifecycles',
      'Explainable AI (XAI) Frameworks for Non-technical Executive Stakeholders',
      'ROI Auditing for Enterprise-wide Predictive & Generative Workflows'
    ],
    audience: 'Senior Data Analysts, Data Scientists, and Business Analysts aiming for Management.',
    enrolledCount: '520+ enrolled this month'
  },
  {
    id: 'aif',
    title: 'AI Foundations Certificate (AFC)',
    code: 'AICAIML-FND-101',
    level: 'Foundation',
    category: 'General Awareness',
    duration: '24 Hours',
    mode: 'Self-Paced',
    cost: '₹12,500',
    description: 'The fundamental starting point for non-technical managers, product managers, and entry-level practitioners. Understand the core capabilities and limits of modern generative and predictive models.',
    curriculum: [
      'Introduction to Machine Learning, Deep Learning, & Generative AI',
      'Understanding Neural Networks, Transformers, & Large Language Models',
      'Practical Prompt Engineering & AI-Assisted Workplace Productivity',
      'Data Literacy: How to Interpret Confusion Matrices and Model Statistics',
      'Understanding Privacy, Bias, & Intellectual Property in the AI Era'
    ],
    audience: 'Product Managers, Business Executives, Marketing Specialists, and Students of all streams.',
    enrolledCount: '2.4k+ enrolled this month'
  },
  {
    id: 'cve',
    title: 'Computer Vision Engineer (CVE)',
    code: 'AICAIML-CV-504',
    level: 'Specialist',
    category: 'Computer Vision',
    duration: '32 Hours',
    mode: 'Hybrid',
    cost: '₹28,000',
    description: 'Comprehensive specialization covering image processing, spatial geometry, and deep learning for object detection, segmentations, and generative visual tasks.',
    curriculum: [
      'Classic Image Processing & Spatial Conversions with OpenCV',
      'CNN Architectures, ResNet, EfficientNet, & Vision Transformers (ViTs)',
      'YOLO Frameworks for Real-Time Single-Stage Object Detection',
      'Image Segmentation (U-Net, Mask R-CNN) & Multi-Object Tracking',
      'Generative Visual Models: Stable Diffusion & GAN Architectures'
    ],
    audience: 'Embedded Engineers, Robotics Hobbyists, and Software Developers.',
    enrolledCount: '410+ enrolled this month'
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'p1',
    title: 'Sparsity and Compression in Large-Scale Foundation Models',
    authors: 'Sarah Jenkins, PhD; Elena Vance, PhD',
    journal: 'AICAIML Transactions on AI',
    issue: 'Vol. 12, Issue 4',
    publishedYear: 2024,
    reads: 4210,
    category: 'Foundation Models',
    abstract: 'In this work, we propose a novel structured pruning framework that achieves up to a 40% reduction in parameter density in multi-billion parameter transformer models while preserving over 98% of zero-shot task performance. We demonstrate these gains across both text understanding and generative audio domains, showcasing substantial hardware cost reductions.'
  },
  {
    id: 'p2',
    title: 'Real-time Volumetric Rendering in Autonomous Drone Navigation',
    authors: 'Marcus Thorne, Prof.; Robert Lang, PhD',
    journal: 'AICAIML Transactions on AI',
    issue: 'Vol. 12, Issue 4',
    publishedYear: 2024,
    reads: 3120,
    category: 'Computer Vision / Robotics',
    abstract: 'This paper outlines an optimized Neural Radiance Field (NeRF) pipeline executed server-side to provide fast 3D spatial reconstructions for unmanned aerial systems operating in GPS-denied environments. By utilising custom edge accelerators and sparse voxel trees, we achieve 45 FPS reconstructions.'
  },
  {
    id: 'p3',
    title: 'Optimizing Attention Mechanisms in Low-Resource Languages',
    authors: 'Elena Vance, PhD',
    journal: 'AICAIML Transactions on AI',
    issue: 'Vol. 12, Issue 3',
    publishedYear: 2024,
    reads: 6840,
    category: 'NLP',
    abstract: 'We present a comparative study on tokenisation efficiency and attention redistribution for highly morphologically rich but low-resource languages of South Asia. Our hybrid subword vocabulary models show a 3.4x throughput increase over standard GPT-style tokenisers.'
  },
  {
    id: 'p4',
    title: 'Multi-Agent Coordination in Competitive Physical Simulators',
    authors: 'Robert Lang, PhD; Amit Verma, MTech',
    journal: 'AICAIML Transactions on AI',
    issue: 'Vol. 11, Issue 2',
    publishedYear: 2023,
    reads: 2980,
    category: 'Reinforcement Learning',
    abstract: 'We apply a modified multi-agent deep deterministic policy gradient (MADDPG) model to teach simulated wheeled robotic agents collaborative spatial navigation, overcoming hurdles with high-variance rewards in dynamic physical workspaces.'
  }
];

export const CHAPTERS_DATA: Chapter[] = [
  { id: 'ch1', name: 'Delhi NCR Region Chapter', region: 'North', state: 'Delhi', chairperson: 'Dr. Vivek Kumar', contactEmail: 'delhi.chapter@icaiml.org', membersCount: 1450, type: 'Professional' },
  { id: 'ch2', name: 'Bengaluru Tech Corridor Chapter', region: 'South', state: 'Karnataka', chairperson: 'Dr. S. Subramanian', contactEmail: 'blr.chapter@icaiml.org', membersCount: 2280, type: 'Professional' },
  { id: 'ch3', name: 'IIT Madras Student Branch', region: 'South', state: 'Tamil Nadu', chairperson: 'Prof. Vignesh Ram', contactEmail: 'iitm.branch@icaiml.org', membersCount: 650, type: 'Student Branch' },
  { id: 'ch4', name: 'Mumbai Financial AI Chapter', region: 'West', state: 'Maharashtra', chairperson: 'Meera Deshmukh, Lead Researcher', contactEmail: 'mumbai.chapter@icaiml.org', membersCount: 1100, type: 'Professional' },
  { id: 'ch5', name: 'Hyderabad Cyberabad Chapter', region: 'South', state: 'Telangana', chairperson: 'Dr. K. Srinivas Rao', contactEmail: 'hyd.chapter@icaiml.org', membersCount: 1620, type: 'Professional' },
  { id: 'ch6', name: 'Kolkata academic Hub Chapter', region: 'East', state: 'West Bengal', chairperson: 'Dr. Arnab Sen', contactEmail: 'kolkata.chapter@icaiml.org', membersCount: 780, type: 'Professional' },
  { id: 'ch7', name: 'BITS Pilani Student Branch', region: 'Central', state: 'Rajasthan', chairperson: 'Prof. Aditya Sharma', contactEmail: 'bits.branch@icaiml.org', membersCount: 420, type: 'Student Branch' }
];

export const STEM_KITS_DATA: STEMKit[] = [
  {
    id: 'kit1',
    name: 'AICAIML Core Robot Controller & Gripper',
    category: 'Robotics',
    description: 'High-precision 6-axis manipulator arm kit with embedded microcontroller compatible with ROS2 (Robot Operating System) and Python script executors.',
    unitCost: 18500,
    requiredForLevel: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    imagePlaceholder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArUO9M3gYthDqmBsHC47TO0iWBUUQxD25XX15_luOJ7pyl2fw3FaAmSM27vbrGjnQSj0VsS40Wrj4kIesXFxqFoBeVNqYFFv9Qcdy7-rrbYEe58YGNAZiZW376gDXdBwnQfCBTV97sVaFXGK9q7zWVTEccz0howC2MB_Ky4eVXQHOjbrg785R0PJof0pSKz1GHLzfit2BY1cLdWZ5k0Jkp3na88-6OhmHyt-4Bx23Q0DIy7QLNAgaOJ_O7FiFfdvIkFZfu3o6CH10x'
  },
  {
    id: 'kit2',
    name: 'Jetson Nano Vision Processing Module',
    category: 'AI Workstations',
    description: 'Dedicated edge GPU computing module for running local convolutional networks, semantic segmentation, and real-time inference on 1080p cameras.',
    unitCost: 22000,
    requiredForLevel: ['Silver', 'Gold', 'Platinum'],
    imagePlaceholder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA96Tk4uem01h7rup2KBpbNL4KULl0fETi2wljL7sVntQIGJYqVaoElMw3CZzjW7Qyz8P7gVSyQNPKNJ7kuwVX1v2BG_6KKgmFO4H6c4m1lc4Fxu1UWumYP-vA-ikDwQ3-ylHRGpHkD1ifI3hGQpRzvvS4KjP7qUnmOWK5fBh4zz0NqZFyLxJiEvOhaZP8WMHS3fCNEipNTYPbZ2LJkCUTJTjlheZeQWNOmyfbL5xfy6O39u9dshx2JLxZbVGnQMhaLHue-lFaFb00H'
  },
  {
    id: 'kit3',
    name: 'Industrial Smart IoT Sensor Hub',
    category: 'IoT & Cloud',
    description: 'An array of environmental, magnetic, and ultrasonic transceiver boards for conducting telemetry streams via MQTT to cloud brokers.',
    unitCost: 8400,
    requiredForLevel: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    imagePlaceholder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrYaYGoTy1o9qZGxZ2rD0OtXdvYX32PuONotS1YGcHbX6JjWXCcxBGmDPlQSPYAu3b9XNC6QuiUYHbK6fPXZUB7Xsk9EiqwnFGJpNPWZD1PxrGuNCiZ-3q2AcDr3QXmfDRJnrWshV_6T7ZAtJCSCD1gFwO1Jwn1MSEXCRHHcAub2Q_DBOsLuubh9yxnu_j5MxUNVO6GcBFdGT1prVPC-VghzkXHliLC2ruZfZ79GZQQPYkYnOxI6XoUdlvvzIyypUeAcFPz1guaXlb'
  },
  {
    id: 'kit4',
    name: 'Unmanned Aerial Survey Micro-Drone',
    category: 'Drones & UAV',
    description: 'Micro quadcopter assembly with solid-state LiDAR scanner and auto-stabilization routines, perfect for spatial navigation challenges.',
    unitCost: 35000,
    requiredForLevel: ['Gold', 'Platinum'],
    imagePlaceholder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3j0f4WTWrjMika3o6pWfO_nsHC-i3cvqElMw15smX1XdhvZf_wszx8ExIXMIQcCWamVZ0wEYlx8QGQ7ICRO1CMvH34DEuDV130mw_sf3-uBjFR8XPaRkurU8mKvlf1SzbVYq0p1DgqNMrOte_ckfFCNGbzKnirsOVWYjA06WPgVxtsKxhFGDaG7gHPpJHOk6qfo3C1aq4DLfFBDW3i0CTuyAeA1mNjQwupMfMvtRQ6El9Cm99v3Lbr_n91CotRz6ViXhsQ5klBpPt'
  }
];
