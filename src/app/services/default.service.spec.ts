import { TestBed } from '@angular/core/testing';

import { DefaultService } from './default.service';

describe('DefaultService', () => {
  let service: DefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
