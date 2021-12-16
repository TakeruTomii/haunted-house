import { Component, Input, OnChanges, OnInit, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Sound } from '../../../app/shared/sharedFunction';
import { SoundInfo } from '../../../app/shared/dto';

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

  constructor() { }

  async ngOnInit(): Promise<void> {
    // bgm
    this.bgm_source = await this.setBGM(this.sound_setting.bgm_filename, this.sound_setting.volume);
    this.bgm_source.start(1);
    // volume
    var volume = document.getElementById('sound_input');
    var target = document.getElementById('vol_value');
    volume.addEventListener('input', this.volumeChange(volume, target));
    this.volume_display = String(this.sound_setting.volume * 100);
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

}
