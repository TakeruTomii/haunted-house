import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit");

      //Logo movement
      var logo = anime.timeline({
        targets:"#title-logo img",
        easing: 'linear'
      });

      logo
      .add({
        translateY: -50
      })
      .add({
        opacity: 1,
        translateY: 0,
        duration: 1000
      })
      console.log("done logo movement");
      //Button movement
  }

}
