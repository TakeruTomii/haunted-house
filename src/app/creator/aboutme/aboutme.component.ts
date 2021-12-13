import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from '../../shared/serif/serif.component';
import { STATUS_PATTERNS, SKILL_SLIDES, PREFIX_PORTRAIT, IMG_PATH_ABOUT_ME, EXT_PORTRAIT, EXT_ATTR} from '../../shared/const';
import AOS from 'aos';
import anime from 'animejs/lib/anime.es.js';
import { soundInfo } from 'src/app/shared/dto';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css'],
})
export class AboutMeComponent implements OnInit {
  modalRef: BsModalRef;

  // Sound Setting
  page_sound:soundInfo;
  current_volume:number = 0.5;

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


  constructor(private modal: BsModalService) {}

  ngOnInit(): void {
    // set bgm information
    this.page_sound = {
      is_sound_on:true,
      volume:this.current_volume,
      bgm_filename:"shamisendokusou_ma.mp3"
    }

    // simple show movement
    AOS.init({
      duration:2000,
      once:true
    });

    // horror effects
    // scroll movement
    window.addEventListener('scroll', () => {
      var window_half_top = window.innerHeight / 2;
      var eye_height = window.innerHeight * 0.5;
      var mouths_height = window.innerHeight;

      var horror_eye = document.getElementById('horror_eye');
      var horror_eye_top = horror_eye.getBoundingClientRect().top;

      var horror_mouths = document.getElementById('horror_mouths');
      var horror_mouths_top = horror_mouths.getBoundingClientRect().top;

      // eye movement
      if(horror_eye_top <= window_half_top){
        var eye_appear = anime.timeline({
          targets: horror_eye,
          easing: 'easeInQuad',
          duration: 100
        });

        eye_appear
        .add({
          height: eye_height,
        });
      } else {
        horror_eye.style.height = "0px";
      }

      //mouths movement
      if(horror_mouths_top <= window_half_top){
        var mouths_appear = anime.timeline({
          targets: horror_mouths,
          easing: 'easeInQuad',
          duration: 150
        });

        mouths_appear
        .add({
          height: mouths_height,
        });
      } else {
        horror_mouths.style.height = "0px";
      }
    });

    //scroll(makimono) associate movement
    //open dimension
    var makimono = document.querySelector('details');
    makimono.addEventListener('toggle', () => {
      var exit_area = document.getElementById('exit');
      if(makimono.open) {
        exit_area.style.display = 'flex';
      } else {
        exit_area.style.display = 'none';
      }
    });

    // Initiate display items of status
    this.setPortraitAttr();
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
