import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Progress {
  user_id: string;
  stars_found: string[];
  last_updated?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
    private baseUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  trackVisit(userId: string | null, username?: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/track-visit`, { user_id: userId, username });
  }

  trackProgress(userId: string, event: string, detail: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/progress`, { user_id: userId, event, detail });
  }

  getProgress(userId: string): Observable<Progress> {
    return this.http.get<Progress>(`${this.baseUrl}/progress/${userId}`);
  }

  addStar(userId: string, starId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/progress/star`, { user_id: userId, star_id: starId });
  }
}
