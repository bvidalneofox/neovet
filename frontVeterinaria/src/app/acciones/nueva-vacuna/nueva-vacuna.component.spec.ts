import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaVacunaComponent } from './nueva-vacuna.component';

describe('NuevaVacunaComponent', () => {
  let component: NuevaVacunaComponent;
  let fixture: ComponentFixture<NuevaVacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaVacunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaVacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
