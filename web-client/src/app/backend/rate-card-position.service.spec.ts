import { TestBed, inject } from '@angular/core/testing';

import { RateCardPositionService } from './rate-card-position.service';

describe('RateCardPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateCardPositionService]
    });
  });

  it('should ...', inject([RateCardPositionService], (service: RateCardPositionService) => {
    expect(service).toBeTruthy();
  }));
});
