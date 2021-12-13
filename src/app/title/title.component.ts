import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { Router } from '@angular/router';
import { Sound } from '../../app/shared/sharedFunction';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  thunder_source :AudioBufferSourceNode = null;
  bgm_source :AudioBufferSourceNode = null;
  enter_source :AudioBufferSourceNode = null;
  soundFunc = new Sound();

  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    //prepare sound sources
    this.thunder_source = await this.prepareSoundEffectSource('se_thunderbolt.mp3');
    this.bgm_source = await this.prepareSoundEffectSource('utakata_no_yume.mp3');
    this.enter_source = await this.prepareSoundEffectSource('se_drop.mp3');

    //play music
    this.thunder_source.start();
    this.bgm_source.start(4);


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
  }

  // Transition to home screen
  transitHome() {
    this.bgm_source.stop();
    this.enter_source.start();
    this.router.navigate(['/home']);
  }

  //prepare sound effect source to enter
  async prepareSoundEffectSource(filename:string):Promise<AudioBufferSourceNode> {
    let filePath = '../../assets/sound/' + filename
    //play BGM
    let ctx = new AudioContext();
    let buf = await this.soundFunc.setupAudioBuffer(ctx, filePath);
    let gain = this.soundFunc.getGainNode(ctx, 1);
    let source = this.soundFunc.createAudioSource(ctx, buf, gain);
    return source;
  }

}
