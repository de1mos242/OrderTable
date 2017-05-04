import { TestBed, inject } from '@angular/core/testing';

import { RateCardService } from './rate-card.service';

describe('RateCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateCardService]
    });
  });

  it('should ...', inject([RateCardService], (service: RateCardService) => {
    expect(service).toBeTruthy();
  }));
});
