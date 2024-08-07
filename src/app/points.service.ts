import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Point } from './point.interface';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  private baseUrl =
    'https://raw.githubusercontent.com/waliot/test-tasks/master/assets/data/frontend-1-dataset.json';

  constructor(private http: HttpClient) {}

  public getPoints(): Observable<Point[]> {
    return this.http.get<Point[]>(this.baseUrl);
  }
}
