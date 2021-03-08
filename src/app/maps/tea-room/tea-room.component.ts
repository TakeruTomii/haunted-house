import { Component, OnInit } from '@angular/core';
import { RoomInfo } from '../../shared/dto';
import { MoveRoomService } from '../move-room/move-room.service';

@Component({
  selector: 'app-tea-room',
  templateUrl: './tea-room.component.html',
  styleUrls: ['./tea-room.component.css']
})
export class TeaRoomComponent implements OnInit {

  constructor(private move: MoveRoomService) { }

  ngOnInit(): void {
  }

  onMove(rname: string){
    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }

}
