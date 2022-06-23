import {TestBed} from '@angular/core/testing';

import {SchoolSettingsService} from './school-settings.service';

describe('SchoolSettingsService', () => {
  let service: SchoolSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
