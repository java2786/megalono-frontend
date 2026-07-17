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

import { Component, OnInit, signal } from '@angular/core';
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
export class HomeScreenComponent implements OnInit {
  // Use a modern Angular Signal to hold the profile data state
  profile = signal<ProfileData | null>(null);

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
}