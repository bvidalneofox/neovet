import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMascotasComponent } from './buscador-mascotas.component';

describe('BuscadorMascotasComponent', () => {
  let component: BuscadorMascotasComponent;
  let fixture: ComponentFixture<BuscadorMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
