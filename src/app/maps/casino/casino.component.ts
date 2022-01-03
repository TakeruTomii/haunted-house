import { Component, OnInit } from '@angular/core';
import { LoadingDisplayService } from 'src/app/loading/display/loading-display.service';
import { ROOM_NAME_CHEATED } from 'src/app/shared/const';
import { InvalidOperationError } from 'src/app/shared/error/errorClass';
import { ContextService } from 'src/app/shared/inter-screen/context.service';
import { Sound, Validation } from 'src/app/shared/sharedFunction';
import { ErrorInfo, RoomInfo, SoundInfo } from '../../shared/dto';
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

  //Validation
  validFunc = new Validation();

  constructor(private move: MoveRoomService,
              private screenCtx: ContextService) { }

  async ngOnInit(): Promise<void> {

    this.room_sound = this.screenCtx.getSound();
    this.move_source = await this.soundFunc.createSound('kodutsumi.mp3');

  }

  onMove(rname: string){
    // Validation
    if(!this.validFunc.isValidRoomName(rname)){
      const message = ROOM_NAME_CHEATED;
      const err:ErrorInfo = { 'message': message }
      this.screenCtx.setError(err);
      throw new InvalidOperationError(message);
    }

    if(this.room_sound.is_sound_on) {
      //play music
      this.move_source.start();
    }

    let room : RoomInfo = { roomName : rname };
    this.move.moveRoom(room);
  }

}
