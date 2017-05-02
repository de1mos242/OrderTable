import { TestBed, inject } from '@angular/core/testing';

import { UserCredentialsStorageService } from './user-credentials-storage.service';

describe('UserCredentialsStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCredentialsStorageService]
    });
  });

  it('should ...', inject([UserCredentialsStorageService], (service: UserCredentialsStorageService) => {
    expect(service).toBeTruthy();
  }));
});
