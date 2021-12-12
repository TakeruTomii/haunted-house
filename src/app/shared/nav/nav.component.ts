import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Sound } from '../../../app/shared/sharedFunction';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {

  // Sound Settings
  sound_selected='on';
  sounds = [
    {label:'ON', value: 'on'},
    {label:'OFF', value: 'off'}
  ]
  bgm_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();
  volume_controller:GainNode = null;

  constructor() { }

  async ngOnInit(): Promise<void> {
    // bgm
    this.bgm_source = await this.setBGM('koto_wo_omotte.mp3', 0.5);
    this.bgm_source.start(1);
    // volume
    var volume = document.getElementById('sound_input');
    var target = document.getElementById('vol_value');
    volume.addEventListener('input', this.volumeChange(volume, target));
  }

  async setBGM(bgm_filename:string, volume:number):Promise<AudioBufferSourceNode>{
    let url = '../../../assets/sound/' + bgm_filename;
    let ctx = new AudioContext();
    let buf = await this.soundFunc.setupAudioBuffer(ctx, url);
    let gain = this.soundFunc.getGainNode(ctx, volume);
    let source = this.soundFunc.createAudioSource(ctx, buf, gain);
    this.volume_controller = gain;
    return source;
  }

  volumeChange(volume, target) {
    return (event) => {
      // volume setting
      let vol =  Number(volume.value) / 100;
      console.log('vol = ' + vol);
      console.log('before volume_controller = ' + this.volume_controller.gain.value);
      this.volume_controller.gain.value = vol;
      console.log('after volume_controller = ' + this.volume_controller.gain.value);
      // volume icon display
      target.innerHTML = volume.value;
      var icon = document.getElementById('sound-icon');
      if(volume.value === "0"){
        icon.classList.add('volume-zero');
      }else{
        icon.classList.remove('volume-zero');
      }
    }
  }

}
