import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosMascotasComponent } from './todos-mascotas.component';

describe('TodosMascotasComponent', () => {
  let component: TodosMascotasComponent;
  let fixture: ComponentFixture<TodosMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
