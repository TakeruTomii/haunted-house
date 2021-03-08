import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomInfo } from '../shared/dto';
import { TRANSITABLE_ROOMS } from '../shared/const';
import { MoveRoomService } from '../maps/move-room/move-room.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  //初期遷移時は居間を表示
  public room : RoomInfo = { roomName: 'livingRoom' }

  //遷移可能な部屋一覧
  rooms = TRANSITABLE_ROOMS;

  //表示する部屋のコンポーネント
  public currentRoomComponent: any = this.rooms[this.room.roomName];

  private subscription : Subscription;

  constructor(private move: MoveRoomService) { }

  ngOnInit(): void {
    //部屋情報更新時のデータを自動取得
    //イベントリスナーのようなもの
    this.subscription = this.move.currentRoom$.subscribe(
        RoomInfo => {
          this.room = RoomInfo;
          this.currentRoomComponent = this.rooms[RoomInfo.roomName];
        }
    );
  }

  ngOnDestroy(): void {
    //リソースリーク防止
    this.subscription.unsubscribe();
  }

}
