import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { FetchSerifsParam } from '../../shared/dto';
import { HandleSerifsService } from 'src/app/shared/serif/handle-serifs/handle-serifs.service';

@Component({
  selector: 'app-serif',
  templateUrl: './serif.component.html',
  styleUrls: ['./serif.component.css']
})
export class SerifComponent implements OnInit{
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

  // arguments from caller screen
  private clicked: string; // clicked charactor
  private room: string;    // room

  //URL to transit
  private transition_url: string;

  constructor(private serifs:HandleSerifsService, public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.initModal();
  }

  // Initiate serifs when opening modal
  initModal() : void {
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
  onTalk() : void {
    if (this.isTalking){
      // Case : on talking
      // quit typewriting and show all sentence
      clearInterval(this.interval_id);
      this.current_serif = this.current_data['serif'];
      this.showSerifTriangle();
      this.isTalking = false;
    } else {
      this.hideSerifTriangle();
      let next_data = this.serifs.popSerif();
      this.current_data = next_data;
      if (next_data == null) {
        // Case : the end of serifs
        // close modal
        this.bsModalRef.hide();
        // Case : Transiton
        // Transit after finishing conversation
        if(this.transition_url) {
          this.transitScreen(this.transition_url);
        }
      } else if (next_data['next'].length >= 2) {
        // Case : Selections
        this.showSelection(next_data['next']);
      } else {
        // Case : Proceed
        // Display new serif
        this.isTalking = true;
        this.setDisplayInfos(next_data);
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
