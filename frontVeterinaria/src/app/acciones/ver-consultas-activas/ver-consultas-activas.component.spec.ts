import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerConsultasActivasComponent } from './ver-consultas-activas.component';

describe('VerConsultasActivasComponent', () => {
  let component: VerConsultasActivasComponent;
  let fixture: ComponentFixture<VerConsultasActivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerConsultasActivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConsultasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
