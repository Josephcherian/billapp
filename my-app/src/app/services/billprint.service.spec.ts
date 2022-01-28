import { TestBed } from '@angular/core/testing';

import { BillprintService } from './billprint.service';

describe('BillprintService', () => {
  let service: BillprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
