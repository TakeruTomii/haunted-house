import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AboutMeComponent } from './aboutme/aboutme.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

// bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [AboutMeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    AccordionModule.forRoot()
  ]
})
export class CreatorModule { }
