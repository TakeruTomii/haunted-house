import { TestBed } from '@angular/core/testing';

import { HandleSerifsService } from './handle-serifs.service';

describe('HandleSerifsService', () => {
  let service: HandleSerifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleSerifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
