import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHospitalizacionesActivasComponent } from './ver-hospitalizaciones-activas.component';

describe('VerHospitalizacionesActivasComponent', () => {
  let component: VerHospitalizacionesActivasComponent;
  let fixture: ComponentFixture<VerHospitalizacionesActivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerHospitalizacionesActivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerHospitalizacionesActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
