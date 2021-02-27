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
  @Input() clicked: string; //クリックしたキャラクター
  @Input() room: string;    //部屋

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
    } else {
      //新しいセリフを表示
      this.setDisplayInfos(next_data);
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
}
