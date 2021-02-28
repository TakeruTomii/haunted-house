import { Component,  Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { fetchSerifsParam } from 'src/app/dto';
import { HandleSerifsService } from 'src/app/service/handle-serifs/handle-serifs.service';

@Component({
  selector: 'app-serif',
  templateUrl: './serif.component.html',
  styleUrls: ['./serif.component.css']
})
export class SerifComponent implements OnInit{

  //画面表示情報
  img_chara="";
  current_serif="";
  name_chara="";

  //画像フォルダ
  private img_folder : string = "../../../assets/img/";

  //呼び出し元画面からの引数
  private clicked: string; //クリックしたキャラクター
  private room: string;    //部屋

  //遷移先情報
  private transition_url: string;

  constructor(private serifs:HandleSerifsService, public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.initModal();
  }

  //モーダルオープン時にセリフ初期化
  initModal() : void {
    //呼び出すセリフ設定
    let params : fetchSerifsParam = {
      lang: 'en',
      room: this.room,
      clicked: this.clicked
    };
    //セリフ初期化
    this.serifs.initSerifs(params);

    let serif_info : any = this.serifs.popSerif();
    this.setDisplayInfos(serif_info);
  }

  //会話を進める
  onTalk() : void {
    let next_data = this.serifs.popSerif();

    if (next_data == null) {
        //セリフ終了の場合モーダルを閉じる
        this.bsModalRef.hide();
        //遷移先のURLが設定されていたら、会話終了後遷移する。
        if(this.transition_url) {
          this.transitScreen(this.transition_url);
        }
    } else {
      //新しいセリフを表示
      this.setDisplayInfos(next_data);
      //遷移先のURLが設定されていたらバッファに格納
      if(next_data['transition']) {
        this.transition_url = next_data['transition'];
      }
    }
  }

  //キャラクターの画像までのパスを返却
  private getImgPath (speaker : string, emotion : string, extention : string) {
    return this.img_folder + speaker + '_' + emotion + '.' + extention;
  }

  // 画面に表示する情報の設定
  private setDisplayInfos(serif_info : any) {
    this.current_serif = serif_info['serif'];
    this.name_chara = serif_info['speacker'];
    this.img_chara = this.getImgPath(
      serif_info['speacker'], serif_info['emotion'], serif_info['extention']);
  }

  private transitScreen(url: string) {
    if (url.startsWith('https://')) {
      //httpsで始まるのは外部サイトなので、別タブで開く
      window.open(url);
    } else {
      //その他は相対パスである予定
      //相対パスで指定されているのは内部ページなので、自ウィンドウで開く
      location.href = url;
    }
  }
}
