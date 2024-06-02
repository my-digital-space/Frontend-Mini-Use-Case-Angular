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
  stateByIdUrl: string = '/getStatesDataById';
  cityByIdUrl: string = '/getCitiesDataById';

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
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('countryId', countryId.toString());
    return this.http.get(this.apiEndpoint + this.stateByIdUrl,
      { headers: headers });
  }

  getAllCitiesById(stateId: number): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('stateId', stateId.toString());
    return this.http.get(this.apiEndpoint + this.cityByIdUrl,
      { headers: headers }
    );
  }

}
