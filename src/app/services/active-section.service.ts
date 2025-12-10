import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActiveSectionService {
  private _active = new BehaviorSubject<string>('home');
  active$ = this._active.asObservable();

  setActive(section: string) {
    this._active.next(section);
  }
}
