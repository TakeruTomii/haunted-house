import { Component, OnInit } from '@angular/core';
import { RoomInfo } from '../../shared/dto';
import { MoveRoomService } from '../move-room/move-room.service';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {

  constructor(private move: MoveRoomService) { }

  ngOnInit(): void {
  }

  onMove(rname: string){
    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }

}
