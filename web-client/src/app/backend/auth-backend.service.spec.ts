import { TestBed, inject } from '@angular/core/testing';

import { AuthBackendService } from './auth-backend.service';

describe('AuthBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthBackendService]
    });
  });

  it('should ...', inject([AuthBackendService], (service: AuthBackendService) => {
    expect(service).toBeTruthy();
  }));
});
