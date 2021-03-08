import { Injectable } from '@angular/core';
import { fetchSerifsParam } from '../../dto';
import enSerifs from 'src/assets/serifs/en.serifs.json'

@Injectable({
  providedIn: 'root'
})
export class HandleSerifsService {
  private next_serif_id: number = 0;
  private current_serifs: any[] = [];
  private is_start: boolean = false;

  constructor() { }

  //セリフ取得
  initSerifs(param : fetchSerifsParam){
    //検索条件
    let lang = param.lang;
    let room = param.room;
    let clicked = param.clicked;

    //TODO: 多言語対応時に言語ごとにJSONファイルを切り替え
    let serif_source = enSerifs;

    //セリフ初期設定
    this.current_serifs = serif_source.filter(
      x => x.room === room &&
      x.clicked === clicked);

    this.is_start = true;
  }
  //セリフPOP
  popSerif(){
    if(this.is_start){
      //一番最初のセリフの場合
      let res = this.current_serifs.find(x => x.isStart);
      this.current_serifs = this.current_serifs.filter(x => !x.isStart);
      this.next_serif_id = parseInt(res['next'][0]['nextId']);
      this.is_start = false;

      return res;

    } else if(this.next_serif_id == -1) {
      //セリフがなくなった場合
      let res = this.current_serifs.find(x => x.id == this.next_serif_id);
      this.current_serifs = this.current_serifs.filter(x => !(x.id == this.next_serif_id));
      this.discardSerif();

      return null;

    } else {
      //途中のセリフの場合
      let res = this.current_serifs.find(x => x.id == this.next_serif_id);
      this.current_serifs = this.current_serifs.filter(x => !(x.id == this.next_serif_id));

      if(res['next'].length == 0){
        //次のセリフがない場合
        this.next_serif_id = -1;
      } else {
        //次のセリフがある場合
        this.next_serif_id = parseInt(res['next'][0]['nextId']);
      }

      return res;

    }
  }

  //選択肢を選んだあと次のセリフを設定
  setNextSerif(nextId : number) {
    this.next_serif_id = nextId;
  }

  //セリフ破棄
  discardSerif() {
    this.next_serif_id = 0;
    this.current_serifs = [];
    this.is_start = true;
  }
}
