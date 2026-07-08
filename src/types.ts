export interface Certification {
  id: string;
  title: string;
  code: string;
  level: 'Advanced' | 'Specialist' | 'Foundation';
  category: string;
  duration: string;
  mode: string;
  cost: string;
  bestSeller?: boolean;
  description: string;
  curriculum: string[];
  audience: string;
  enrolledCount: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  issue: string;
  publishedYear: number;
  reads: number;
  category: string;
  abstract: string;
  pdfUrl?: string;
}

export interface Chapter {
  id: string;
  name: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  state: string;
  chairperson: string;
  contactEmail: string;
  membersCount: number;
  type: 'Professional' | 'Student Branch';
}

export interface STEMKit {
  id: string;
  name: string;
  category: 'Robotics' | 'AI Workstations' | 'IoT & Cloud' | 'Drones & UAV';
  description: string;
  unitCost: number;
  requiredForLevel: ('Bronze' | 'Silver' | 'Gold' | 'Platinum')[];
  imagePlaceholder: string;
}

export interface LabConfig {
  institutionName: string;
  selectedLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  additionalKits: { [kitId: string]: number };
  withInstallationSupport: boolean;
}
