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

// Screens
import { InitConfComponent } from './init-conf/init-conf.component';
import { LoadingComponent } from './loading/loading.component';
import { TitleComponent } from './title/title.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    HomeScreenComponent,
    LoadingComponent,
    InitConfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    MapsModule
  ],
  providers: [MoveRoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
