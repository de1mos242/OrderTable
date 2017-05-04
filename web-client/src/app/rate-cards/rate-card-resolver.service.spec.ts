import { TestBed, inject } from '@angular/core/testing';

import { RateCardResolverService } from './rate-card-resolver.service';

describe('RateCardResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateCardResolverService]
    });
  });

  it('should ...', inject([RateCardResolverService], (service: RateCardResolverService) => {
    expect(service).toBeTruthy();
  }));
});
