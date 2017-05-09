import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRateCardsManagerComponent } from './order-rate-cards-manager.component';

describe('OrderRateCardsManagerComponent', () => {
  let component: OrderRateCardsManagerComponent;
  let fixture: ComponentFixture<OrderRateCardsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRateCardsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRateCardsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
