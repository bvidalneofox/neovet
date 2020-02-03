import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistorialConsultasComponent } from './ver-historial-consultas.component';

describe('VerHistorialConsultasComponent', () => {
  let component: VerHistorialConsultasComponent;
  let fixture: ComponentFixture<VerHistorialConsultasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerHistorialConsultasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerHistorialConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
