import { Component, OnInit, ViewChild } from '@angular/core';
import { SerifComponent } from 'src/app/common/serif/serif.component';
import { RoomInfo } from 'src/app/dto';
import { MoveRoomService } from 'src/app/service/move-room/move-room.service';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-work-shop',
  templateUrl: './work-shop.component.html',
  styleUrls: ['./work-shop.component.css']
})
export class WorkShopComponent implements OnInit {
  @ViewChild(SerifComponent) serif : SerifComponent;

  constructor(private move: MoveRoomService, private modal: BsModalService) { }

  ngOnInit(): void {
  }

  //部屋移動
  onMove(rname: string){
    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }

  //セリフ用モーダルオープン
  openSerifs(){
    this.serif.initModal();
  }
}
