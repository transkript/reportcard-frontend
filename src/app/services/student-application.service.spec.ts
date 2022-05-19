import { TestBed } from '@angular/core/testing';

import { StudentApplicationService } from './student-application.service';

describe('StudentApplicationService', () => {
  let service: StudentApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
