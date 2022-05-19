import { TestBed } from '@angular/core/testing';

import { ClassLevelSubService } from './class-level-sub.service';

describe('ClassLevelSubService', () => {
  let service: ClassLevelSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassLevelSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
