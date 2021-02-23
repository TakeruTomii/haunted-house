import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomInfo } from 'src/app/dto';
import { MoveRoomService } from 'src/app/service/move-room/move-room.service';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { SerifComponent } from 'src/app/common/serif/serif.component';


@Component({
  selector: 'app-living-room',
  templateUrl: './living-room.component.html',
  styleUrls: ['./living-room.component.css']
})


export class LivingRoomComponent implements OnInit {
  @ViewChild(SerifComponent) serif : SerifComponent;

  constructor(private move: MoveRoomService, private modal: BsModalService) { }

  ngOnInit(): void {
  }

  //部屋移動
  onMove(rname: string) {
    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }
  //セリフ用モーダルオープン
  openSerifs(){
    this.serif.initModal();
  }
}
