import { TestBed } from '@angular/core/testing';

import { MoveRoomService } from './move-room.service';

describe('MoveRoomService', () => {
  let service: MoveRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
