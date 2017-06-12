import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderPositionDialogComponent } from './add-order-position-dialog.component';

describe('AddOrderPositionDialogComponent', () => {
  let component: AddOrderPositionDialogComponent;
  let fixture: ComponentFixture<AddOrderPositionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderPositionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderPositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
