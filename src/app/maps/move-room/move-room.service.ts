import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RoomInfo } from '../../shared/dto';
import { MapsModule } from '../maps.module';

@Injectable({
  providedIn: 'root'
})
export class MoveRoomService {
  private moveRoomSource = new Subject<RoomInfo>();
  public currentRoom$ = this.moveRoomSource.asObservable();

  constructor() {}

  public moveRoom (room : RoomInfo){
    this.moveRoomSource.next(room);
  }

}
