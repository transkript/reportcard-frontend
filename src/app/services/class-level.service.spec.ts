import { TestBed } from '@angular/core/testing';

import { ClassLevelService } from './class-level.service';

describe('ClassLevelService', () => {
  let service: ClassLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
