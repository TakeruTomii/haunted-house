import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, NgForm } from '@angular/forms';

//bootstrapモジュール
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

//部屋
import { LivingRoomComponent } from './maps/living-room/living-room.component';
import { MoveRoomService } from './service/move-room/move-room.service';
import { SerifComponent } from './common/serif/serif.component';
import { TeaRoomComponent } from './maps/tea-room/tea-room.component';
import { CasinoComponent } from './maps/casino/casino.component';
import { GardenComponent } from './maps/garden/garden.component';

//画面
import { InitConfComponent } from './init-conf/init-conf.component';
import { LoadingComponent } from './loading/loading.component';
import { TitleComponent } from './title/title.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { NavComponent } from './common/nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    HomeScreenComponent,
    LoadingComponent,
    InitConfComponent,
    NavComponent,
    LivingRoomComponent,
    TeaRoomComponent,
    CasinoComponent,
    GardenComponent,
    SerifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [MoveRoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
