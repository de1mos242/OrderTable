import { TestBed, inject } from '@angular/core/testing';

import { OrderEventService } from './order-event.service';

describe('OrderEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderEventService]
    });
  });

  it('should ...', inject([OrderEventService], (service: OrderEventService) => {
    expect(service).toBeTruthy();
  }));
});
