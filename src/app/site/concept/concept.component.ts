import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import AOS from 'aos';
import { SoundInfo } from 'src/app/shared/dto';
import { ContextService } from 'src/app/shared/inter-screen/context.service';
import { NavComponent } from 'src/app/shared/nav/nav.component';
import { Sound } from 'src/app/shared/sharedFunction';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit, OnDestroy {
  // Sound Setting
  @ViewChild(NavComponent) private bgmVolume: NavComponent;
  is_bgm_stopped: boolean = false;
  page_sound: SoundInfo = null;
  current_volume: number = 0;
  horror_se_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  isOpenLastAccrodion = false;

  constructor(private screenCtx:ContextService) { }

  async ngOnInit(): Promise<void> {

    // set bgm information
    this.page_sound = this.screenCtx.getSound();

    this.current_volume = this.page_sound.volume;
    this.horror_se_source = await this.soundFunc.createSound('se_concept_horror.mp3');

    // accordion show movement
    AOS.init({
      duration:1500,
      once:true,
      offset: -100
    });

    // gimmick in scroll
    // show mouths background when scroll to the end with last accordion open
    document.addEventListener('scroll', this.lastAccordionEffect);

  }

  //define horror effect on scroling with open last accordion
  lastAccordionEffect = async (event: any): Promise<void> =>   {
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

        if(this.page_sound.is_sound_on) {
          this.bgmVolume.setVolume(0);
          if(this.is_bgm_stopped) {
            this.horror_se_source = await this.soundFunc.createSound('se_concept_horror.mp3');
          } else {
            this.horror_se_source.start();
          }
          this.is_bgm_stopped = true;
        }

      } else {
        document.getElementById('main-container').classList.remove("last-scroll");
        let accordion = document.querySelector("#acknowledge .accordion-content");
        accordion.classList.remove("clear-background");

        if(this.page_sound.is_sound_on && this.is_bgm_stopped){
          this.bgmVolume.setVolume(this.current_volume);
          this.is_bgm_stopped = false;
        }
      }
    }
  }

  // remove eventlistener of scroll
  ngOnDestroy() {
    document.removeEventListener('scroll', this.lastAccordionEffect);
  }

  setOpenStateOfLastAccordion() {
    this.isOpenLastAccrodion = !(this.isOpenLastAccrodion);
  }

  preserveVolume(volume:number) {
    this.current_volume = volume;
  }
}
