import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  private starsFoundSubject = new BehaviorSubject<string[]>([]);
  starsFound$ = this.starsFoundSubject.asObservable();

  private isCompletedSubject = new BehaviorSubject<boolean>(false);
  isCompleted$ = this.isCompletedSubject.asObservable();

  private visitorId: string | null = null;
  private allStars = ['star1', 'star2', 'star3', 'star4', 'star5'];

  constructor(private apiService: ApiService) { }

  loadStars(visitorId: string) {
    this.visitorId = visitorId;
    this.apiService.getProgress(this.visitorId).subscribe({
      next: progress => {
        const stars = progress.stars_found || [];
        const completed = progress.completed || false;

        this.starsFoundSubject.next(stars);
        this.isCompletedSubject.next(completed);
      },
      error: () => {
        this.starsFoundSubject.next([]);
        this.isCompletedSubject.next(false);
      }
    });
  }

  findStar(starId: string): Observable<string> {
    const currentStars = this.starsFoundSubject.getValue();

    if (currentStars.includes(starId)) {
      return of(`Star ${starId} already found!`);
    }

    if (!this.visitorId) {
      return of('No visitorId set');
    }

    return this.apiService.addStar(this.visitorId, starId).pipe(
      tap(() => {
        const updatedStars = [...currentStars, starId];
        this.starsFoundSubject.next(updatedStars);

        // Check if all stars have been found
        const allFound = this.allStars.every(star => updatedStars.includes(star));
        if (allFound) {
          this.isCompletedSubject.next(true);
          this.apiService.markCompleted(this.visitorId!).subscribe();
        }
      }),
      map(() => `Star ${starId} added!`),
      catchError(err => {
        console.error('Failed to add star', err);
        return of('Failed to add star');
      })
    );
  }

  hasFoundAllStars(): boolean {
    const currentStars = this.starsFoundSubject.getValue();
    return this.allStars.every(star => currentStars.includes(star));
  }

}
