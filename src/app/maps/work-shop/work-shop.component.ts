import { Component, OnInit } from '@angular/core';
import { RoomInfo } from 'src/app/dto';
import { MoveRoomService } from 'src/app/service/move-room/move-room.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from 'src/app/common/serif/serif.component';

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
