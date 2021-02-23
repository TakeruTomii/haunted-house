import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//ルーティング対象コンポーネント
//ページを増やしたらimportを追加
import { LoadingComponent } from './loading/loading.component';
import { TitleComponent } from './title/title.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { InitConfComponent } from './init-conf/init-conf.component';

//ルーティングテーブル
//ページを増やしたら追加
const routes: Routes = [
  { path: '', component: InitConfComponent },
  { path: 'loading', component: LoadingComponent },
  //英語版サイト
  { path: 'title', component: TitleComponent },
  { path: 'home', component: HomeScreenComponent },
  //デフォルト
  { path: '**', component: LoadingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
