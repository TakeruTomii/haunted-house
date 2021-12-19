import { Component, Input, OnChanges, OnInit, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Sound } from '../../../app/shared/sharedFunction';
import { SoundInfo } from '../../../app/shared/dto';
import { ContextService } from '../inter-screen/context.service';
import { Router } from '@angular/router';
import { PAGE_BGMS, ROOM_BGMS } from '../const';

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
  move_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();
  volume_controller:GainNode = null;
  volume_display:string = '';


  constructor(private screenCtx:ContextService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.sound_setting = this.screenCtx.getSound();
    this.move_source = await this.soundFunc.createSound('kodutsumi.mp3', 1, false, '../../../assets/sound/');

    // bgm
    this.bgm_source = await this.soundFunc.createSound(this.sound_setting.bgm_filename, this.sound_setting.volume, true, '../../../assets/sound/');
    if(this.sound_setting.is_sound_on) {
      this.bgm_source.start(1);
    }

    // volume
    let volume:any = document.getElementById('sound_input');
    let target = document.getElementById('vol_value');
    volume.addEventListener('input', this.volumeChange(volume, target));
    let vol_val = Math.floor(this.sound_setting.volume * 100)
    this.volume_display = String(vol_val);
    volume.value = vol_val;
    if(vol_val === 0) {
      let icon = document.getElementById('sound-icon');
      icon.classList.add('volume-zero');
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // change bgm
    if(changes.sound_setting && !changes.sound_setting.isFirstChange()){
      if(this.sound_setting.is_sound_on){
        this.bgm_source.stop(0);
        this.bgm_source = await this.soundFunc.createSound(this.sound_setting.bgm_filename, this.sound_setting.volume, true, '../../../assets/sound/');
        this.bgm_source.start(0.5);
      }
    }
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
      let icon = document.getElementById('sound-icon');
      if(volume.value === "0"){
        icon.classList.add('volume-zero');
      }else{
        icon.classList.remove('volume-zero');
      }
    }
  }

  transitPage(page: string) {
    if(this.sound_setting.is_sound_on) {
      // Stop BGM
      this.bgm_source.stop();
      this.move_source.start();
    }

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

  transitHome() {
    if(this.sound_setting.is_sound_on) {
      // Stop BGM
      this.bgm_source.stop();
      this.move_source.start();
    }

    // Set information to next screen
    let sound: SoundInfo = {
      is_sound_on: this.sound_setting.is_sound_on,
      volume: this.sound_setting.volume,
      bgm_filename: ROOM_BGMS.livingRoom
    }
    this.screenCtx.setSound(sound);

    // Transit Loading Screen
    this.router.navigate(['/home'])
  }

}
