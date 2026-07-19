import { Component, OnInit, signal, inject } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileData } from '../../shared/models/profile.model';
import { EngineeringProofComponent } from '../../shared/components/engineering-proof/engineering-proof.component';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [EngineeringProofComponent],
  template: `
    @if (profile(); as data) {
      <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: system-ui, sans-serif;">
        <!-- Page Header -->
        <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 2rem; border-left: 4px solid var(--accent-color); padding-left: 0.75rem; color: var(--text-main);">
          Enterprise Case Studies
        </h2>
        
        <!-- Case Studies & Experience Track Cards Loop -->
        @for (item of data.caseStudies; track item.title) {
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 2.5rem; border-radius: 0.75rem; margin-bottom: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <!-- Title -->
            <h3 style="margin-top:0; font-size:1.4rem; color:var(--accent-color); font-weight: 700; margin-bottom: 1.5rem;">
              {{ item.title }}
            </h3>

            <!-- Business Impact Summary -->
            @if (item.businessImpact) {
              <div style="margin-bottom: 1.5rem; border-left: 3px solid var(--accent-color); padding-left: 0.75rem;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-color); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.2rem;">
                  Business Impact
                </span>
                <p style="font-size: 1.05rem; line-height: 1.5; color: var(--text-main); font-weight: 500; margin: 0; opacity: 0.9;">
                  {{ item.businessImpact }}
                </p>
              </div>
            }
            
            <!-- Dynamic Sections Display Loop -->
            <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.75rem;">
              @for (sec of item.sections; track sec.heading) {
                <div>
                  <h4 style="font-size: 1.05rem; font-weight: 600; margin: 0 0 0.35rem 0; color: var(--text-main); letter-spacing: 0.025em;">
                    {{ sec.heading }}
                  </h4>
                  <p style="font-size: 0.95rem; line-height: 1.6; opacity: 0.85; margin: 0; white-space: pre-wrap;">
                    {{ sec.content }}
                  </p>
                </div>
              }
            </div>

            <!-- Technology Stack Footer Badges -->
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
              @for (tech of item.stack; track tech) {
                <span style="font-size:0.75rem; padding:0.35rem 0.65rem; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:0.25rem; font-weight:600; color: var(--text-main);">
                  {{ tech }}
                </span>
              }
            </div>
          </div>
        }

        <!-- Reusable Engineering Proof & Verified Artifacts Component -->
        <app-engineering-proof [proof]="data.engineeringProof"></app-engineering-proof>
      </div>
    }
  `
})
export class CaseStudiesComponent implements OnInit {
  profile = signal<ProfileData | null>(null);
  private profileService = inject(ProfileService);

  ngOnInit() {
    this.profileService.getProfileData().subscribe({
      next: (data) => this.profile.set(data),
      error: (err) => console.error('Failed to load profile details in Case Studies:', err)
    });
  }
}