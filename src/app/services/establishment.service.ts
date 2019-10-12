import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Establishment from '../models/establishment';
import { Observable } from 'rxjs';
import HttpResponseEstablishment from '../models/http-response-establishment';
import HttpResponseEstablishmentMap from '../models/http-response-establishment-maps';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(private http: HttpClient) { }

  createEstablishment(establishment: Establishment): Observable<HttpResponseEstablishment> {

    return this.http.post<HttpResponseEstablishment>('/api/establishmment', establishment, {
      headers: {
      'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiZXhwIjoxNTcwOTIxNTgxLCJpc3MiOiJub21hZHdvcmsuY29tLmJyIiwiYXVkIjoibm9tYWR3b3JrLmNvbS5iciJ9.id6ybjZJ1bOyaWEjenKxF7s1gavoNSdLNxTeR5pzCm4'
    }});
  }

  getEstablishment(id: number): Observable<HttpResponseEstablishment> {
    return this.http.get<HttpResponseEstablishment>(`/api/establishmment/${id}`);
  }

  getEstablishments(latitude: number, longitude: number): Observable<HttpResponseEstablishmentMap> {
    return this.http.get<HttpResponseEstablishmentMap>(`/api/establishmment/${latitude},${longitude}`);
  }

}
