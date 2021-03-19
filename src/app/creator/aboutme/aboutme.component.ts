import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutMeComponent implements OnInit {

  url_ipa_exam = "https://www.jitec.ipa.go.jp/2_01english/02examcategories.html";
  url_python_exam = "https://www.pythonic-exam.com/basic-examination";

  constructor() { }

  ngOnInit(): void {
  }

}
