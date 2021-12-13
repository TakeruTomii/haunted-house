import { ChangeDetectionStrategy, AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InitConf } from '../shared/dto';
import { INIT_LANGS, INIT_SOUNDS } from '../shared/const';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Sound } from '../../app/shared/sharedFunction';

@Component({
  selector: 'app-init-conf',
  templateUrl: './init-conf.component.html',
  styleUrls: ['./init-conf.component.css']
})
export class InitConfComponent implements OnInit, AfterViewInit{
  // Language setting
  lang_selected='en';
  langs = INIT_LANGS;

  // Sound setting
  sound_selected='on';
  sounds = INIT_SOUNDS;
  modalRef: BsModalRef;
  soundFunc = new Sound();

  constructor(private router: Router, private modalService: BsModalService) { }
  @ViewChild('init_modal') public init_modal: TemplateRef<any>;

  ngOnInit(): void {  }

  ngAfterViewInit(){
    this.openModal(this.init_modal);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {'backdrop': 'static'});
  }

  // Pass initial settings to Loading Screen
  async configure(){
    // Audio play
    // Play no sound file first to play successing sounds
    let ctx = new AudioContext();
    let buf = await this.soundFunc.setupAudioBuffer(ctx, '../../assets/sound/no_sound.mp3');
    let gain = this.soundFunc.getGainNode(ctx, 1);
    let source = this.soundFunc.createAudioSource(ctx, buf, gain);
    source.start();


    // Parameters to pass
    let conf : InitConf = {
      lang:this.lang_selected,
      sound:this.sound_selected
    };
    // Transit Loading Screen
    this.router.navigate(['/loading', conf])
  }

}
