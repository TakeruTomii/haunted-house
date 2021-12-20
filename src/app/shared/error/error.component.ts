import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SerifComponent } from '../serif/serif.component';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private modal: BsModalService) { }

  ngOnInit(): void {
    this.openSerifs("Error", "Akabeko");
    this.modal.onHide.subscribe(()=>{
      this.showGameOver();
    });
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

  showGameOver() {
    const title_gameover = anime.timeline({
      targets: "#title_gameover",
      easing: 'easeInQuad'
    });

    title_gameover
    .add({
      translateY: -100,
      duration: 0
    })
    .add({
      opacity: 1,
      translateY: 0,
      duration: 800
    });

    const exp = anime.timeline({
      targets: "#exp",
      easing: 'easeInQuad',
      duration: 3000
    });

    exp
    .add({
      opacity: 1,
    });

    const grave = anime.timeline({
      targets: "#grave",
      easing: 'easeInQuad',
      duration: 200
    });

    grave
    .add({
      opacity: 1,
    });

    const restart = anime.timeline({
      targets: "#restart",
      easing: 'linear',
      direction: 'alternate',
      loop:true,
      delay: 200,
      duration: 2000
    });

    restart
    .add({
      opacity: 1,
    });

  }

  restart(){
    location.href = '/';
  }

}
