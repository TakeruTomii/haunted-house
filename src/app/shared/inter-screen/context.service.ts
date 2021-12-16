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
  }

  getSound(sound:SoundInfo) {
    return this._sound;
  }
}
