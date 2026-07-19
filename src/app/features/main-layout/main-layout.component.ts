import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  
  consultingExpertise = [
    { title: 'Enterprise Architecture' },
    { title: 'Platform Engineering' },
    { title: 'Full-Stack Development' },
    { title: 'Technical Consulting & Training' }
  ];

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', 'dark');
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