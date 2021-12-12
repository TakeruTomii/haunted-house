import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

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

      //Music Play
      this.startBGM();
  }

  // Transition to home screen
  transitHome() {
    this.router.navigate(['/home']);
  }

  async startBGM() {
    //Audio play
    let ctx = new AudioContext();
    let buf = await this.setupAudioBuffer(ctx, '../../assets/sound/utakata_no_yume.mp3');
    let source = ctx.createBufferSource();
    source.buffer = buf;
    source.connect(ctx.destination);
    source.start(4);
  }

  // setup audio buffer
  async setupAudioBuffer(ctx:any, url: string): Promise<any> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

}
