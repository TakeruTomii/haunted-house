import { TestBed } from '@angular/core/testing';

import { ContactmeService } from './sendmail.service';

describe('ContactmeService', () => {
  let service: ContactmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
