import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaidSumDialogComponent } from './edit-paid-sum-dialog.component';

describe('EditPaidSumDialogComponent', () => {
  let component: EditPaidSumDialogComponent;
  let fixture: ComponentFixture<EditPaidSumDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaidSumDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaidSumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
