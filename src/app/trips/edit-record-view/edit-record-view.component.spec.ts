import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecordViewComponent } from './edit-record-view.component';

describe('EditRecordViewComponent', () => {
  let component: EditRecordViewComponent;
  let fixture: ComponentFixture<EditRecordViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecordViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
