import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './aboutme/aboutme.component';

// bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [AboutMeComponent],
  imports: [
    CommonModule,
    CarouselModule.forRoot()
  ]
})
export class CreatorModule { }
