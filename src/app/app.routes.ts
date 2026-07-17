import { Routes } from '@angular/router';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';
import { HomeScreenComponent } from './features/home-screen/home-screen.component';
import { VideoLibraryComponent } from './features/video-library-screen/video-library.component';
import { CaseStudiesComponent } from './features/case-studies-screen/case-studies.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeScreenComponent },
      { path: 'cases', component: CaseStudiesComponent },
      { path: 'videos', component: VideoLibraryComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

// src/app/features/case-studies-screen/case-studies.component.ts