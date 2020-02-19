import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistorialHospitalizacionesComponent } from './ver-historial-hospitalizaciones.component';

describe('VerHistorialHospitalizacionesComponent', () => {
  let component: VerHistorialHospitalizacionesComponent;
  let fixture: ComponentFixture<VerHistorialHospitalizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerHistorialHospitalizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerHistorialHospitalizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
