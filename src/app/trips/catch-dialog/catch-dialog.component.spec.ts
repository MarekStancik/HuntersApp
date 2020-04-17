import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchDialogComponent } from './catch-dialog.component';

describe('CatchDialogComponent', () => {
  let component: CatchDialogComponent;
  let fixture: ComponentFixture<CatchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
