import { Injectable } from '@angular/core';
import { SoundInfo } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private _sound: SoundInfo;

  constructor() { }

  setSound(sound:SoundInfo) {
    this._sound = sound;
    sessionStorage.setItem('is_sound_on', String(sound.is_sound_on));
    sessionStorage.setItem('volume', String(sound.volume));
    sessionStorage.setItem('bgm_filename', sound.bgm_filename);
  }

  getSound() {
    if(!this._sound) {
      const str_is_sound_on = sessionStorage.getItem('is_sound_on');
      const str_volume = sessionStorage.getItem('volume');
      const bgm_filename = sessionStorage.getItem('bgm_filename');
      this._sound = {
        is_sound_on: (str_is_sound_on === 'true') ? true : false,
        volume: Number(str_volume).valueOf(),
        bgm_filename: bgm_filename
      }
    }
    return this._sound;
  }
}
