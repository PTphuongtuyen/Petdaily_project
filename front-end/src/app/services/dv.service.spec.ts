import { TestBed } from '@angular/core/testing';

import { DvService } from './dv.service';

describe('DvService', () => {
  let service: DvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
