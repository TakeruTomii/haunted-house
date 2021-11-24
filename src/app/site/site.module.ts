import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptComponent } from '../site/concept/concept.component';
import { CharacterListComponent } from '../site/character-list/character-list.component'
import { SharedModule } from '../shared/shared.module'


@NgModule({
  declarations: [
    ConceptComponent,
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SiteModule { }
