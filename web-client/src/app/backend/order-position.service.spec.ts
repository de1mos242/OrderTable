import { TestBed, inject } from '@angular/core/testing';

import { OrderPositionService } from './order-position.service';

describe('OrderPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderPositionService]
    });
  });

  it('should ...', inject([OrderPositionService], (service: OrderPositionService) => {
    expect(service).toBeTruthy();
  }));
});
