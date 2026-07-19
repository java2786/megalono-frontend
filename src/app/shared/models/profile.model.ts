export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface ResourceLink {
  id?: string;
  type: string; // 'github' | 'youtube' | 'swagger' | 'pdf' | 'slides' | 'documentation' | 'demo' | 'dockerCompose' | 'architectureDiagram' | 'erDiagram' | 'download' | 'npm' | 'maven' | 'cloudDeployment' | string
  title?: string;
  url: string;
  icon?: string;
  description?: string;
}

export interface EngineeringProofItem {
  id?: string;
  type: string; // 'architectureDiagram' | 'swagger' | 'githubRepository' | 'deployment' | 'cicd' | 'docker' | 'nginx' | 'redis' | 'monitoring' | 'databaseSchema' | 'erDiagram' | 'performanceReport' | 'screenshots' | string
  title: string;
  description?: string;
  url?: string;
  thumbnail?: string;
}

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface ContentMetadata {
  estimatedReadingTime?: string;
  searchKeywords?: string[];
  [key: string]: any;
}

export interface BaseContentItem {
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  level?: string;
  technologies?: string[];
  tags?: string[];
  resources?: ResourceLink[] | WorkshopResources; // Array of links or legacy map
  proof?: EngineeringProofItem[];
  seo?: SEOConfig;
  metadata?: ContentMetadata;
  status?: ContentStatus;
  priority?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkshopResources {
  video?: string;
  youtube?: string;
  github?: string;
  slides?: string;
  sampleProject?: string;
  liveDemo?: string;
  demo?: string;
  documentation?: string;
  downloads?: string;
  download?: string;
  awsS3?: string;
  [key: string]: string | undefined;
}

export interface KnowledgeHubItem extends BaseContentItem {
  duration?: string;
  learningObjectives?: string[];
  url?: string;        // Legacy property support
  difficulty?: string; // Legacy property support
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
  id?: string;
  slug?: string;
  title: string;
  businessImpact?: string;
  problem?: string;
  solution?: string;
  sections?: StudySection[];
  stack: string[];
  role?: string;
  industry?: string;
  client?: string;
  duration?: string;
  teamSize?: string;
  responsibilities?: string[];
  achievements?: string[];
  metrics?: string[];
  artifacts?: ResourceLink[];
  proof?: EngineeringProofItem[];
  status?: ContentStatus;
  priority?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileData {
  about: {
    name: string;
    title: string;
    summary: string;
    subtitle?: string;
    location?: string;
  };
  socialLinks?: Record<string, string>;
  services: ServicePillar[];
  caseStudies: CaseStudy[];
  knowledgeHub: KnowledgeHub;
}
