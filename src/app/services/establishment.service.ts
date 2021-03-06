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

    return this.http.post<HttpResponseEstablishment>('/api/establishmment', establishment);
  }

  getEstablishment(id: number): Observable<HttpResponseEstablishment> {
    return this.http.get<HttpResponseEstablishment>(`/api/establishmment/${id}`);
  }

  getEstablishments(latitude: number, longitude: number): Observable<HttpResponseEstablishmentMap> {
    return this.http.get<HttpResponseEstablishmentMap>(`/api/establishmment/${latitude},${longitude}`);
  }

  // getDetailsEstablishment(id: number): Observable<any> {
  //   return this.http.get<any>(`/api/establishmment/details/${id}`);
  // }
  getDetailsEstablishment(id: number): Observable<any> {
    return this.http.get<any>(`/api/log/establishmments/${id}`);
  }

 
}
