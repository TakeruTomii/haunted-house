import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingDisplayService {

  constructor() { }
  private _loading: boolean = false;
  loadingStatus: Subject<boolean> = new Subject();

  get loading():boolean {
    return this._loading;
  }

  set loading(value:boolean) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

}
