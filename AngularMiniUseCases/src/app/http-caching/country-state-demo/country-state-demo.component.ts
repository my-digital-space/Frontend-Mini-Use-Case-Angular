import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CountryStateService } from '../country-state-service/country-state.service';
import { Country } from '../models/Country';
import { State } from '../models/State';
import { City } from '../models/City';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-country-state-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country-state-demo.component.html',
  styleUrl: './country-state-demo.component.scss'
})
export class CountryStateDemoComponent implements OnInit {
  countriesList: Country[] = [];
  statesList: State[] = [];
  citiesList: City[] = [];

  selectedCountry: any;
  selectedState: any;
  selectedCity: any;

  constructor(
    private countryStateSvc: CountryStateService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const initialRequests: Observable<any>[] = [
      this.countryStateSvc.getAllCountries(),
      this.countryStateSvc.getAllStates(),
      this.countryStateSvc.getAllCities()
    ];

    forkJoin(initialRequests).subscribe({
      next: ([countryResp, stateResp, cityResp]) => {
        this.countriesList = countryResp;
        this.statesList = stateResp;
        this.citiesList = cityResp;
        this.cdr.detectChanges();
      }
    });

  }

  onCountryChange() {
    this.statesList = this.statesList.filter(state => state.country_id == this.selectedCountry);
  }

  onStateChange() {
    this.citiesList = this.citiesList.filter(city => city.state_id == this.selectedState);
  }

  onCityChange() {

  }

}
