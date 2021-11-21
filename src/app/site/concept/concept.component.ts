import { animation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {
  isOpenLastAccrodion = false;

  constructor() { }

  ngOnInit(): void {

    // gimmick in scroll
    // show mouths background when scroll to the end with last accordion open
    window.addEventListener('scroll', () => {
      if(this.isOpenLastAccrodion) {
        let scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
        let pageMostBottom = scrollHeight - window.innerHeight - 5;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // action when scroll to the bottom
        if (scrollTop >= pageMostBottom) {
          document.getElementById('main-container').classList.add("last-scroll");
        } else {
          document.getElementById('main-container').classList.remove("last-scroll");
        }
      }
    });
  }

  setOpenStateOfLastAccordion() {
    this.isOpenLastAccrodion = !(this.isOpenLastAccrodion);
  }

}
