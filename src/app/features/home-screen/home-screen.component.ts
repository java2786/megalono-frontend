import { Component, OnInit, signal, ViewChild, ElementRef, OnDestroy, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileData, ServicePillar } from '../../shared/models/profile.model';
import { getVisibleContent } from '../../shared/utils/content.utility';

export interface AnimatedStat {
  id: string;
  target: number;
  suffix: string;
  label: string;
  current: WritableSignal<number>;
}

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./home-screen.component.html`,
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  profile = signal<ProfileData | null>(null);

  visibleServices = computed<ServicePillar[]>(() => {
    return getVisibleContent(this.profile()?.services);
  });

  stats = computed<AnimatedStat[]>(() => {
    const rawStats = getVisibleContent(this.profile()?.statistics);
    return rawStats.map(s => ({
      id: s.id,
      target: s.target,
      suffix: s.suffix,
      label: s.label,
      current: signal(0)
    }));
  });

  private observer: IntersectionObserver | null = null;
  private animFrameId: number | null = null;
  private observerSetup = false;

  @ViewChild('statsContainer') set statsContainer(content: ElementRef<HTMLDivElement> | undefined) {
    if (content) {
      this.setupIntersectionObserver(content);
    }
  }

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfileData().subscribe({
      next: (data) => {
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      this.setTargetValuesImmediately();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
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
    for (const stat of this.stats()) {
      stat.current.set(stat.target);
    }
  }

  private startCountingAnimation(): void {
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      for (const stat of this.stats()) {
        const value = Math.floor(easeOutCubic * stat.target);
        stat.current.set(value);
      }

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(animate);
      } else {
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