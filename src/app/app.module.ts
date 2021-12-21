import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Common Parts
import { SharedModule } from './shared/shared.module';

// Rooms
import { MapsModule } from './maps/maps.module'
import { MoveRoomService } from './maps/move-room/move-room.service';

// Creators
import { CreatorModule } from './creator/creator.module';

// Creators
import { SiteModule } from './site/site.module';

// Screens
import { InitConfComponent } from './init-conf/init-conf.component';
import { LoadingComponent } from './loading/loading.component';
import { TitleComponent } from './title/title.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HandleErrorService } from './shared/error/handle-error.service';

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
    MapsModule,
    CreatorModule,
    HttpClientModule
  ],
  providers: [
    MoveRoomService,
    {
      provide: ErrorHandler,
      useClass: HandleErrorService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
