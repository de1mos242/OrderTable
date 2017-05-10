import { TestBed, inject } from '@angular/core/testing';

import { OrderIsOwnerGuardService } from './order-is-owner-guard.service';

describe('OrderIsOwnerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderIsOwnerGuardService]
    });
  });

  it('should ...', inject([OrderIsOwnerGuardService], (service: OrderIsOwnerGuardService) => {
    expect(service).toBeTruthy();
  }));
});
