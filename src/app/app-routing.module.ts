import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for Routeing
// Add import when creating new pages
import { LoadingComponent } from './loading/loading.component';
import { TitleComponent } from './title/title.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { InitConfComponent } from './init-conf/init-conf.component';
import { AboutMeComponent } from './creator/aboutme/aboutme.component'

// Routing table
// Add items when creating new pages
const routes: Routes = [
  { path: '', component: InitConfComponent },
  { path: 'loading', component: LoadingComponent },
  //Path for English
  { path: 'title', component: TitleComponent },
  { path: 'home', component: HomeScreenComponent },
  { path: 'aboutme', component: AboutMeComponent },
  //TODO: Path for Japanese
  //default
  { path: '**', component: LoadingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
