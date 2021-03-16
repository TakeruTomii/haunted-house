import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitConf } from '../shared/dto';
import { INIT_LANGS, INIT_SOUNDS } from '../shared/const';

@Component({
  selector: 'app-init-conf',
  templateUrl: './init-conf.component.html',
  styleUrls: ['./init-conf.component.css']
})
export class InitConfComponent implements OnInit {
  // Language setting
  lang_selected='en';
  langs = INIT_LANGS;

  // Sound setting
  sound_selected='on';
  sounds = INIT_SOUNDS;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Pass initial settings to Loading Screen
  configure(){
    // Parameters to pass
    let conf : InitConf = {
      lang:this.lang_selected,
      sound:this.sound_selected
    };
    // Transit Loading Screen
    this.router.navigate(['/loading', conf])
  }
}
