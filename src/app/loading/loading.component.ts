import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Sound } from '../../app/shared/sharedFunction';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  // Initial Settings
  lang=''
  sound=''

  //sound setting
  soundFunc = new Sound();

  constructor(private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    let ctx = new AudioContext();
    let buf = await this.soundFunc.setupAudioBuffer(ctx, '../../assets/sound/takibi.mp3');
    let gain = this.soundFunc.getGainNode(ctx, 1);
    let source = this.soundFunc.createAudioSource(ctx, buf, gain);
    source.start();

    // Fetch passed initial parameters
    this.route.paramMap.subscribe(
      (conf:ParamMap)=>{
        this.lang = conf.get('lang');
        this.sound = conf.get('sound');
      }

    );

    // Go to title Screen in 3 seconds
    setTimeout(()=>{
      source.stop();
      this.router.navigate(['/title'])
    },3000);

  }

}
