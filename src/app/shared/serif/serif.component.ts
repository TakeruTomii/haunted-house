import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { FetchSerifsParam, SoundInfo } from '../../shared/dto';
import { HandleSerifsService } from 'src/app/shared/serif/handle-serifs/handle-serifs.service';
import { Sound } from '../sharedFunction';
import { ContextService } from '../inter-screen/context.service';

@Component({
  selector: 'app-serif',
  templateUrl: './serif.component.html',
  styleUrls: ['./serif.component.css']
})
export class SerifComponent implements OnInit{
  //sound setting
  page_sound: SoundInfo = null;
  open_source :AudioBufferSourceNode = null;
  close_source :AudioBufferSourceNode = null;
  next_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  // Modal for Selections
  @ViewChild('selectionModal', {static: false}) public selectionModal: ModalDirective;

  // Information for display
  img_chara="";
  current_serif="";
  name_chara="";
  isSelection=false;
  selections=[];
  isTalking=false;
  interval_id:any;
  current_data:any;

  // Path of Image Forlder
  private img_folder : string = "../../../assets/img/";

  //Event emitter when modal closed
  @Output() close: EventEmitter<string> = new EventEmitter<string>();

  // arguments from caller screen
  private clicked: string; // clicked charactor
  private room: string;    // room

  //URL to transit
  private transition_url: string;

  constructor(private serifs:HandleSerifsService,
              public bsModalRef: BsModalRef,
              private screenCtx:ContextService) {}

  async ngOnInit(): Promise<void> {
    // protect serif area from click while loading
    const serif_area = document.getElementById('serif-area');
    serif_area.classList.add('disable-click');

    // set bgm information
    this.page_sound = this.screenCtx.getSound();
    this.open_source = await this.soundFunc.createSound('se_open_serif.mp3', 1, false, '../../../assets/sound/');
    this.close_source = await this.soundFunc.createSound('se_close_serif.mp3', 1, false, '../../../assets/sound/');
    this.next_source = await this.soundFunc.createSound('se_next_serif.mp3', 1, false, '../../../assets/sound/');

    this.initModal();

    // remove protection
    serif_area.classList.remove('disable-click');
  }

  // Initiate serifs when opening modal
  initModal() : void {
    //play sound open modal
    if(this.page_sound.is_sound_on) {
      this.open_source.start();
    }

    // configure calling serifs
    let params : FetchSerifsParam = {
      lang: 'en',
      room: this.room,
      clicked: this.clicked
    };
    // Initiate serifs
    this.serifs.initSerifs(params);

    let serif_info : any = this.serifs.popSerif();
    this.current_data = serif_info;
    this.setDisplayInfos(serif_info);

    if (serif_info['next'].length >= 2) {
      // Case : Selections
      this.showSelection(serif_info['next']);
    }
  }

  // keep conversation forward
  async onTalk() : Promise<void> {
    if (this.isTalking){
      // Case : on talking
      // quit typewriting and show all sentence
      clearInterval(this.interval_id);
      this.current_serif = this.current_data['serif'];
      this.showSerifTriangle();
      this.isTalking = false;

    } else {

      // protect serif area from click while loading
      const serif_area = document.getElementById('serif-area');
      serif_area.classList.add('disable-click');

      let next_data = this.serifs.popSerif();
      this.current_data = next_data;
      this.hideSerifTriangle();

      if (next_data == null) {
        // Case : the end of serifs
        //play sound close serif
        if(this.page_sound.is_sound_on) {
          this.close_source.start();
          this.close_source = await this.soundFunc.createSound('se_close_serif.mp3', 1, false, '../../../assets/sound/');
        }

        // remove protection
        serif_area.classList.remove('disable-click');

        // close modal
        this.close.emit();
        this.bsModalRef.hide();
        // Case : Transiton
        // Transit after finishing conversation
        if(this.transition_url) {
          this.transitScreen(this.transition_url);
        }
      } else if (next_data['next'].length >= 2) {
        // Case : Selections
        this.showSelection(next_data['next']);

        // remove protection
        serif_area.classList.remove('disable-click');
      } else {
        // Case : Proceed
        //play sound next serif
        if(this.page_sound.is_sound_on) {
          this.next_source.start();
          this.next_source = await this.soundFunc.createSound('se_next_serif.mp3', 1, false, '../../../assets/sound/');
        }

        // Display new serif
        this.isTalking = true;
        this.setDisplayInfos(next_data);

        // remove protection
        serif_area.classList.remove('disable-click');

        // Case : TransitonTransition
        // Cache in buffer the URL to transit
        if(next_data['transition']) {
          this.transition_url = next_data['transition'];
        }
      }
    }

  }

  // Select Selections
  selectRoute(nextId: number) {
    this.serifs.setNextSerif(nextId);
    this.closeSelection();
    this.onHidden();
    this.onTalk();
  }

  // Return the path to the Image of the charactor
  private getImgPath (speaker : string, emotion : string, extention : string) {
    return this.img_folder + speaker + '_' + emotion + '.' + extention;
  }

  // Display Selections
  private showSelection(next_options : any[]) {
    this.selections = next_options;
    this.isSelection = true;
  }

  // Close Selections Modal
  private closeSelection() {
    this.close.emit();
    this.selectionModal.hide();
  }

  // Hide Selection Modal from DOM
  private onHidden(){
    this.isSelection = false;
  }

  // Set Informations to display
  private setDisplayInfos(serif_info : any) {
    this.name_chara = serif_info['speacker'];
    this.img_chara = this.getImgPath(
      serif_info['speacker'], serif_info['emotion'], serif_info['extention']);

    // clear current serif
    this.isTalking = true;
    this.current_serif = "";
    // type current serif
    this.interval_id = setInterval(()=>{this.typewriteSentence(serif_info['serif'])}, 20);
  }

  // display sentence by one character
  private typewriteSentence(sentense: string) {
    let written_length = this.current_serif.length;
    let all_length = sentense.length;

    if(written_length < all_length) {
      this.current_serif = this.current_serif.concat(sentense.charAt(written_length));
    } else {
      clearInterval(this.interval_id);
      this.showSerifTriangle();
      this.isTalking = false;
    }

  }

  // Transition after serifs
  private transitScreen(url: string) {
    if (url.startsWith('https://')) {
      // Starting "https" means external site
      // Open in new Tab.
      // Only for "https"
      window.open(url);
    } else {
      // Others are set in relative path
      // URL which expressed in relative path means internal site
      // Open in the current window.
      location.href = url;
    }
  }

  // show triangle at the last of sentence
  private showSerifTriangle() {
    document.querySelector('#serif-area span').classList.add('show-triangle');
  }

  // show triangle at the last of sentence
  private hideSerifTriangle() {
    document.querySelector('#serif-area span').classList.remove('show-triangle');
  }

}
