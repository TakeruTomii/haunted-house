import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { fetchSerifsParam } from '../../shared/dto';
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
    let params : fetchSerifsParam = {
      lang: 'en',
      room: this.room,
      clicked: this.clicked
    };
    // Initiate serifs
    this.serifs.initSerifs(params);

    let serif_info : any = this.serifs.popSerif();
    this.setDisplayInfos(serif_info);
  }

  // keep conversation forward
  onTalk() : void {
    let next_data = this.serifs.popSerif();

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
      this.setDisplayInfos(next_data);
      // Case : TransitonTransition
      // Cache in buffer the URL to transit
      if(next_data['transition']) {
        this.transition_url = next_data['transition'];
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
    this.current_serif = serif_info['serif'];
    this.name_chara = serif_info['speacker'];
    this.img_chara = this.getImgPath(
      serif_info['speacker'], serif_info['emotion'], serif_info['extention']);
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

}
