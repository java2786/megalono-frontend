import { Component, OnInit, signal, inject } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileData } from '../../shared/models/profile.model';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [],
  template: `
    @if (profile(); as data) {
      <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem;">
        <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 2rem; border-left: 4px solid var(--accent-color); padding-left: 0.75rem;">Architecture Labs</h2>
        
        @for (item of data.caseStudies; track item.title) {
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 2.5rem; border-radius: 0.75rem; margin-bottom: 2rem;">
            <h3 style="margin-top:0; font-size:1.4rem; color:var(--accent-color); font-weight: 700; margin-bottom: 1.25rem;">{{item.title}}</h3>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              
              <!-- Layout Variant A: Renders if item uses traditional problem/solution fields -->
              @if (item.problem) {
                <p style="font-size: 0.95rem; line-height: 1.6; margin: 0; font-family: system-ui, sans-serif;">
                  <strong style="color: var(--text-main);">Problem:</strong> {{ item.problem }}
                </p>
              }
              @if (item.solution) {
                <p style="font-size: 0.95rem; line-height: 1.6; margin: 0; font-family: system-ui, sans-serif;">
                  <strong style="color: var(--text-main);">Solution:</strong> {{ item.solution }}
                </p>
              }

              <!-- Layout Variant B: Renders if item uses custom sectional arrays -->
              @if (item.sections) {
                @for (sec of item.sections; track sec.heading) {
                  <div style="margin-top: 0.5rem;">
                    <h4 style="font-size: 1.1rem; font-weight: 600; margin: 0 0 0.25rem 0; color: var(--text-main);">{{ sec.heading }}</h4>
                    <p style="font-size: 0.95rem; line-height: 1.6; opacity: 0.85; margin: 0; font-family: system-ui, sans-serif;">{{ sec.content }}</p>
                  </div>
                }
              }

            </div>

            <!-- Tech Stack Footer Badges -->
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:2rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
              @for (tech of item.stack; track tech) {
                <span style="font-size:0.75rem; padding:0.25rem 0.5rem; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:0.25rem; font-weight:600;">{{tech}}</span>
              }
            </div>
          </div>
        }
      </div>
    }
  `
})
export class CaseStudiesComponent implements OnInit {
  profile = signal<ProfileData | null>(null);
  private profileService = inject(ProfileService);

  ngOnInit() {
    this.profileService.getProfileData().subscribe(data => this.profile.set(data));
  }
}