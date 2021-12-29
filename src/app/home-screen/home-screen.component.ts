import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomInfo, SoundInfo } from '../shared/dto';
import { TRANSITABLE_ROOMS, ROOM_BGMS } from '../shared/const';
import { MoveRoomService } from '../maps/move-room/move-room.service';
import { ContextService } from '../shared/inter-screen/context.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit, OnDestroy {
  // Sound Setting
  room_sound: SoundInfo = null;
  current_volume: number = 0;

  // Show Living Room for Initiation.
  public room : RoomInfo = { roomName: 'livingRoom' }

  // Transitable Rooms List
  rooms = TRANSITABLE_ROOMS;
  bgms = ROOM_BGMS;

  // Component of Rooms on display
  public currentRoomComponent: any = this.rooms[this.room.roomName];

  private subscription : Subscription;

  constructor(private move: MoveRoomService,
              private screenCtx: ContextService) { }

  ngOnInit(): void {
    //set bgm information
    this.room_sound = this.screenCtx.getSound();

    this.current_volume = this.room_sound['volume'];

    // Automatically follow updating room informations
    // It's a type of event listener
    this.subscription = this.move.currentRoom$.subscribe(
        RoomInfo => {
          //change room
          this.room = RoomInfo;
          this.currentRoomComponent = this.rooms[RoomInfo.roomName];
          //change sound
          this.room_sound = {
            is_sound_on:this.room_sound.is_sound_on,
            volume:this.current_volume,
            bgm_filename:this.bgms[RoomInfo.roomName]
          };
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
