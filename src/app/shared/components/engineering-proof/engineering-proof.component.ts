import { Component, Input, computed, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineeringProofData } from '../../models/profile.model';

@Component({
  selector: 'app-engineering-proof',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="hasData()" class="engineering-proof-container" style="margin-top: 3.5rem; border-top: 1px solid var(--border-color); padding-top: 3rem;">
      <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 2rem; border-left: 4px solid var(--accent-color); padding-left: 0.75rem; color: var(--text-main);">
        Engineering Proof & Technical Evidence
      </h3>

      <!-- CATEGORY 1: Architecture Diagrams -->
      <section *ngIf="diagrams().length > 0" style="margin-bottom: 3rem;">
        <h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-main); opacity: 0.9;">
          Architecture Diagrams
        </h4>
        <div class="proof-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; align-items: start;">
          <article *ngFor="let diag of diagrams()" style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 0.75rem; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
            
            <img *ngIf="diag.thumbnail || diag.fullImage" [src]="diag.thumbnail || diag.fullImage" [alt]="diag.title" loading="lazy"
                 style="width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem; display: block;" />

            <div *ngIf="diag.category" style="font-size: 0.75rem; font-weight: 600; opacity: 0.7; margin-bottom: 0.35rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-color);">
              {{diag.category}}
            </div>

            <h5 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 700; color: var(--text-main); line-height: 1.3;">
              {{diag.title}}
            </h5>

            <p *ngIf="diag.description" style="font-size: 0.85rem; opacity: 0.8; margin: 0 0 1rem 0; line-height: 1.45;">
              {{diag.description}}
            </p>

            <div *ngIf="diag.technologies && diag.technologies.length > 0" style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: auto;">
              <span *ngFor="let tech of diag.technologies" 
                    style="font-size: 0.7rem; padding: 0.2rem 0.45rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 0.2rem; font-weight: 600; color: var(--text-main);">
                {{tech}}
              </span>
            </div>
          </article>
        </div>
      </section>

      <!-- CATEGORY 2: GitHub Repositories -->
      <section *ngIf="repos().length > 0" style="margin-bottom: 3rem;">
        <h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-main); opacity: 0.9;">
          Verified GitHub Repositories
        </h4>
        <div class="proof-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; align-items: start;">
          <article *ngFor="let repo of repos()" style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 0.75rem; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
            
            <h5 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 700; color: var(--text-main); line-height: 1.3;">
              💻 {{repo.repositoryName}}
            </h5>

            <p *ngIf="repo.description" style="font-size: 0.85rem; opacity: 0.8; margin: 0 0 1rem 0; line-height: 1.45;">
              {{repo.description}}
            </p>

            <div *ngIf="repo.technologies && repo.technologies.length > 0" style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem; margin-top: auto;">
              <span *ngFor="let tech of repo.technologies" 
                    style="font-size: 0.7rem; padding: 0.2rem 0.45rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 0.2rem; font-weight: 600; color: var(--text-main);">
                {{tech}}
              </span>
            </div>

            <div style="margin-top: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
              <a [href]="repo.url" target="_blank" class="proof-btn"
                 style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.85rem; border-radius: 0.35rem; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-main); font-weight: 600; font-size: 0.8rem; text-decoration: none; transition: all 0.2s ease;">
                <span>💻 View Repository →</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- CATEGORY 3: Swagger APIs (Automatically hidden if empty) -->
      <section *ngIf="swaggerApis().length > 0" style="margin-bottom: 3rem;">
        <h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-main); opacity: 0.9;">
          Live Swagger / OpenAPI Specifications
        </h4>
        <div class="proof-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; align-items: start;">
          <article *ngFor="let api of swaggerApis()" style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 0.75rem; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
            
            <div *ngIf="api.service || api.version" style="font-size: 0.75rem; font-weight: 600; opacity: 0.7; margin-bottom: 0.35rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-color);">
              {{api.service}} <span *ngIf="api.version">(v{{api.version}})</span>
            </div>

            <h5 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 700; color: var(--text-main); line-height: 1.3;">
              📜 {{api.title}}
            </h5>

            <p *ngIf="api.description" style="font-size: 0.85rem; opacity: 0.8; margin: 0 0 1rem 0; line-height: 1.45;">
              {{api.description}}
            </p>

            <div style="margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
              <a [href]="api.url" target="_blank" class="proof-btn"
                 style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.85rem; border-radius: 0.35rem; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-main); font-weight: 600; font-size: 0.8rem; text-decoration: none; transition: all 0.2s ease;">
                <span>📜 Open Swagger Specs →</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  `,
  styles: [`
    @media (max-width: 767px) {
      .engineering-proof-container {
        margin-top: 2.5rem !important;
        padding-top: 2rem !important;
      }
      .proof-grid {
        grid-template-columns: 1fr !important;
        gap: 1.25rem !important;
      }
      .proof-btn {
        width: 100% !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        padding: 0.6rem 1rem !important;
      }
    }
  `]
})
export class EngineeringProofComponent implements OnChanges {
  @Input() proof?: EngineeringProofData;

  proofSignal = signal<EngineeringProofData | undefined>(undefined);

  diagrams = computed(() => this.proofSignal()?.architectureDiagrams || []);
  repos = computed(() => this.proofSignal()?.githubRepositories || []);
  swaggerApis = computed(() => this.proofSignal()?.swaggerApis || []);

  hasData = computed(() => 
    this.diagrams().length > 0 || 
    this.repos().length > 0 || 
    this.swaggerApis().length > 0
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proof']) {
      this.proofSignal.set(this.proof);
    }
  }
}
