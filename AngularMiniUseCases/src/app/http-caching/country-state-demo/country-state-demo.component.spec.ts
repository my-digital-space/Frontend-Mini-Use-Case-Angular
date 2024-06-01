import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStateDemoComponent } from './country-state-demo.component';

describe('CountryStateDemoComponent', () => {
  let component: CountryStateDemoComponent;
  let fixture: ComponentFixture<CountryStateDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryStateDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryStateDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
