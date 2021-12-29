import { Component, OnInit } from '@angular/core';
import { ErrorInfo, RoomInfo, SoundInfo } from '../../shared/dto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from 'src/app/shared/serif/serif.component';
import { MoveRoomService } from '../move-room/move-room.service';
import { Sound, Validation } from '../../shared/sharedFunction';
import { ContextService } from 'src/app/shared/inter-screen/context.service';
import { ROOM_NAME_CHEATED } from 'src/app/shared/const';
import { InvalidOperationError } from 'src/app/shared/error/errorClass';

@Component({
  selector: 'app-living-room',
  templateUrl: './living-room.component.html',
  styleUrls: ['./living-room.component.css']
})

export class LivingRoomComponent implements OnInit {
  modalRef: BsModalRef;

  // Sound Settings
  room_sound:SoundInfo = null;
  move_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  //Validation
  validFunc = new Validation();

  constructor(private move: MoveRoomService,
              private modal: BsModalService,
              private screenCtx: ContextService) { }

  async ngOnInit(): Promise<void> {
    this.room_sound = this.screenCtx.getSound();
    this.move_source = await this.soundFunc.createSound('kodutsumi.mp3');
  }

  // Move Rooms
  onMove(rname: string) {
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

  // Open modal for serifs
  openSerifs(room : string, clicked : string){

    // Configs to open
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
