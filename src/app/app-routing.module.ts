import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for Routeing
// Add import when creating new pages
import { LoadingComponent } from './loading/loading.component';
import { TitleComponent } from './title/title.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { InitConfComponent } from './init-conf/init-conf.component';
import { AboutMeComponent } from './creator/aboutme/aboutme.component';
import { ContactMeComponent } from './creator/contactme/contactme.component'
import { CharacterListComponent } from './site/character-list/character-list.component';
import { ConceptComponent } from './site/concept/concept.component';

// Routing table
// Add items when creating new pages
const routes: Routes = [
  { path: '', component: InitConfComponent },
  { path: 'loading', component: LoadingComponent },
  //Path for English
  { path: 'title', component: TitleComponent },
  { path: 'home', component: HomeScreenComponent },
  { path: 'aboutme', component: AboutMeComponent },
  { path: 'contactme', component: ContactMeComponent },
  { path: 'character-list', component: CharacterListComponent },
  { path: 'concept', component: ConceptComponent },
  //TODO: Path for Japanese
  //default
  { path: '**', component: LoadingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
