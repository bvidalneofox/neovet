import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosClientesComponent } from './todos-clientes.component';

describe('TodosClientesComponent', () => {
  let component: TodosClientesComponent;
  let fixture: ComponentFixture<TodosClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
