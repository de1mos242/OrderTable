import { TestBed, inject } from '@angular/core/testing';

import { OrderPaymentService } from './order-payment.service';

describe('OrderPaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderPaymentService]
    });
  });

  it('should be created', inject([OrderPaymentService], (service: OrderPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
