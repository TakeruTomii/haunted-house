import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//自作モジュール
import { NavComponent } from './nav/nav.component';
import { SerifComponent } from './serif/serif.component';

//bootstrapモジュール
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    NavComponent,
    SerifComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    NavComponent,
    SerifComponent
  ]
})
export class SharedModule { }
