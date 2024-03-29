import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from '../../shared/serif/serif.component';
import { STATUS_PATTERNS, SKILL_SLIDES, PREFIX_PORTRAIT, IMG_PATH_ABOUT_ME, EXT_PORTRAIT, EXT_ATTR, PAGE_BGMS} from '../../shared/const';
import AOS from 'aos';
import anime from 'animejs/lib/anime.es.js';
import { SoundInfo } from 'src/app/shared/dto';
import { ContextService } from 'src/app/shared/inter-screen/context.service';
import { Sound } from 'src/app/shared/sharedFunction';
import * as _ from 'lodash';
import { add } from 'lodash';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css'],
})
export class AboutMeComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;

  // Sound Setting
  page_sound:SoundInfo = null;
  current_volume:number = 0;
  horror_eye_source :AudioBufferSourceNode = null;
  horror_mouths_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();
  is_horror_eye_played :boolean = false;
  is_horror_mouths_played :boolean = false;

  // URLs of Certifications
  url_ipa_exam = "https://www.jitec.ipa.go.jp/2_01english/02examcategories.html";
  url_python_exam = "https://www.pythonic-exam.com/basic-examination";

  // Status variables
  portrait_path : string;
  attr_path : string;
  str_val : string;
  str_unit : string;
  comment_content : string;
  speacies : string;
  exp_content : string;
  current_age : number;

  // Carousel of Skills
  slides = SKILL_SLIDES;
  stop_sliding = 0; // prevent sliding of carousel

  //horror effect
  horror_effect = null;


  constructor(private modal: BsModalService,
              private screenCtx: ContextService) {}

  async ngOnInit(): Promise<void> {

    // set bgm information
    this.page_sound = this.screenCtx.getSound();

    this.horror_eye_source = await this.soundFunc.createSound('se_horror_eye.mp3');
    this.horror_mouths_source = await this.soundFunc.createSound('se_horror_mouths.mp3');

    // simple show movement
    AOS.init({
      duration:2000,
      once:true
    });

    // horror effects
    // scroll movement
    this.horror_effect = _.throttle(this.horrorEffect, 300)
    document.addEventListener('scroll', this.horror_effect);

    //scroll(makimono) associate movement
    //open dimension
    const makimono = document.querySelector('details');
    makimono.addEventListener('toggle', () => {
      const exit_area = document.getElementById('exit');
      if(makimono.open) {
        exit_area.style.display = 'flex';
      } else {
        exit_area.style.display = 'none';
      }
    });

    // Initiate display items of status
    this.setPortraitAttr();

  }

  // define horror effect on scrolling
  horrorEffect = (event: any): void =>  {
    const window_half_top = window.innerHeight / 2;
    const eye_height = window.innerHeight;
    const mouths_height = window.innerHeight;

    const horror_eye = document.getElementById('horror_eye');
    const horror_eye_top = horror_eye.getBoundingClientRect().top;

    const horror_mouths = document.getElementById('horror_mouths');
    const horror_mouths_top = horror_mouths.getBoundingClientRect().top;

    const horror_hand = document.getElementById('horror-hand');
    const horror_mouth = document.getElementById('horror-mouth');

    // eye movement
    if(horror_eye_top <= window_half_top){
      const eye_appear = anime.timeline({
        targets: horror_eye,
        easing: 'easeInQuad',
        duration: 100
      });

      eye_appear
      .add({
        height: eye_height
      });

      //play sound
      if(this.page_sound.is_sound_on && !this.is_horror_eye_played) {
        this.horror_eye_source.start();
      }
      this.is_horror_eye_played = true;

    } else {
      horror_eye.style.height = "0px";
    }

    //mouths movement
    if(horror_mouths_top <= window_half_top){
      const mouths_appear = anime.timeline({
        targets: horror_mouths,
        easing: 'easeInQuad',
        duration: 150
      });

      mouths_appear
      .add({
        height: mouths_height,
      });

      //hand movement
      if(!this.is_horror_mouths_played) {
        const hand_appear = anime.timeline({
          easing: 'linear'
        });

        hand_appear
        .add({
          targets: horror_hand,
          delay: 150,
          duration: 1000,
          scale: 3
        })
        .add({
          targets: horror_hand,
          delay: 500,
          duration: 200,
          opacity: 0,
          translateY: -50
        })
        .add({
          targets: horror_mouth,
          duration: 200,
          opacity: 1
        })
        .add({
          targets: horror_hand,
          duration: 100,
          scale: 1,
          translateY: 0
        });

        // vibrate smartphone
        window.navigator.vibrate(1000);

      }

      //play sound
      if(this.page_sound.is_sound_on && !this.is_horror_mouths_played) {
        this.horror_mouths_source.start();
      }
      this.is_horror_mouths_played = true;


    } else {
      horror_mouths.style.height = "0px";
    }
  }

  // remove eventlistener of scroll
  ngOnDestroy() {
    document.removeEventListener('scroll', this.horror_effect);
  }


  setPortraitAttr() {
    // Initiate display items of status
    // get current status randomly
    let len_patterns = STATUS_PATTERNS.length;
    let index = Math.floor(Math.random() * len_patterns);
    let current_status = STATUS_PATTERNS[index];
    let birth_date = new Date('1994-07-18 00:00:00');
    let seconds_of_year = 365 * 24 * 60 * 60 * 1000;

    // set display items
    this.portrait_path = IMG_PATH_ABOUT_ME + PREFIX_PORTRAIT + current_status.attr + EXT_PORTRAIT;
    this.attr_path = IMG_PATH_ABOUT_ME + current_status.attr + EXT_ATTR;
    this.str_val = current_status.str_val;
    this.str_unit = current_status.str_unit;
    this.comment_content = current_status.comment;
    this.speacies = current_status.speacies;
    this.exp_content = current_status.exp;
    this.current_age = Math.floor((Date.now() - birth_date.getTime()) / seconds_of_year);
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

  preserveVolume(volume:number) {
    this.current_volume = volume;
  }

}
