import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryStateDemoComponent } from './http-caching/country-state-demo/country-state-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    CountryStateDemoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularMiniUseCases';
}
