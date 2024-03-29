import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService implements ErrorHandler {

  constructor(private router: Router,
              private zone: NgZone) { }

  handleError(error: Error) {
    console.error(error.message);

    this.zone.run(() => {
      this.router.navigate(['error']);
    });
  }
}
