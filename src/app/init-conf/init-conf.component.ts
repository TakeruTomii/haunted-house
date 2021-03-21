import { ChangeDetectionStrategy, AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InitConf } from '../shared/dto';
import { INIT_LANGS, INIT_SOUNDS } from '../shared/const';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
