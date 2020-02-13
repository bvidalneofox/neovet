import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaHospitalizacionComponent } from './ficha-hospitalizacion.component';

describe('FichaHospitalizacionComponent', () => {
  let component: FichaHospitalizacionComponent;
  let fixture: ComponentFixture<FichaHospitalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaHospitalizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaHospitalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
