import { TestBed } from '@angular/core/testing';

import { ClassListService } from './class-list.service';

describe('ClassListService', () => {
  let service: ClassListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
