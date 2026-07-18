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
  video?: string;
  github?: string;
  slides?: string;
  sampleProject?: string;
  liveDemo?: string;
  documentation?: string;
  downloads?: string;
  [key: string]: string | undefined;
}

export interface VideoItem {
  title: string;
  duration?: string;
  url?: string;
  category?: string;
  description?: string;
  thumbnail?: string;
  difficulty?: string;
  technologies?: string[];
  learningObjectives?: string[];
  resources?: WorkshopResources;
}

export interface ProfileData {
  about: {
    name: string;
    title: string;
    summary: string;
  };
  services: ServicePillar[];
  caseStudies: CaseStudy[];
  videoLibrary: VideoItem[];
}



