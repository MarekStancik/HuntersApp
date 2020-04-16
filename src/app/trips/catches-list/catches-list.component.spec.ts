import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchesListComponent } from './catches-list.component';

describe('CatchesListComponent', () => {
  let component: CatchesListComponent;
  let fixture: ComponentFixture<CatchesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
