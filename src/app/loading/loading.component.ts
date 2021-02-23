import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  //初期設定
  lang=''
  sound=''

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //受け渡しパラメータ取得
    this.route.paramMap.subscribe(
      (conf:ParamMap)=>{
        this.lang = conf.get('lang');
        this.sound = conf.get('sound');
      }

    );
    //３秒後にタイトル画面に遷移
    setTimeout(this.movePage(this.lang), 3000);
  }

  //画面遷移処理
  //選択言語に合わせてページ遷移
  private movePage(lang) {
    //TODO: 多言語対応時に値に合わせて遷移先を変更
    return 'location.href = "./title";';
  }

}
