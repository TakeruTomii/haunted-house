import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, NgForm } from '@angular/forms';

// Common Parts
import { SharedModule } from './shared/shared.module';

// Rooms
import { MapsModule } from './maps/maps.module'
import { MoveRoomService } from './maps/move-room/move-room.service';

// Creators
import { CreatorModule } from './creator/creator.module';

// Screens
import { InitConfComponent } from './init-conf/init-conf.component';
import { LoadingComponent } from './loading/loading.component';
import { TitleComponent } from './title/title.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { CharacterListComponent } from './site/character-list/character-list.component';
import { ConceptComponent } from './site/concept/concept.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    HomeScreenComponent,
    LoadingComponent,
    InitConfComponent,
    CharacterListComponent,
    ConceptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    MapsModule,
    CreatorModule
  ],
  providers: [MoveRoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
