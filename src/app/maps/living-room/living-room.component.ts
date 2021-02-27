import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RoomInfo } from 'src/app/dto';
import { MoveRoomService } from 'src/app/service/move-room/move-room.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SerifComponent } from 'src/app/common/serif/serif.component';

@Component({
  selector: 'app-living-room',
  templateUrl: './living-room.component.html',
  styleUrls: ['./living-room.component.css']
})

export class LivingRoomComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private move: MoveRoomService, private modal: BsModalService) { }

  ngOnInit(): void { }

  //部屋移動
  onMove(rname: string) {
    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }

  //セリフ用モーダルオープン
  openSerifs(room : string, clicked : string){

    //オープン用コンフィグ
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
