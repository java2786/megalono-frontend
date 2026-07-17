import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- Add this import
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true, // Enforces modern standalone architecture
  imports: [RouterModule, CommonModule], // <-- Add RouterModule here to fix the template errors
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isDark = true;
  today = new Date();
  
  consultingExpertise = [
    { title: 'Enterprise Architecture' },
    { title: 'Platform Engineering' },
    { title: 'Full-Stack Development' },
    { title: 'Technical Consulting & Training' }
  ];

  ngOnInit(): void {
    // 3. Force the DOM body attribute to match your variable right at startup
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  toggleTheme(): void {
    this.isDark = !this.isDark;
    const activeTheme = this.isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }
}