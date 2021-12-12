import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  // Initial Settings
  lang=''
  sound=''

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Fetch passed initial parameters
    this.route.paramMap.subscribe(
      (conf:ParamMap)=>{
        this.lang = conf.get('lang');
        this.sound = conf.get('sound');
      }

    );

    // Go to title Screen in 3 seconds
    setTimeout(()=>{
      this.router.navigate(['/title'])
    },3000);

  }

}
