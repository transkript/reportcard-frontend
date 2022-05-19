import { TestBed } from '@angular/core/testing';

import { SubjectRegistrationService } from './subject-registration.service';

describe('SubjectRegistrationService', () => {
  let service: SubjectRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
