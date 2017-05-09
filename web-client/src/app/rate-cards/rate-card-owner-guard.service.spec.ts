import { TestBed, inject } from '@angular/core/testing';

import { RateCardOwnerGuardService } from './rate-card-owner-guard.service';

describe('RateCardOwnerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateCardOwnerGuardService]
    });
  });

  it('should ...', inject([RateCardOwnerGuardService], (service: RateCardOwnerGuardService) => {
    expect(service).toBeTruthy();
  }));
});
