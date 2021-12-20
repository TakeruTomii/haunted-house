import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// handmade modules
import { NavComponent } from './nav/nav.component';
import { SerifComponent } from './serif/serif.component';

// bootstrap modules
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ContextService } from './inter-screen/context.service';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    NavComponent,
    SerifComponent,
    ErrorComponent
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
  ],
  providers:[ContextService]
})
export class SharedModule { }
