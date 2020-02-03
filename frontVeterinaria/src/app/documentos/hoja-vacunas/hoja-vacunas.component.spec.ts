import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaVacunasComponent } from './hoja-vacunas.component';

describe('HojaVacunasComponent', () => {
  let component: HojaVacunasComponent;
  let fixture: ComponentFixture<HojaVacunasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojaVacunasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaVacunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
