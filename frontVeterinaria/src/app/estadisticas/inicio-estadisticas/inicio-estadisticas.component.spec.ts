import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEstadisticasComponent } from './inicio-estadisticas.component';

describe('InicioEstadisticasComponent', () => {
  let component: InicioEstadisticasComponent;
  let fixture: ComponentFixture<InicioEstadisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioEstadisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
