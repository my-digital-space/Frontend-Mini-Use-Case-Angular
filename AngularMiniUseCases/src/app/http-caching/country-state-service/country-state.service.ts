import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {
  apiEndpoint: string = 'http://localhost:8989/api/v1/cache';
  countryUrl: string = '/getCountriesData';
  stateUrl: string = '/getStatesData';
  cityUrl: string = '/getCitiesData';
  stateByIdUrl: string = 'getStatesDataById';
  cityByIdUrl: string = 'getCitiesDataById';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<any> {
    return this.http.get(this.apiEndpoint + this.countryUrl);
  }

  getAllStates(): Observable<any> {
    return this.http.get(this.apiEndpoint + this.stateUrl);
  }

  getAllCities(): Observable<any> {
    return this.http.get(this.apiEndpoint + this.cityUrl);
  }

  getAllStatesById(countryId: number): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/${this.stateByIdUrl}/${countryId}`);
  }

  getAllCitiesById(stateId: number): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/${this.cityByIdUrl}/${stateId}`);
  }

}
