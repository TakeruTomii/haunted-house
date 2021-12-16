import { ChangeDetectionStrategy, AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SoundInfo, CrossScreenContext } from '../shared/dto';
import { INIT_LANGS, INIT_SOUNDS, PAGE_BGMS } from '../shared/const';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Sound } from '../../app/shared/sharedFunction';
import { ContextService } from '../shared/inter-screen/context.service';

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

  constructor(private router: Router,
              private modalService: BsModalService,
              private screenCtx: ContextService) { }
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
    // Parameters to pass
    let isSoundOn : boolean = this.sound_selected === 'on' ? true : false;
    let vol : number = isSoundOn ? 0.5 : 0;
    let sound : SoundInfo = {
      is_sound_on: isSoundOn,
      volume: vol,
      bgm_filename: PAGE_BGMS['loading']
    };

    this.screenCtx.setSound(sound);

    // Audio play
    // Play no sound file first to play successing sounds
    let filepath = '../../assets/sound/' + PAGE_BGMS['init-conf']
    let ctx = new AudioContext();
    let buf = await this.soundFunc.setupAudioBuffer(ctx, filepath);
    let gain = this.soundFunc.getGainNode(ctx, vol);
    let source = this.soundFunc.createAudioSource(ctx, buf, gain);
    source.start();

    // Transit Loading Screen
    this.router.navigate(['/loading'])
  }

}
