import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocationsViewComponent } from './admin-locations-view.component';

describe('AdminLocationsViewComponent', () => {
  let component: AdminLocationsViewComponent;
  let fixture: ComponentFixture<AdminLocationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLocationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLocationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
