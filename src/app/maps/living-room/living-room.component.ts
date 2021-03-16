import { Component, OnInit } from '@angular/core';
import { RoomInfo } from '../../shared/dto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from 'src/app/shared/serif/serif.component';
import { MoveRoomService } from '../move-room/move-room.service';

@Component({
  selector: 'app-living-room',
  templateUrl: './living-room.component.html',
  styleUrls: ['./living-room.component.css']
})

export class LivingRoomComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private move: MoveRoomService, private modal: BsModalService) { }

  ngOnInit(): void { }

  // Move Rooms
  onMove(rname: string) {
    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }

  // Open modal for serifs
  openSerifs(room : string, clicked : string){

    // Configs to open
    let initialState = {
      room: room,
      clicked: clicked
    };

    let show_config = {
      initialState,
      class: 'serif-modal',
      animated: false
    }

    this.modalRef = this.modal.show(SerifComponent, show_config);
  }
}
