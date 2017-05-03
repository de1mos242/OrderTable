import { TestBed, inject } from '@angular/core/testing';

import { OrderModelResolver } from './order-model-resolver.service';

describe('OrderModelResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ OrderModelResolver]
    });
  });

  it('should ...', inject([ OrderModelResolver], (service: OrderModelResolver) => {
    expect(service).toBeTruthy();
  }));
});
