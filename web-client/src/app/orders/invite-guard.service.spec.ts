import { TestBed, inject } from '@angular/core/testing';

import { InviteGuard } from './invite-guard.service';

describe('InviteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ InviteGuard]
    });
  });

  it('should ...', inject([ InviteGuard], (service: InviteGuard) => {
    expect(service).toBeTruthy();
  }));
});
