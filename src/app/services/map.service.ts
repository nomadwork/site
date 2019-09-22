import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  markers(latlng) {
    return this.http.post<any>('/api/establishmment', latlng);
  }

  detailAboutThisPlace(id: number): Observable<any> {
    return this.http.get<any>(`api/establishmment/${id}`);
  }
}
