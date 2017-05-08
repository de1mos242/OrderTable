import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPositionsEditComponent } from './order-positions-edit.component';

describe('OrderPositionsEditComponent', () => {
  let component: OrderPositionsEditComponent;
  let fixture: ComponentFixture<OrderPositionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPositionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPositionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
