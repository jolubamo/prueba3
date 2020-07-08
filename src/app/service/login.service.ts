import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Output()
  ocultarNav:EventEmitter<boolean>=new EventEmitter
  constructor() { }
}
