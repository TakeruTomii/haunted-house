import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from '../../shared/serif/serif.component';
import AOS from 'aos';
import { SendMailService } from './sendmail.service';
import { SendMailInfo, SoundInfo } from '../../shared/dto'

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.css']
})

export class ContactMeComponent implements OnInit {
  modalRef: BsModalRef;

  // Sound Setting
  page_sound:SoundInfo;
  current_volume:number = 0.5;

  //form information
  inquiry = {
    name: '',
    mail: '',
    message: ''
  }
  bubble_content = "Fullfill the form and send Tommy your message!";
  send_button_content = "Send";
  isConfirmed = false;
  isSend = false;

  constructor(private modal: BsModalService, private service: SendMailService) { }

  ngOnInit(): void {

    // set bgm information
    this.page_sound = {
      is_sound_on:true,
      volume:this.current_volume,
      bgm_filename:"wafuu_no_otayori_shoukai_corner.mp3"
    }

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
      //Request Mail Sending Api
      this.sendMail()
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

    sendMail() {
      console.log("Send Mail Start");
      let info: SendMailInfo = {
        "mail_from": "dev.haunted.house@gmail.com",
        "mail_to": "inquiry.haunted.house@gmail.com",
        "title": this.createTitle(),
        "message": this.createMessage()
      }
      console.log('message = ' + this.createMessage())

      this.service
      .sendMail(info)
      .subscribe(()=>{console.log("Send Mail end");})
    }

    private createTitle(){
      let prefix = "[haunted-house] inquiry ";
      let now = new Date();

      let UTCYear = now.getUTCFullYear();
      let UTCMonth = now.getUTCMonth()+1;
      let UTCDate = now.getUTCDate();
      let UTCHour = now.getUTCHours();
      let UTCMin = now.getUTCMinutes();
      let UTCSec = now.getUTCSeconds();

      let currentDate = UTCYear + "-" + UTCMonth + "-" + UTCDate + " "
          + UTCHour + ":" + UTCMin + ":" + UTCSec;

      return prefix + currentDate;
    }

    private createMessage() {
      let msg = "<h2>You've got a mail from haunted house.</h2>" +
                " name: <strong>" + this.inquiry.name +"</strong><br>" +
                " email address: <strong>"+ this.inquiry.mail +"</strong><br><br>" +
                "<h2>Message Content</h2>" +
                "<p><pre><b>" + this.inquiry.message + "</b></pre></p>"

      return msg;
    }

    preserveVolume(volume:number) {
      this.current_volume = volume;
    }
}
