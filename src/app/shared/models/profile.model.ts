export interface ServicePillar {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface StudySection {
  heading: string;
  content: string;
}

export interface CaseStudy {
  title: string;
  businessImpact?: string;
  problem?: string;   // Optional: For items using problem/solution layout
  solution?: string;  // Optional
  sections?: StudySection[]; // Optional: For items using nested section array blocks
  stack: string[];
}

export interface WorkshopResources {
  video?: string;          // Legacy compatibility
  youtube?: string;        // Added
  github?: string;
  slides?: string;
  sampleProject?: string;
  liveDemo?: string;       // Legacy compatibility
  demo?: string;           // Added
  documentation?: string;
  downloads?: string;      // Legacy compatibility
  download?: string;       // Added
  awsS3?: string;
  [key: string]: string | undefined;
}

export interface KnowledgeHubItem {
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  difficulty?: string;     // Legacy compatibility
  duration?: string;
  thumbnail?: string;
  technologies?: string[];
  learningObjectives?: string[];
  resources?: WorkshopResources;
  featured?: boolean;
  published?: boolean;
  tags?: string[];
  url?: string;            // Legacy compatibility
}

export interface KnowledgeHub {
  workshops: KnowledgeHubItem[];
  resources: KnowledgeHubItem[];
  architectureGuides: KnowledgeHubItem[];
  sampleProjects: KnowledgeHubItem[];
  downloads: KnowledgeHubItem[];
  codeTemplates: KnowledgeHubItem[];
  cheatSheets: KnowledgeHubItem[];
  learningPaths: KnowledgeHubItem[];
}

export interface ProfileData {
  about: {
    name: string;
    title: string;
    summary: string;
  };
  services: ServicePillar[];
  caseStudies: CaseStudy[];
  knowledgeHub: KnowledgeHub;
}



