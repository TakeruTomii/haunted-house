import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from '../../shared/serif/serif.component';
import AOS from 'aos';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.css']
})
export class ContactMeComponent implements OnInit {
  modalRef: BsModalRef;
  inquiry = {
    name: '',
    mail: '',
    message: ''
  }
  bubble_content = "Fullfill the form and send Tommy your message!";
  send_button_content = "Send";
  isConfirmed = false;
  isSend = false;

  constructor(private modal: BsModalService) { }

  ngOnInit(): void {
    // show movement
    AOS.init({
      duration:1000,
      once:true
    });
  }

  sendInquiry() {
    let window_height = window.innerWidth * 0.30;
    window.scrollTo({top: window_height, behavior: "smooth"});
    if(this.isConfirmed){
      this.bubble_content = "I send him ya messages! Ask me for next step!!"
      this.send_button_content = "Not twice ;)"
      this.isConfirmed = false;
      this.isSend = true;
      //TODO: Request Mail Sending Api
    }
    else {
      this.bubble_content = "Confirm the content before sending. Can I truly send these contents?"
      this.send_button_content = "No regrets, Send him now."
      this.isConfirmed = true;
    }
  }

    // Open modal for serifs
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
