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

  constructor() { }

  ngOnInit(): void {
  }

  sendInquiry() {
  }
}
