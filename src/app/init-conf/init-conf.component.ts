import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitConf } from '../shared/dto';

@Component({
  selector: 'app-init-conf',
  templateUrl: './init-conf.component.html',
  styleUrls: ['./init-conf.component.css']
})
export class InitConfComponent implements OnInit {
  //言語設定
  lang_selected='en';
  langs = [
    {label:'English', value: 'en'},
    {label:'日本語', value: 'ja'},
    {label:'Português', value: 'pt'}
  ]
  //サウンド設定
  sound_selected='on';
  sounds = [
    {label:'ON', value: 'on'},
    {label:'OFF', value: 'off'}
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //初期設定をLoading画面に受け渡し
  configure(){
    //引き渡し用パラメータ
    let conf : InitConf = {
      lang:this.lang_selected,
      sound:this.sound_selected
    };
    //loading画面に遷移
    this.router.navigate(['/loading', conf])
  }
}
