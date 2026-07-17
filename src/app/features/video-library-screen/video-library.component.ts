import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileData } from '../../shared/models/profile.model';

@Component({
  selector: 'app-video-library',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" *ngIf="profile() as data" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem;">
      <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 2rem; border-left: 4px solid var(--accent-color); padding-left: 0.75rem;">Technical Workshops</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div *ngFor="let video of data.videoLibrary" style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 0.75rem;">
          <h3 style="margin-top:0; font-size:1.1rem; min-height:45px;">{{video.title}}</h3>
          <p style="font-size:0.85rem; opacity:0.7;">Duration: {{video.duration}} | Category: {{video.category}}</p>
          <a [href]="video.url" target="_blank" style="display:inline-block; margin-top:1rem; color:var(--accent-color); font-weight:600; text-decoration:none; font-size:0.9rem;">Watch Tutorial →</a>
        </div>
      </div>
    </div>
  `
})
export class VideoLibraryComponent implements OnInit {
  profile = signal<ProfileData | null>(null);
  constructor(private profileService: ProfileService) {}
  ngOnInit() {
    this.profileService.getProfileData().subscribe(data => this.profile.set(data));
  }
}