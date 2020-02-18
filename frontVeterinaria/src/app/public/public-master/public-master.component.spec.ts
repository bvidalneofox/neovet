import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMasterComponent } from './public-master.component';

describe('PublicMasterComponent', () => {
  let component: PublicMasterComponent;
  let fixture: ComponentFixture<PublicMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
