import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingDisplayService } from './display/loading-display.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private display: LoadingDisplayService) { }

  ngOnInit(){
    this.loadingSubscription = this.display.loadingStatus.subscribe((value) => {
      this.isLoading = value;
    });
  }
  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }

}
