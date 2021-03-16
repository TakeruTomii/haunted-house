import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  // Initial Settings
  lang=''
  sound=''

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch passed initial parameters
    this.route.paramMap.subscribe(
      (conf:ParamMap)=>{
        this.lang = conf.get('lang');
        this.sound = conf.get('sound');
      }

    );
    // Go to title Screen in 3 seconds
    setTimeout(this.movePage(this.lang), 3000);
  }

  // Screen Transition
  // Transit Screen along Languages
  private movePage(lang) {
    //TODO: Code switching process when multilingual supports
    return 'location.href = "./title";';
  }

}
