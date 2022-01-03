import { TestBed } from '@angular/core/testing';

import { LoadingDisplayService } from './loading-display.service';

describe('LoadingDisplayService', () => {
  let service: LoadingDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
