import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from 'src/app/shared/serif/serif.component';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutMeComponent implements OnInit {
  modalRef: BsModalRef;

  // URLs of Certifications
  url_ipa_exam = "https://www.jitec.ipa.go.jp/2_01english/02examcategories.html";
  url_python_exam = "https://www.pythonic-exam.com/basic-examination";

  // prevent sliding of carousel
  stop_sliding = 0;

  constructor(private modal: BsModalService) { }

  ngOnInit(): void {
  }  // Open modal for serifs
  openSerifs(room : string, clicked : string){

    // Configs to open
    let initialState = {
      room: room,
      clicked: clicked
    };

    let show_config = {
      initialState,
      class: 'serif-modal',
      animated: false
    }

    this.modalRef = this.modal.show(SerifComponent, show_config);
  }



}
