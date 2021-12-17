import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/shared/inter-screen/context.service';
import { Sound } from 'src/app/shared/sharedFunction';
import { RoomInfo, SoundInfo } from '../../shared/dto';
import { MoveRoomService } from '../move-room/move-room.service';

@Component({
  selector: 'app-tea-room',
  templateUrl: './tea-room.component.html',
  styleUrls: ['./tea-room.component.css']
})
export class TeaRoomComponent implements OnInit {

  // Sound Settings
  room_sound:SoundInfo = null;
  move_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  constructor(private move: MoveRoomService,
              private screenCtx: ContextService) { }

  async ngOnInit(): Promise<void> {
    this.room_sound = this.screenCtx.getSound();
    this.move_source = await this.prepareSoundEffectSource('kodutsumi.mp3');
  }

  onMove(rname: string){

    if(this.room_sound.is_sound_on) {
      //play music
      this.move_source.start();
    }

    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }

  //prepare sound effect source to enter
  async prepareSoundEffectSource(filename:string):Promise<AudioBufferSourceNode> {
    let filePath = '../../assets/sound/' + filename
    let ctx = new AudioContext();
    let buf = await this.soundFunc.setupAudioBuffer(ctx, filePath);
    let gain = this.soundFunc.getGainNode(ctx, 1);
    let source = this.soundFunc.createAudioSource(ctx, buf, gain);
    return source;
  }

}
