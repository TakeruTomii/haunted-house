import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.css']
})
export class ContactMeComponent implements OnInit {
  inquiry = {
    name: '',
    mail: '',
    message: ''
  }
  bubble_content = "Fullfill the form and send Tommy your message!";
  send_button_content = "Send";
  isConfirmed = false;
  isSend = false;

  constructor() { }

  ngOnInit(): void {
  }

  sendInquiry() {
    window.scrollTo({top: 0, behavior: "smooth"});
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
}
