import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Sound } from '../../app/shared/sharedFunction';
import { PAGE_BGMS } from '../shared/const';
import { SoundInfo } from '../shared/dto';
import { ContextService } from '../shared/inter-screen/context.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  // Initial Settings
  lang=''
  sound=''

  //sound setting
  page_sound:SoundInfo = null;
  soundFunc = new Sound();

  constructor(private router: Router,
              private screenCtx: ContextService) { }

  async ngOnInit(): Promise<void> {
    //Sound Setting
    this.page_sound = this.screenCtx.getSound();
    // TODO: error handling
    if(!this.page_sound) {
      this.page_sound = {
        is_sound_on: false,
        volume: 0,
        bgm_filename: PAGE_BGMS["loading"]
      }
    }

    let source: AudioBufferSourceNode = null;
    if(this.page_sound.is_sound_on) {
      let filepath = '../../assets/sound/' + this.page_sound.bgm_filename;
      let ctx = new AudioContext();
      let buf = await this.soundFunc.setupAudioBuffer(ctx, filepath);
      let gain = this.soundFunc.getGainNode(ctx, this.page_sound.volume);
      source = this.soundFunc.createAudioSource(ctx, buf, gain);
      source.start();
    }

    // Set information for next page
    let sound:SoundInfo = {
      is_sound_on: this.page_sound.is_sound_on,
      volume:  this.page_sound.volume,
      bgm_filename: PAGE_BGMS.title
    }
    this.screenCtx.setSound(sound);

    // Go to title Screen in 3 seconds
    setTimeout(()=>{
      if(this.page_sound.is_sound_on) {
        source.stop();
      }
      this.router.navigate(['/title'])
    },3000);

  }

}
