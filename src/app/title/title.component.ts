import { AfterViewInit, Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { Router } from '@angular/router';
import { Sound } from '../../app/shared/sharedFunction';
import { SoundInfo } from '../shared/dto';
import { ContextService } from '../shared/inter-screen/context.service';
import { PAGE_BGMS, ROOM_BGMS } from '../shared/const';
import { LoadingDisplayService } from '../loading/display/loading-display.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  // Sound Settings
  page_sound:SoundInfo = null;
  thunder_source :AudioBufferSourceNode = null;
  bgm_source :AudioBufferSourceNode = null;
  enter_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  constructor(private router: Router,
              private screenCtx: ContextService,
              private loading: LoadingDisplayService) { }

  async ngOnInit(): Promise<void> {
    //loading start
    this.loading.showLoading();

    //prepare sound sources
    this.page_sound = this.screenCtx.getSound();

    this.thunder_source = await this.soundFunc.createSound('se_thunderbolt.mp3');
    this.bgm_source = await this.soundFunc.createSound(this.page_sound.bgm_filename, this.page_sound.volume, true);
    this.enter_source = await this.soundFunc.createSound('se_drop.mp3');

    if(this.page_sound.is_sound_on) {
      //play music
      this.thunder_source.start();
      this.bgm_source.start(4);
    }

    //Logo movement
    var logo = anime.timeline({
      targets:"#title-logo img",
      easing: 'linear'
    });

    logo
    .add({
      translateY: -50
    })
    .add({
      opacity: 1,
      translateY: 0,
      duration: 1000
    })

    //loading start
    this.loading.hideLoading();
  }

  // Transition to home screen
  transitHome() {
    if(this.page_sound.is_sound_on){
      this.bgm_source.stop();
      this.enter_source.start();
    }

    // Set information for next page
    let sound:SoundInfo = {
      is_sound_on: this.page_sound.is_sound_on,
      volume:  this.page_sound.volume,
      bgm_filename: ROOM_BGMS.livingRoom
    }
    this.screenCtx.setSound(sound);

    this.router.navigate(['/home']);
  }

}
