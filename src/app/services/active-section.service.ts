import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActiveSectionService {
  private _active = new BehaviorSubject<string>('home');
  active$ = this._active.asObservable();

  setActive(section: string) {
    console.log(section,'11111111==')
    this._active.next(section);
  }
}
