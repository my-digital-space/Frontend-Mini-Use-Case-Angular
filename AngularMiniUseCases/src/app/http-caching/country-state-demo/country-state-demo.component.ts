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

  selectedCountry!: any;
  selectedState!: any;
  selectedCity!: any;

  stateCacheMap: Map<number, State[]> = new Map<number, State[]>;

  constructor(
    private countryStateSvc: CountryStateService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // const initialRequests: Observable<any>[] = [
    //   this.countryStateSvc.getAllCountries(),
    //   this.countryStateSvc.getAllStates(),
    //   this.countryStateSvc.getAllCities()
    // ];

    // forkJoin(initialRequests).subscribe({
    //   next: ([countryResp, stateResp, cityResp]) => {
    //     this.countriesList = countryResp;
    //     this.statesList = stateResp;
    //     this.citiesList = cityResp;
    //     this.cdr.detectChanges();
    //   }
    // });

    // only load all the countries on page load
    this.countryStateSvc.getAllCountries().subscribe({
      next: (countryResp) => {
        this.countriesList = countryResp;
        this.cdr.detectChanges();
      }
    });
  }

  onCountryChange() {
    //this.statesList = this.statesList.filter(state => state.country_id == this.selectedCountry);
    // this.countryStateSvc.getAllStatesById(this.selectedCountry).subscribe({
    //   next: (stateResp) => {
    //     this.statesList = stateResp;
    //   }
    // });

    // Now check the Map first for the data
    if (this.stateCacheMap.has(this.selectedCountry)) {
      // the state list for this country is present in the map
      // so get the data from the Map. No need to call the backend service.
      this.statesList = this.stateCacheMap.get(this.selectedCountry) as State[];
    } else {
      // The selected country's state data is not present in our Map cache data
      // call the backend service to fetch the data
      this.countryStateSvc.getAllStatesById(this.selectedCountry).subscribe({
        next: (stateResp) => {
          this.statesList = stateResp;
          // then set the cache
          this.stateCacheMap.set(this.selectedCountry, stateResp);
        }
      });
    }
  }

  onStateChange() {
    //this.citiesList = this.citiesList.filter(city => city.state_id == this.selectedState);
    this.countryStateSvc.getAllCitiesById(this.selectedState).subscribe({
      next: (cityResp) => {
        this.citiesList = cityResp;
      }
    });
  }

  onCityChange() {

  }

}
