import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from '../serif/serif.component';
import anime from 'animejs/lib/anime.es.js';
import { SoundInfo } from '../dto';
import { Sound } from '../sharedFunction';
import { ContextService } from '../inter-screen/context.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  modalRef: BsModalRef;

  // Sound Setting
  page_sound:SoundInfo = null;
  current_volume:number = 0;
  gameover_source :AudioBufferSourceNode = null;
  restart_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  constructor(private modal: BsModalService, private screenCtx: ContextService) { }

  async ngOnInit(): Promise<void> {
    this.page_sound = this.screenCtx.getSound();
    if(this.page_sound.is_sound_on) {
      this.gameover_source = await this.soundFunc.createSound('gameover.mp3', 1, false, '../../../assets/sound/');
      this.restart_source = await this.soundFunc.createSound('se_drop.mp3', 1, false, '../../../assets/sound/');
    }
    this.openSerifs("Error", "Akabeko");
    this.modal.onHide.subscribe(()=>{
      this.showGameOver();
    });
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

  showGameOver() {
    if(this.page_sound.is_sound_on) {
      this.gameover_source.start();
    }

    const title_gameover = anime.timeline({
      targets: "#title_gameover",
      easing: 'easeInQuad'
    });

    title_gameover
    .add({
      translateY: -100,
      duration: 0
    })
    .add({
      opacity: 1,
      translateY: 0,
      duration: 1000
    });

    const exp = anime.timeline({
      targets: "#exp",
      easing: 'easeInQuad',
      duration: 3000
    });

    exp
    .add({
      opacity: 1,
    });

    const grave = anime.timeline({
      targets: "#grave",
      easing: 'easeInQuad',
      duration: 200
    });

    grave
    .add({
      opacity: 1,
    });

    const restart = anime.timeline({
      targets: "#restart",
      easing: 'linear',
      direction: 'alternate',
      loop:true,
      delay: 200,
      duration: 2000
    });

    restart
    .add({
      opacity: 1,
    });

  }

  restart(){
    if(this.page_sound.is_sound_on) {
      this.restart_source.start();
    }
    setTimeout(() => {
      location.href = '/';
    }, 1000);
  }

}
