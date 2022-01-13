import { Injectable } from '@angular/core';
import { FetchSerifsParam } from '../../dto';
import enSerifs from 'src/assets/serifs/en.serifs.json'

@Injectable({
  providedIn: 'root'
})
export class HandleSerifsService {
  private next_serif_id: number = 0;  // id of Next Serif
  private current_serifs: any[] = []; // the serif currently processed
  private is_start: boolean = false;  // if it's the first of serifs

  constructor() { }

  // Initiate Serifs
  initSerifs(param : FetchSerifsParam){
    // Search condition
    let lang = param.lang;
    let room = param.room;
    let clicked = param.clicked;

    //TODO: Switch JSON files when multilingual support
    let serif_source = enSerifs;

    // Initiating Serifs
    this.current_serifs = serif_source[room][clicked];

    this.is_start = true;
  }
  // Pop a serif
  popSerif(){
    if(this.is_start){
      // Case : First serif
      let res = this.current_serifs.find(x => x.isStart);
      this.is_start = false;

      if(res['next'].length == 0){
        // Case : no next serifs
        this.next_serif_id = -1;
      } else {
        // Case : have next serif
        this.next_serif_id = parseInt(res['next'][0]['nextId']);
      }

      return res;

    } else if(this.next_serif_id == -1) {
      // Case : Last of serifs
      let res = this.current_serifs.find(x => x.id == this.next_serif_id);
      this.discardSerif();

      return null;

    } else {
      // Case : Proceed
      let res = this.current_serifs.find(x => x.id == this.next_serif_id);

      if(res['next'].length == 0){
        // Case : no next serifs
        this.next_serif_id = -1;
      } else {
        // Case : have next serif
        this.next_serif_id = parseInt(res['next'][0]['nextId']);
      }

      return res;

    }
  }

  // set next serif after selection
  setNextSerif(nextId : number) {
    this.next_serif_id = nextId;
  }

  // discard Serifs
  discardSerif() {
    this.next_serif_id = 0;
    this.current_serifs = [];
    this.is_start = true;
  }
}
