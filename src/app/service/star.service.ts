import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  private starsFoundSubject = new BehaviorSubject<string[]>([]);
  starsFound$ = this.starsFoundSubject.asObservable();

  private visitorId: string;

  constructor(private apiService: ApiService) {
    this.visitorId = localStorage.getItem('visitor_id') || this.generateVisitorId();
    localStorage.setItem('visitor_id', this.visitorId);

    // Load stars from backend on service init
    this.loadStars();
  }

  private generateVisitorId(): string {
    return crypto.randomUUID();
  }

  private loadStars() {
    this.apiService.getProgress(this.visitorId).subscribe({
      next: progress => {
        this.starsFoundSubject.next(progress.stars_found || []);
      },
      error: () => {
        this.starsFoundSubject.next([]);
      }
    });
  }

  findStar(starId: string) {
    const currentStars = this.starsFoundSubject.getValue();

    if (currentStars.includes(starId)) {
      console.log(`Star ${starId} already found!`);
      return;
    }

    this.apiService.addStar(this.visitorId, starId).subscribe({
      next: () => {
        const updatedStars = [...currentStars, starId];
        this.starsFoundSubject.next(updatedStars);
        console.log(`Star ${starId} added!`);
      },
      error: err => {
        console.error('Failed to add star', err);
      }
    });
  }

  hasFoundAllStars(allStars: string[]): boolean {
    const currentStars = this.starsFoundSubject.getValue();
    return allStars.every(star => currentStars.includes(star));
  }
}
