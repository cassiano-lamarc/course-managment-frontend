import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState$ = this.loaderSubject.asObservable();

  constructor() { }

  start(): void {
    this.loaderSubject.next(true);
  }

  stop(): void {
    this.loaderSubject.next(false);
  }
}
