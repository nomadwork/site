import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  markers(latlng) {
    return this.http.post<any>('/api/establishmment', latlng).subscribe(data => data);
  }

}
