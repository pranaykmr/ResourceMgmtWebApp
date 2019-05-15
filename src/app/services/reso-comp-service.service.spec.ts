import { TestBed } from '@angular/core/testing';

import { ResoCompServiceService } from './reso-comp-service.service';

describe('ResoCompServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResoCompServiceService = TestBed.get(ResoCompServiceService);
    expect(service).toBeTruthy();
  });
});
