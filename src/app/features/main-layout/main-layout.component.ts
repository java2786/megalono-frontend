import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileData, SocialLinkItem } from '../../shared/models/profile.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isDark = true;
  today = new Date();
  isMobileMenuOpen = signal<boolean>(false);
  
  private profileService = inject(ProfileService);
  profile = signal<ProfileData | null>(null);

  consultingExpertise = [
    { title: 'Enterprise Architecture' },
    { title: 'Platform Engineering' },
    { title: 'Full-Stack Development' },
    { title: 'Technical Consulting & Training' }
  ];

  socialLinks = computed<SocialLinkItem[]>(() => {
    const data = this.profile();
    if (!data || !data.socialLinks) return [];

    if (Array.isArray(data.socialLinks)) {
      return data.socialLinks
        .filter(item => item.visible !== false)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }

    // Fallback for legacy record object structure
    const obj = data.socialLinks as Record<string, string>;
    const orderMap: Record<string, number> = { linkedin: 10, github: 20, toptal: 30, upwork: 40 };
    return Object.entries(obj).map(([key, url]) => ({
      id: key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      url,
      displayOrder: orderMap[key] || 100
    })).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  });

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', 'dark');
    this.profileService.getProfileData().subscribe({
      next: (data) => this.profile.set(data),
      error: (err) => console.error('Failed to load profile data in MainLayout:', err)
    });
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}