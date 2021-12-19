import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/inter-screen/context.service';
import { Sound } from 'src/app/shared/sharedFunction';
import { RoomInfo, SoundInfo } from '../../shared/dto';
import { MoveRoomService } from '../move-room/move-room.service';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {
  // Sound Settings
  room_sound:SoundInfo = null;
  move_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  constructor(private move: MoveRoomService,
              private screenCtx: ContextService) { }

  async ngOnInit(): Promise<void> {
    this.room_sound = this.screenCtx.getSound();
    this.move_source = await this.soundFunc.createSound('kodutsumi.mp3');
  }

  onMove(rname: string){

    if(this.room_sound.is_sound_on) {
      //play music
      this.move_source.start();
    }

    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }

}
