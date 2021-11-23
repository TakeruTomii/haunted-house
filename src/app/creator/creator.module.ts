import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AboutMeComponent } from './aboutme/aboutme.component'
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ContactMeComponent } from './contactme/contactme.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [AboutMeComponent, ContactMeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule
  ]
})
export class CreatorModule { }
