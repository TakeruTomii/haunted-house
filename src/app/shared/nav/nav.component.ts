import { Component, Input, OnChanges, OnInit, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Sound, Validation } from '../../../app/shared/sharedFunction';
import { ErrorInfo, SoundInfo } from '../../../app/shared/dto';
import { ContextService } from '../inter-screen/context.service';
import { Router } from '@angular/router';
import { PAGE_BGMS, PAGE_NAME_CHEATED, ROOM_BGMS } from '../const';
import { InvalidOperationError } from '../error/errorClass';
import { LoadingDisplayService } from 'src/app/loading/display/loading-display.service';

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

  //Validation
  validFunc = new Validation();


  constructor(private screenCtx:ContextService,
              private router: Router,
              private loading: LoadingDisplayService) { }

  async ngOnInit(): Promise<void> {
    //loading start
    this.loading.showLoading();

    this.sound_setting = this.screenCtx.getSound();
    this.move_source = await this.soundFunc.createSound('kodutsumi.mp3', 1, false, '../../../assets/sound/');

    // bgm
    this.bgm_source = await this.setBGM(this.sound_setting.bgm_filename, this.sound_setting.volume);
    if(this.sound_setting.is_sound_on) {
      this.bgm_source.start();
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

    //loading end
    this.loading.hideLoading();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    // change bgm
    if(changes.sound_setting && !changes.sound_setting.isFirstChange()){
      if(this.sound_setting.is_sound_on){
        //loading start
        this.loading.showLoading();

        this.bgm_source.stop(0);
        this.bgm_source = await this.setBGM(this.sound_setting.bgm_filename, this.sound_setting.volume);
        this.bgm_source.start(0.5);

        //loading end
        this.loading.hideLoading();
      }
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
      let icon = document.getElementById('sound-icon');
      if(volume.value === "0"){
        icon.classList.add('volume-zero');
      }else{
        icon.classList.remove('volume-zero');
      }
    }
  }

  // set volume from external component temporary
  // use like stop bgm for sound effect
  // set back volume aftter what you did
  setVolume(volume:number) {
    this.volume_controller.gain.value = volume;
  }

  // stop BGM from other component
  stopBGM() {
    this.bgm_source.stop(0);
  }

  // move to other page on navigation bar
  async transitPage(page: string) {
    // Validation
    if(!this.validFunc.isValidPageName(page)){
      const message = PAGE_NAME_CHEATED;
      const err:ErrorInfo = { 'message': message }
      this.screenCtx.setError(err);
      throw new InvalidOperationError(message);
    }

    if(this.sound_setting.is_sound_on) {
      // Stop BGM
      this.bgm_source.stop();
      this.move_source.start();
      this.move_source =  await this.soundFunc.createSound('kodutsumi.mp3', 1, false, '../../../assets/sound/');
    }

    // Set information to next screen
    const sound: SoundInfo = {
      is_sound_on: this.sound_setting.is_sound_on,
      volume: this.sound_setting.volume,
      bgm_filename: PAGE_BGMS[page]
    }
    this.screenCtx.setSound(sound);

    // Transit to the Screen
    const path = '/' + page;
    if(path === location.pathname) {
      setTimeout(()=>{location.href = path;}, 500)
    } else {
      this.router.navigate([path])
    }

  }

  // move to HomeScreenComponent
  async transitHome() {
    if(this.sound_setting.is_sound_on) {
      // Stop BGM
      this.bgm_source.stop();
      this.move_source.start();
      this.move_source =  await this.soundFunc.createSound('kodutsumi.mp3', 1, false, '../../../assets/sound/');
    }

    // Set information to next screen
    const sound: SoundInfo = {
      is_sound_on: this.sound_setting.is_sound_on,
      volume: this.sound_setting.volume,
      bgm_filename: ROOM_BGMS.livingRoom
    }
    this.screenCtx.setSound(sound);

    // Transit Loading Screen
    this.router.navigate(['/home'])
  }

}
