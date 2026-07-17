// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';
// import { ProfileService } from '../../core/services/profile.service';
// import { ProfileData } from '../../shared/models/profile.model';

// @Component({
//   selector: 'app-home-screen',
//   standalone: true,                          // <-- Enforce standalone flag explicitly
//   imports: [CommonModule],                   // <-- 2. Add CommonModule here to unlock *ngIf and *ngFor
//   templateUrl: './home-screen.component.html',
//   styleUrls: ['./home-screen.component.css']
// })
// export class HomeScreenComponent implements OnInit, OnDestroy {
//   profile: ProfileData | null = null;
//   private dataSub!: Subscription;

//   constructor(private profileService: ProfileService) {}

//   ngOnInit(): void {
//     this.dataSub = this.profileService.getProfileData().subscribe({
//       next: (data) => this.profile = data,
//       error: (err) => console.error('Error loading configuration profile data layer', err)
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.dataSub) this.dataSub.unsubscribe();
//   }
// }

import { Component, OnInit, signal, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileData } from '../../shared/models/profile.model';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./home-screen.component.html`,
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  // Use a modern Angular Signal to hold the profile data state
  profile = signal<ProfileData | null>(null);

  // Professional statistics data structure with Signals for animated values
  stats = [
    { target: 15, suffix: '+', label: 'Years Experience', current: signal(0) },
    { target: 20, suffix: 'K+', label: 'Engineers Trained', current: signal(0) },
    { target: 20, suffix: '+', label: 'Enterprise Organizations', current: signal(0) },
    { target: 100, suffix: '+', label: 'Technical Workshops', current: signal(0) },
    { target: 50, suffix: '+', label: 'Production Applications', current: signal(0) }
  ];

  private observer: IntersectionObserver | null = null;
  private animFrameId: number | null = null;
  private observerSetup = false;

  // ViewChild setter to handle dynamic rendering when profile signal resolves
  @ViewChild('statsContainer') set statsContainer(content: ElementRef<HTMLDivElement> | undefined) {
    if (content) {
      this.setupIntersectionObserver(content);
    }
  }

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfileData().subscribe({
      next: (data) => {
        // Setting the signal automatically notifies the zoneless template to render
        this.profile.set(data);
      },
      error: (err) => console.error('Error loading configuration profile data layer', err)
    });
  }

  private setupIntersectionObserver(element: ElementRef<HTMLDivElement>): void {
    if (this.observerSetup || typeof window === 'undefined') {
      return;
    }
    this.observerSetup = true;

    // Respect prefers-reduced-motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      this.setTargetValuesImmediately();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Run once: disconnect observer immediately when triggered
        this.observer?.disconnect();
        this.observer = null;
        this.startCountingAnimation();
      }
    }, {
      threshold: 0.1
    });

    this.observer.observe(element.nativeElement);
  }

  private setTargetValuesImmediately(): void {
    for (const stat of this.stats) {
      stat.current.set(stat.target);
    }
  }

  private startCountingAnimation(): void {
    const duration = 1500; // Animation runs for 1.5 seconds (within 1200-1800ms requirement)
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth Ease-Out Cubic: f(t) = 1 - (1 - t)^3 (no bounce, scaling, or flashing)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      for (const stat of this.stats) {
        const value = Math.floor(easeOutCubic * stat.target);
        stat.current.set(value);
      }

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(animate);
      } else {
        // Ensure values settle exactly on target values
        this.setTargetValuesImmediately();
      }
    };

    this.animFrameId = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }
}