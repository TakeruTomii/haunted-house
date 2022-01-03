import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SoundInfo, ErrorInfo } from '../shared/dto';
import { INIT_LANGS, INIT_SOUNDS, PAGE_BGMS, VALUE_CHEATED } from '../shared/const';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Sound, Validation } from '../../app/shared/sharedFunction';
import { ContextService } from '../shared/inter-screen/context.service';
import { InvalidOperationError } from '../shared/error/errorClass';
import { LoadingDisplayService } from '../loading/display/loading-display.service';

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

  // Validation
  validFunc = new Validation();

  constructor(private router: Router,
              private modalService: BsModalService,
              private screenCtx: ContextService,
              private loading: LoadingDisplayService) { }
  @ViewChild('init_modal') public init_modal: TemplateRef<any>;

  ngOnInit(): void {  }

  ngAfterViewInit(){
    this.loading.hideLoading();
    this.openModal(this.init_modal);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {'backdrop': 'static'});
  }

  // Pass initial settings to Loading Screen
  async configure(){
    // Validation
    if(!this.validFunc.isOnOff(this.sound_selected)){
      const message = VALUE_CHEATED;
      const err:ErrorInfo = { 'message': message }
      this.screenCtx.setError(err);
      throw new InvalidOperationError(message);
    }

    // Parameters to pass
    const isSoundOn : boolean = this.sound_selected === 'on' ? true : false;
    const vol : number = isSoundOn ? 0.5 : 0;
    const sound : SoundInfo = {
      is_sound_on: isSoundOn,
      volume: vol,
      bgm_filename: PAGE_BGMS.title
    };

    this.screenCtx.setSound(sound);

    const source :AudioBufferSourceNode = await this.soundFunc.createSound(PAGE_BGMS['init-conf']);
    if(sound.is_sound_on) {
      // Audio play
      // Play no sound file first to play successing sounds
      source.start();
    }

    // Transit Loading Screen
    this.router.navigate(['/title'])
  }

}
