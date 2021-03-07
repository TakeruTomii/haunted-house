import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivingRoomComponent } from './living-room/living-room.component';
import { WorkShopComponent } from './work-shop/work-shop.component';
import { CasinoComponent } from './casino/casino.component';
import { TeaRoomComponent } from './tea-room/tea-room.component';
import { GardenComponent } from './garden/garden.component';

import { MoveRoomService } from './move-room/move-room.service';

@NgModule({
  declarations: [
    LivingRoomComponent,
    WorkShopComponent,
    CasinoComponent,
    TeaRoomComponent,
    GardenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LivingRoomComponent,
    WorkShopComponent,
    CasinoComponent,
    TeaRoomComponent,
    GardenComponent
  ]
})
export class MapsModule { }
