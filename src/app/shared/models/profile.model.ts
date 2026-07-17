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
  problem?: string;   // Optional: For items using problem/solution layout
  solution?: string;  // Optional
  sections?: StudySection[]; // Optional: For items using nested section array blocks
  stack: string[];
}

export interface VideoItem {
  title: string;
  duration: string;
  url: string;
  category: string;
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


