import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomInfo, soundInfo } from '../shared/dto';
import { TRANSITABLE_ROOMS, ROOM_BGMS } from '../shared/const';
import { MoveRoomService } from '../maps/move-room/move-room.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  // Sound Setting
  room_sound:soundInfo;
  current_volume:number = 0.5;

  // Show Living Room for Initiation.
  public room : RoomInfo = { roomName: 'livingRoom' }

  // Transitable Rooms List
  rooms = TRANSITABLE_ROOMS;
  bgms = ROOM_BGMS;

  // Component of Rooms on display
  public currentRoomComponent: any = this.rooms[this.room.roomName];

  private subscription : Subscription;

  constructor(private move: MoveRoomService) { }

  ngOnInit(): void {
    this.room_sound = {
      is_sound_on:true,
      volume:this.current_volume,
      bgm_filename:"koto_wo_omotte.mp3"
    }

    // Automatically follow updating room informations
    // It's a type of event listener
    this.subscription = this.move.currentRoom$.subscribe(
        RoomInfo => {
          //change room
          this.room = RoomInfo;
          this.currentRoomComponent = this.rooms[RoomInfo.roomName];
          //change sound
          this.room_sound = {
            is_sound_on:true,
            volume:this.current_volume,
            bgm_filename:this.bgms[RoomInfo.roomName]
          };
          console.log('this.room_sound.bgm_filename = ' + this.room_sound.bgm_filename)
        }
    );
  }

  ngOnDestroy(): void {
    // Prevent Resource Leak
    this.subscription.unsubscribe();
  }

  preserveVolume(volume:number) {
    this.current_volume = volume;
  }

}
