import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { ProfileData } from '../../shared/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private jsonUrl = 'assets/data/profile-data.json';
  private cachedData$!: Observable<ProfileData>;

  constructor(private http: HttpClient) {}

  getProfileData(): Observable<ProfileData> {
    // Cache the data call to optimize performance across route navigation changes
    if (!this.cachedData$) {
      this.cachedData$ = this.http.get<ProfileData>(this.jsonUrl).pipe(
        shareReplay(1)
      );
    }
    return this.cachedData$;
  }
}