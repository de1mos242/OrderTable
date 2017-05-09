import { TestBed, inject } from '@angular/core/testing';

import { OrderParticipantGuardService } from './order-participant-guard.service';

describe('OrderParticipantGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderParticipantGuardService]
    });
  });

  it('should ...', inject([OrderParticipantGuardService], (service: OrderParticipantGuardService) => {
    expect(service).toBeTruthy();
  }));
});
