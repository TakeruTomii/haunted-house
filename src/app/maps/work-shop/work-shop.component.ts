import { Component, OnInit } from '@angular/core';
import { RoomInfo } from '../../shared/dto';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MoveRoomService } from '../move-room/move-room.service';
import { SerifComponent } from 'src/app/shared/serif/serif.component';

@Component({
  selector: 'app-work-shop',
  templateUrl: './work-shop.component.html',
  styleUrls: ['./work-shop.component.css']
})

export class WorkShopComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private move: MoveRoomService, private modal: BsModalService) { }

  ngOnInit(): void {
  }

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
