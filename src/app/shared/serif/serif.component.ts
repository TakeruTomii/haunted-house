import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ErrorInfo, FetchSerifsParam, SoundInfo } from '../../shared/dto';
import { HandleSerifsService } from 'src/app/shared/serif/handle-serifs/handle-serifs.service';
import { Sound, Validation } from '../sharedFunction';
import { ContextService } from '../inter-screen/context.service';
import { InvalidOperationError } from '../error/errorClass';
import { PAGE_BGMS, PAGE_NAME_CHEATED, ROOM_BGMS } from '../const';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-serif',
  templateUrl: './serif.component.html',
  styleUrls: ['./serif.component.css'],
})
export class SerifComponent implements OnInit {
  //sound setting
  page_sound: SoundInfo = null;
  open_source: AudioBufferSourceNode = null;
  close_source: AudioBufferSourceNode = null;
  next_source: AudioBufferSourceNode = null;
  soundFunc = new Sound();

  // Modal for Selections
  @ViewChild('selectionModal', { static: false })
  public selectionModal: ModalDirective;

  // Information for display
  img_chara = '';
  current_serif = '';
  name_chara = '';
  isSelection = false;
  isNextSelection = false;
  selections = [];
  isTalking = false;
  interval_id: any;
  current_data: any;

  // Path of Image Forlder
  private img_folder: string = '../../../assets/img/';

  //Event emitter when modal closed
  @Output() close: EventEmitter<string> = new EventEmitter<string>();

  // arguments from caller screen
  private clicked: string; // clicked charactor
  private room: string; // room

  //URL to transit
  private transition_url: string;
  @ViewChild(NavComponent) private bgm: NavComponent;

  //Validation
  validFunc = new Validation();

  constructor(
    private router: Router,
    private serifs: HandleSerifsService,
    public bsModalRef: BsModalRef,
    private screenCtx: ContextService
  ) {}

  async ngOnInit(): Promise<void> {
    // protect serif area from click while loading
    this.protectButtons();

    // set bgm information
    this.page_sound = this.screenCtx.getSound();
    this.open_source = await this.soundFunc.createSound(
      'se_open_serif.mp3',
      1,
      false,
      '../../../assets/sound/'
    );
    this.close_source = await this.soundFunc.createSound(
      'se_close_serif.mp3',
      1,
      false,
      '../../../assets/sound/'
    );
    this.next_source = await this.soundFunc.createSound(
      'se_next_serif.mp3',
      1,
      false,
      '../../../assets/sound/'
    );

    this.initModal();

    // remove protection
    this.removeProtection()
  }

  // Initiate serifs when opening modal
  initModal(): void {
    //play sound open modal
    if (this.page_sound.is_sound_on) {
      this.open_source.start();
    }

    // configure calling serifs
    let params: FetchSerifsParam = {
      lang: 'en',
      room: this.room,
      clicked: this.clicked,
    };
    // Initiate serifs
    this.serifs.initSerifs(params);

    const serif_info: any = this.serifs.popSerif();
    this.current_data = serif_info;
    this.setDisplayInfos(serif_info);

    if (serif_info['next'].length >= 2) {
      // Case : Selections
      this.prepareSelection(serif_info['next']);
    }
  }

  // keep conversation forward
  async onTalk(): Promise<void> {
    if (this.isTalking) {
      // Case : on talking
      // quit typewriting and show all sentence
      clearInterval(this.interval_id);
      this.current_serif = this.current_data['serif'];
      this.showSerifTriangle();
      this.isTalking = false;

    } else {
      // protect serif area from click while loading
      this.protectButtons();

      if(!this.isNextSelection) {
        const next_data = this.serifs.popSerif();
        this.current_data = next_data;
      }
      this.hideSerifTriangle();

      if (this.current_data == null) {
        // Case : the end of serifs
        //play sound close serif
        if (this.page_sound.is_sound_on) {
          this.close_source.start();
          this.close_source = await this.soundFunc.createSound(
            'se_close_serif.mp3',
            1,
            false,
            '../../../assets/sound/'
          );
        }

        // remove protection
        this.removeProtection();

        // close modal
        this.close.emit();
        this.bsModalRef.hide();
        // Case : Transiton
        // Transit after finishing conversation
        if (this.transition_url) {
          this.transitScreen(this.transition_url);
        }
      } else if (this.isNextSelection) {
        // Case : Selections
        this.showSelection();

        // remove protection
        this.removeProtection();
      } else {
        // Case : Proceed
        //play sound next serif
        if (this.page_sound.is_sound_on) {
          this.next_source.start();
          this.next_source = await this.soundFunc.createSound(
            'se_next_serif.mp3',
            1,
            false,
            '../../../assets/sound/'
          );
        }

        // Display new serif
        this.isTalking = true;
        this.setDisplayInfos(this.current_data);

        // remove protection
        this.removeProtection();

        // Case : TransitonTransition
        // Cache in buffer the URL to transit
        if (this.current_data['transition']) {
          this.transition_url = this.current_data['transition'];
        }

        // Case : Selections
        if (this.current_data['next'].length >= 2) {
          this.prepareSelection(this.current_data['next']);
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
  private getImgPath(speaker: string, emotion: string, extention: string) {
    return this.img_folder + speaker + '_' + emotion + '.' + extention;
  }

  // set Selection Infomartion
  private prepareSelection(next_option: any[]) {
    this.selections = next_option;
    this.isNextSelection = true;
  }

  // Display Selections
  private showSelection() {
    this.isSelection = true;
    this.isNextSelection = false;
  }

  // Close Selections Modal
  private closeSelection() {
    this.close.emit();
    this.selectionModal.hide();
  }

  // Hide Selection Modal from DOM
  private onHidden() {
    this.isSelection = false;
  }

  // Set Informations to display
  private setDisplayInfos(serif_info: any) {
    this.name_chara = serif_info['name'];
    this.img_chara = this.getImgPath(
      serif_info['speaker'],
      serif_info['emotion'],
      serif_info['extention']
    );

    // clear current serif
    this.isTalking = true;
    this.current_serif = '';
    // type current serif
    this.interval_id = setInterval(() => {
      this.typewriteSentence(serif_info['serif']);
    }, 20);
  }

  // display sentence by one character
  private typewriteSentence(sentense: string) {
    let written_length = this.current_serif.length;
    let all_length = sentense.length;

    if (written_length < all_length) {
      this.current_serif = this.current_serif.concat(
        sentense.charAt(written_length)
      );
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
      // Others are set in page name or room name
      // Open in the current window.

      // set filename of bgm
      let filename = "";
      if(url === "/"){
        //Case: back to init-conf
        location.href = '/';
      } else if(this.validFunc.isValidPageName(url)) {
        //Case: go to somewhere except for /home
        filename = PAGE_BGMS[url];
      } else if (this.validFunc.isValidRoomName(url)) {
        //Case: go to /home
        filename = ROOM_BGMS['livingRoom'];
      } else{
        // Validation
        const message = PAGE_NAME_CHEATED;
        const err: ErrorInfo = { message: message };
        this.screenCtx.setError(err);
        throw new InvalidOperationError(message);
      }

      // Set information to next screen
      const sound: SoundInfo = {
        is_sound_on: this.page_sound.is_sound_on,
        volume: this.page_sound.volume,
        bgm_filename: filename
      }
      this.screenCtx.setSound(sound);

      const path = '/' + url;
      location.href = path;
    }
  }

  // show triangle at the last of sentence
  private showSerifTriangle() {
    document.querySelector('#serif-area span').classList.add('show-triangle');
  }

  // show triangle at the last of sentence
  private hideSerifTriangle() {
    document
      .querySelector('#serif-area span')
      .classList.remove('show-triangle');
  }

  //close modal in the middle of conversation
  onCancel() {
    if(!this.isTalking){
      this.close.emit();
      this.bsModalRef.hide();
    }
  }

  private protectButtons () {
    const serif_area = document.getElementById('serif-area');
    const cancel_button = document.getElementById('cancel');
    serif_area.classList.add('disable-click');
    cancel_button.classList.add('disable-click');
  }

  private removeProtection () {
    const serif_area = document.getElementById('serif-area');
    const cancel_button = document.getElementById('cancel');
    serif_area.classList.remove('disable-click');
    cancel_button.classList.remove('disable-click');
  }

}
