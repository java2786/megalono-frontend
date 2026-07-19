import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileData, KnowledgeHubItem, ResourceLink, EngineeringProofItem } from '../../shared/models/profile.model';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="workshop-container" *ngIf="profile() as data" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem;">
      <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 2rem; border-left: 4px solid var(--accent-color); padding-left: 0.75rem; color: var(--text-main);">Technical Workshops</h2>
      
      <!-- SECTION 1: Featured Video Workshops -->
      <section *ngIf="videoWorkshops().length > 0" style="margin-bottom: 4rem;">
       
        <div class="workshop-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: start;">
          <article *ngFor="let workshop of videoWorkshops()" style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 0.75rem; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
            
            <!-- Thumbnail (Lazy Loaded) -->
            <img *ngIf="workshop.thumbnail" [src]="workshop.thumbnail" [alt]="workshop.title" loading="lazy" 
                 style="width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1.25rem; display: block;" />
            
            <!-- Metadata (Duration, Category, Level) -->
            <div style="font-size: 0.8rem; font-weight: 500; opacity: 0.7; margin-bottom: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
              <span *ngIf="workshop.category">📁 {{workshop.category}}</span>
              <span *ngIf="workshop.category && (workshop.duration || workshop.level || workshop.difficulty)">•</span>
              <span *ngIf="workshop.duration">⏱️ {{workshop.duration}}</span>
              <span *ngIf="workshop.duration && (workshop.level || workshop.difficulty)">•</span>
              <span *ngIf="workshop.level || workshop.difficulty">🎯 {{workshop.level || workshop.difficulty}}</span>
            </div>

            <!-- Title -->
            <h4 style="margin: 0 0 0.75rem 0; font-size: 1.2rem; font-weight: 700; color: var(--text-main); line-height: 1.3;">
              {{workshop.title}}
            </h4>

            <!-- Short Description -->
            <p *ngIf="workshop.description" style="font-size: 0.875rem; opacity: 0.8; margin: 0 0 1.25rem 0; line-height: 1.5;">
              {{workshop.description}}
            </p>

            <!-- Technologies -->
            <div *ngIf="workshop.technologies && workshop.technologies.length > 0" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
              <span *ngFor="let tech of workshop.technologies" 
                    style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 0.25rem; font-weight: 600; color: var(--text-main);">
                {{tech}}
              </span>
            </div>

            <!-- Learning Objectives -->
            <div *ngIf="workshop.learningObjectives && workshop.learningObjectives.length > 0" style="margin-bottom: 1.5rem; margin-top: auto;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">
                Learning Objectives
              </span>
              <ul style="margin: 0; padding-left: 1.1rem; font-size: 0.8rem; opacity: 0.85; line-height: 1.45; display: flex; flex-direction: column; gap: 0.35rem;">
                <li *ngFor="let obj of workshop.learningObjectives">{{obj}}</li>
              </ul>
            </div>

            <!-- Dynamic Proof Items (if present) -->
            <div *ngIf="getProofItems(workshop.proof).length > 0" style="margin-bottom: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.35rem;">
                Engineering Proof
              </span>
              <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                <a *ngFor="let proofItem of getProofItems(workshop.proof)" [href]="proofItem.url" target="_blank" style="font-size: 0.8rem; color: var(--text-main); text-decoration: none; opacity: 0.9;">
                  🛡️ <strong>{{proofItem.title}}</strong> <span *ngIf="proofItem.description">({{proofItem.description}})</span>
                </a>
              </div>
            </div>

            <!-- Resource Controls (Interactive buttons) -->
            <div class="action-links-group" style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
              <a *ngFor="let link of getResourceLinks(workshop.resources)" [href]="link.url" target="_blank" class="action-btn"
                 style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.45rem 0.85rem; border-radius: 0.375rem; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-main); font-weight: 600; font-size: 0.8rem; text-decoration: none; transition: all 0.2s ease;">
                <span>{{link.icon}}</span>
                <span>{{link.label}}</span>
              </a>
            </div>

          </article>
        </div>
      </section>

      <!-- SECTION 2: Workshop Resources -->
      <section *ngIf="resourceWorkshops().length > 0">
        
        <div class="workshop-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; align-items: start;">
          <article *ngFor="let workshop of resourceWorkshops()" style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 0.75rem; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
            
            <!-- Metadata (Category) -->
            <div *ngIf="workshop.category" style="font-size: 0.75rem; font-weight: 600; opacity: 0.7; margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-color);">
              {{workshop.category}}
            </div>

            <!-- Title -->
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 700; color: var(--text-main); line-height: 1.3;">
              {{workshop.title}}
            </h4>

            <!-- Short Description -->
            <p *ngIf="workshop.description" style="font-size: 0.85rem; opacity: 0.8; margin: 0 0 1rem 0; line-height: 1.45;">
              {{workshop.description}}
            </p>

            <!-- Technologies -->
            <div *ngIf="workshop.technologies && workshop.technologies.length > 0" style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem; margin-top: auto;">
              <span *ngFor="let tech of workshop.technologies" 
                    style="font-size: 0.7rem; padding: 0.2rem 0.45rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 0.2rem; font-weight: 600; color: var(--text-main);">
                {{tech}}
              </span>
            </div>

            <!-- Dynamic Proof Items (if present) -->
            <div *ngIf="getProofItems(workshop.proof).length > 0" style="margin-bottom: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 0.5rem;">
              <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                <a *ngFor="let proofItem of getProofItems(workshop.proof)" [href]="proofItem.url" target="_blank" style="font-size: 0.75rem; color: var(--text-main); text-decoration: none; opacity: 0.9;">
                  🛡️ <strong>{{proofItem.title}}</strong>
                </a>
              </div>
            </div>

            <!-- Resource Controls (Interactive buttons) -->
            <div class="action-links-group" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
              <a *ngFor="let link of getResourceLinks(workshop.resources)" [href]="link.url" target="_blank" class="action-btn"
                 style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.75rem; border-radius: 0.35rem; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-main); font-weight: 600; font-size: 0.75rem; text-decoration: none; transition: all 0.2s ease;">
                <span>{{link.icon}}</span>
                <span>{{link.label}}</span>
              </a>
            </div>

          </article>
        </div>
      </section>
    </div>
  `,
  styles: [`
    @media (max-width: 767px) {
      .workshop-container {
        padding: 2.5rem 1.25rem !important;
      }
      .workshop-grid {
        grid-template-columns: 1fr !important;
        gap: 1.5rem !important;
      }
      .action-links-group {
        flex-direction: column !important;
        width: 100% !important;
      }
      .action-btn {
        width: 100% !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        padding: 0.6rem 1rem !important;
      }
    }
  `]
})
export class VideoLibraryComponent implements OnInit {
  profile = signal<ProfileData | null>(null);

  readonly resourceConfig: Record<string, { label: string; icon: string }> = {
    video: { label: 'Watch Video', icon: '▶' },
    youtube: { label: 'Watch Video', icon: '▶' },
    github: { label: 'GitHub', icon: '💻' },
    slides: { label: 'Download Slides', icon: '📊' },
    sampleProject: { label: 'Sample Project', icon: '🚀' },
    liveDemo: { label: 'Live Demo', icon: '⚡' },
    demo: { label: 'Live Demo', icon: '⚡' },
    documentation: { label: 'Documentation', icon: '📄' },
    downloads: { label: 'Downloads', icon: '📥' },
    download: { label: 'Download', icon: '📥' },
    awsS3: { label: 'AWS S3', icon: '☁️' },
    swagger: { label: 'OpenAPI / Swagger', icon: '📜' },
    pdf: { label: 'PDF Document', icon: '📕' },
    dockerCompose: { label: 'Docker Compose', icon: '🐳' },
    architectureDiagram: { label: 'Architecture Diagram', icon: '🗺️' },
    erDiagram: { label: 'ER Diagram', icon: '📐' },
    npm: { label: 'NPM Package', icon: '📦' },
    maven: { label: 'Maven Artifact', icon: '🏛️' },
    cloudDeployment: { label: 'Cloud Deployment', icon: '☁️' },
    series: { label: 'Workshop Series', icon: '📚' },
    course: { label: 'Course', icon: '🎓' },
    certification: { label: 'Certification', icon: '🏅' },
    cheatSheet: { label: 'Cheat Sheet', icon: '📝' },
    githubTemplate: { label: 'GitHub Template', icon: '⚙️' },
    starterProject: { label: 'Starter Project', icon: '🚀' },
    completedProject: { label: 'Completed Project', icon: '✅' }
  };

  videoWorkshops = computed(() => {
    const data = this.profile();
    if (!data || !data.knowledgeHub || !data.knowledgeHub.workshops) return [];
    return data.knowledgeHub.workshops
      .filter(item => item.status !== 'DRAFT' && item.status !== 'ARCHIVED')
      .sort((a, b) => (b.displayOrder ?? b.priority ?? 0) - (a.displayOrder ?? a.priority ?? 0));
  });

  resourceWorkshops = computed(() => {
    const data = this.profile();
    if (!data || !data.knowledgeHub || !data.knowledgeHub.resources) return [];
    return data.knowledgeHub.resources
      .filter(item => item.status !== 'DRAFT' && item.status !== 'ARCHIVED')
      .sort((a, b) => (b.displayOrder ?? b.priority ?? 0) - (a.displayOrder ?? a.priority ?? 0));
  });

  // Future sections computed signals
  architectureGuides = computed(() => {
    const data = this.profile();
    if (!data || !data.knowledgeHub || !data.knowledgeHub.architectureGuides) return [];
    return data.knowledgeHub.architectureGuides
      .filter(item => item.status !== 'DRAFT' && item.status !== 'ARCHIVED')
      .sort((a, b) => (b.displayOrder ?? b.priority ?? 0) - (a.displayOrder ?? a.priority ?? 0));
  });

  sampleProjects = computed(() => {
    const data = this.profile();
    if (!data || !data.knowledgeHub || !data.knowledgeHub.sampleProjects) return [];
    return data.knowledgeHub.sampleProjects
      .filter(item => item.status !== 'DRAFT' && item.status !== 'ARCHIVED')
      .sort((a, b) => (b.displayOrder ?? b.priority ?? 0) - (a.displayOrder ?? a.priority ?? 0));
  });

  downloads = computed(() => {
    const data = this.profile();
    if (!data || !data.knowledgeHub || !data.knowledgeHub.downloads) return [];
    return data.knowledgeHub.downloads
      .filter(item => item.status !== 'DRAFT' && item.status !== 'ARCHIVED')
      .sort((a, b) => (b.displayOrder ?? b.priority ?? 0) - (a.displayOrder ?? a.priority ?? 0));
  });

  codeTemplates = computed(() => {
    const data = this.profile();
    if (!data || !data.knowledgeHub || !data.knowledgeHub.codeTemplates) return [];
    return data.knowledgeHub.codeTemplates
      .filter(item => item.status !== 'DRAFT' && item.status !== 'ARCHIVED')
      .sort((a, b) => (b.displayOrder ?? b.priority ?? 0) - (a.displayOrder ?? a.priority ?? 0));
  });

  cheatSheets = computed(() => {
    const data = this.profile();
    if (!data || !data.knowledgeHub || !data.knowledgeHub.cheatSheets) return [];
    return data.knowledgeHub.cheatSheets
      .filter(item => item.status !== 'DRAFT' && item.status !== 'ARCHIVED')
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  });

  learningPaths = computed(() => {
    const data = this.profile();
    if (!data || !data.knowledgeHub || !data.knowledgeHub.learningPaths) return [];
    return data.knowledgeHub.learningPaths
      .filter(item => item.status !== 'DRAFT' && item.status !== 'ARCHIVED')
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  });

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfileData().subscribe(data => this.profile.set(data));
  }

  getResourceLinks(resources?: any): Array<{ key: string; label: string; icon: string; url: string }> {
    if (!resources) return [];

    // If resources is already a normalized array
    if (Array.isArray(resources)) {
      return resources
        .filter(link => !!link && !!link.url)
        .map(link => {
          const typeKey = link.type || 'default';
          const config = this.resourceConfig[typeKey] || { label: this.capitalize(typeKey), icon: '🔗' };
          return {
            key: typeKey,
            label: link.title || config.label,
            icon: link.icon || config.icon,
            url: link.url
          };
        });
    }

    // Fallback for legacy key-value object dictionaries
    return Object.entries(resources)
      .filter(([_, url]) => !!url)
      .map(([key, url]) => {
        const config = this.resourceConfig[key] || { label: this.capitalize(key), icon: '🔗' };
        return {
          key,
          label: config.label,
          icon: config.icon,
          url: url as string
        };
      });
  }

  getProofItems(proof?: EngineeringProofItem[]): EngineeringProofItem[] {
    if (!proof || !Array.isArray(proof)) return [];
    return proof.filter(item => !!item && !!item.title && item.visible !== false);
  }

  // Future sections empty rendering methods
  renderArchitectureGuides() {
    return [];
  }

  renderSampleProjects() {
    return [];
  }

  renderDownloads() {
    return [];
  }

  renderCodeTemplates() {
    return [];
  }

  renderCheatSheets() {
    return [];
  }

  renderLearningPaths() {
    return [];
  }

  private capitalize(val: string): string {
    if (!val) return '';
    return val.charAt(0).toUpperCase() + val.slice(1).replace(/([A-Z])/g, ' $1');
  }
}