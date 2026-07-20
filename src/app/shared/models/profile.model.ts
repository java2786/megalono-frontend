import { ManageableContent, ContentStatus } from '../utils/content.utility';

export type { ManageableContent, ContentStatus };

export interface ResourceLink extends ManageableContent {
  id?: string;
  type: string; // 'github' | 'youtube' | 'swagger' | 'pdf' | 'slides' | 'documentation' | 'demo' | 'dockerCompose' | 'architectureDiagram' | 'erDiagram' | 'download' | 'npm' | 'maven' | 'cloudDeployment' | string
  title?: string;
  url: string;
  icon?: string;
  description?: string;
}

export interface SocialLinkItem extends ManageableContent {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface ConsultingExpertiseItem extends ManageableContent {
  id: string;
  title: string;
  description?: string;
}

export interface ProofLink extends ManageableContent {
  id?: string;
  type: string; // 'github' | 'swagger' | 'youtube' | 'documentation' | 'slides' | 'demo' | string
  title: string;
  url: string;
}

export interface ProofArtifact extends ManageableContent {
  id?: string;
  type: string; // 'architecture' | 'deployment' | 'docker' | 'swagger' | 'database' | 'performance' | 'infrastructure' | 'cicd' | 'security' | 'monitoring' | 'configuration' | 'diagram' | string
  title: string;
  thumbnail?: string;
  url?: string;
}

export interface EngineeringEvidenceItem extends ManageableContent {
  id: string;
  title: string;
  description?: string;
  category?: string;
  verified?: boolean;
  technologies?: string[];
  links?: ProofLink[];
  artifacts?: ProofArtifact[];
  relatedCaseStudies?: string[];
  relatedWorkshops?: string[];
}

export interface EngineeringEvidenceData {
  title?: string;
  description?: string;
  diagramsTitle?: string;
  reposTitle?: string;
  swaggerTitle?: string;
  repoButtonText?: string;
  swaggerButtonText?: string;
  evidence?: EngineeringEvidenceItem[];
  [key: string]: any;
}

// Legacy interfaces retained for backward compatibility
export interface EngineeringProofItem extends ManageableContent {
  id?: string;
  type: string;
  title: string;
  description?: string;
  url?: string;
  thumbnail?: string;
}

export interface ArchitectureDiagram extends ManageableContent {
  id?: string;
  title: string;
  description?: string;
  thumbnail?: string;
  fullImage?: string;
  url?: string;
  technologies?: string[];
  category?: string;
}

export interface GitHubRepositoryProof extends ManageableContent {
  id?: string;
  repositoryName: string;
  description?: string;
  url: string;
  technologies?: string[];
}

export interface SwaggerApiProof extends ManageableContent {
  id?: string;
  title: string;
  description?: string;
  url: string;
  service?: string;
  version?: string;
}

export interface EngineeringProofData {
  architectureDiagrams?: ArchitectureDiagram[];
  githubRepositories?: GitHubRepositoryProof[];
  swaggerApis?: SwaggerApiProof[];
  [key: string]: any;
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

export interface BaseContentItem extends ManageableContent {
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  level?: string;
  technologies?: string[];
  tags?: string[];
  resources?: ResourceLink[] | WorkshopResources;
  proof?: EngineeringProofItem[];
  seo?: SEOConfig;
  metadata?: ContentMetadata;
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
  title?: string;
  learningObjectivesLabel?: string;
  engineeringProofLabel?: string;
  workshops: KnowledgeHubItem[];
  resources: KnowledgeHubItem[];
  architectureGuides: KnowledgeHubItem[];
  sampleProjects: KnowledgeHubItem[];
  downloads: KnowledgeHubItem[];
  codeTemplates: KnowledgeHubItem[];
  cheatSheets: KnowledgeHubItem[];
  learningPaths: KnowledgeHubItem[];
}

export interface ServicePillar extends ManageableContent {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface StatisticItem extends ManageableContent {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

export interface StudySection extends ManageableContent {
  heading: string;
  content: string;
}

export interface CaseStudy extends ManageableContent {
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
  createdAt?: string;
  updatedAt?: string;
}

export interface CaseStudiesConfig {
  title?: string;
  businessImpactLabel?: string;
}

export interface NavigationConfig {
  brandName?: string;
  brandSubtitle?: string;
  consultingTitle?: string;
  socialTitle?: string;
  aboutTitle?: string;
  platformName?: string;
  platformSubtitle?: string;
  engineeredBy?: string;
  copyrightHolder?: string;
}

export interface AboutData {
  name: string;
  title: string;
  subtitle?: string;
  summary: string;
  badgeText?: string;
  location?: string;
  email?: string;
  primaryActionText?: string;
  secondaryActionText?: string;
  resumeUrl?: string;
  servicesTitle?: string;
}

export interface ProfileData {
  about: AboutData;
  navigation?: NavigationConfig;
  caseStudiesConfig?: CaseStudiesConfig;
  socialLinks?: SocialLinkItem[] | Record<string, string>;
  services: ServicePillar[];
  consultingExpertise?: ConsultingExpertiseItem[];
  statistics?: StatisticItem[];
  caseStudies: CaseStudy[];
  knowledgeHub: KnowledgeHub;
  engineeringEvidence?: EngineeringEvidenceData;
  engineeringProof?: EngineeringProofData;
}
