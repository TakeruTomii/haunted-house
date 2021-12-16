import { Component, Input, OnChanges, OnInit, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Sound } from '../../../app/shared/sharedFunction';
import { SoundInfo } from '../../../app/shared/dto';
import { ContextService } from '../inter-screen/context.service';
import { Router } from '@angular/router';
import { PAGE_BGMS } from '../const';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit, OnChanges {

  // Sound Settings
  @Input() sound_setting:SoundInfo;
  @Output() volume_changed:EventEmitter<Number> = new EventEmitter<Number>();
  bgm_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();
  volume_controller:GainNode = null;
  volume_display:string = '';

  constructor(private screenCtx:ContextService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.sound_setting = this.screenCtx.getSound();

    // bgm
    this.bgm_source = await this.setBGM(this.sound_setting.bgm_filename, this.sound_setting.volume);
    this.bgm_source.start(1);

    // volume
    let volume:any = document.getElementById('sound_input');
    let target = document.getElementById('vol_value');
    volume.addEventListener('input', this.volumeChange(volume, target));
    let vol_val = Math.floor(this.sound_setting.volume * 100)
    this.volume_display = String(vol_val);
    volume.value = vol_val;
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // change bgm
    if(changes.sound_setting && !changes.sound_setting.isFirstChange()){
      this.bgm_source.stop(0);
      this.bgm_source = await this.setBGM(this.sound_setting.bgm_filename, this.sound_setting.volume);
      this.bgm_source.start(0.5);
    }
  }

  //get audio source for bgm
  async setBGM(bgm_filename:string, volume:number):Promise<AudioBufferSourceNode>{
    let url = '../../../assets/sound/' + bgm_filename;
    let ctx = new AudioContext();
    let buf = await this.soundFunc.setupAudioBuffer(ctx, url);
    let gain = this.soundFunc.getGainNode(ctx, volume);
    let source = this.soundFunc.createAudioSource(ctx, buf, gain, true);
    this.volume_controller = gain;
    return source;
  }

  // change volume along range input
  volumeChange(volume, target) {
    return (event) => {
      // volume setting
      let vol =  Number(volume.value) / 100;
      this.volume_controller.gain.value = vol;
      this.sound_setting.volume = vol;
      this.volume_changed.emit(vol);
      // volume icon display
      this.volume_display = volume.value;
      var icon = document.getElementById('sound-icon');
      if(volume.value === "0"){
        icon.classList.add('volume-zero');
      }else{
        icon.classList.remove('volume-zero');
      }
    }
  }

  transitPage(page: string) {
    // Stop BGM
    this.bgm_source.stop();

    // Set information to next screen
    let sound: SoundInfo = {
      is_sound_on: this.sound_setting.is_sound_on,
      volume: this.sound_setting.volume,
      bgm_filename: PAGE_BGMS[page]
    }
    this.screenCtx.setSound(sound);

    // Transit Loading Screen
    let path = '/' + page;
    this.router.navigate([path])
  }

}
