import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { PAGE_BGMS } from 'src/app/shared/const';
import { SoundInfo } from 'src/app/shared/dto';
import { ContextService } from 'src/app/shared/inter-screen/context.service';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {
  // Sound Setting
  page_sound:SoundInfo = null;
  current_volume:number = 0;

  isOpenLastAccrodion = false;

  constructor(private screenCtx:ContextService) { }

  ngOnInit(): void {
    // set bgm information
    this.page_sound = this.screenCtx.getSound();
    // TODO: error handling
    if(!this.page_sound) {
      this.page_sound = {
        is_sound_on: false,
        volume: 0,
        bgm_filename: PAGE_BGMS["concept"]
      }
    }

    // accordion show movement
    AOS.init({
      duration:1000,
      once:true,
      offset: -100
    });

    // gimmick in scroll
    // show mouths background when scroll to the end with last accordion open
    window.addEventListener('scroll', () => {
      if(this.isOpenLastAccrodion) {
        let scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
        let pageMostBottom = scrollHeight - window.innerHeight - 5;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // action when scroll to the bottom
        if (scrollTop >= pageMostBottom) {
          document.getElementById('main-container').classList.add("last-scroll");
          let accordion = document.querySelector("#acknowledge .accordion-content");
          accordion.classList.add("clear-background");
        } else {
          document.getElementById('main-container').classList.remove("last-scroll");
          let accordion = document.querySelector("#acknowledge .accordion-content");
          accordion.classList.remove("clear-background");
        }
      }
    });
  }

  setOpenStateOfLastAccordion() {
    this.isOpenLastAccrodion = !(this.isOpenLastAccrodion);
  }

  preserveVolume(volume:number) {
    this.current_volume = volume;
  }
}
