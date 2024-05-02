import { TestBed } from '@angular/core/testing';

import { FetchApiService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: FetchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
