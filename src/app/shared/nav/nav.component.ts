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

  constructor() { }

  async ngOnInit(): Promise<void> {
    // bgm
    this.bgm_source = await this.setBGM('koto_wo_omotte.mp3')
    this.bgm_source.start(1);
    // volume
    var volume = document.getElementById('sound_input');
    var target = document.getElementById('vol_value');
    volume.addEventListener('input', this.volumeChange(volume, target));
  }

  async setBGM(bgm_filename:string):Promise<AudioBufferSourceNode>{
    let url = '../../../assets/sound/' + bgm_filename;
    let ctx = new AudioContext();
    let buf = await this.soundFunc.setupAudioBuffer(ctx, url);
    let source = this.soundFunc.createAudioSource(ctx, buf);
    return source;
  }

  volumeChange(volume, target) {
    return (event) => {
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
