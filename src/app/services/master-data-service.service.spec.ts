import { TestBed } from '@angular/core/testing';

import { MasterDataServiceService } from './master-data-service.service';

describe('MasterDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterDataServiceService = TestBed.get(MasterDataServiceService);
    expect(service).toBeTruthy();
  });
});
