import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prueba1';
  ocultarNav: boolean = true;


  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.loginService.ocultarNav.subscribe((res: boolean) => {
      this.ocultarNav = res;
    })
  }
  onCerrarSesion(): void {
    this.loginService.ocultarNav.emit(false);
    this.router.navigate(["/login"]);
  }
  trabajo(): void {
    this.loginService.ocultarNav.emit(false);
    this.router.navigate(["/trabajo"]);
  }
  exp(): void {
    this.loginService.ocultarNav.emit(false);
    this.router.navigate(["/experiencia-laboral"]);
  }
  persona(): void {
    this.loginService.ocultarNav.emit(false);
    this.router.navigate(["/persona"])
  }
  viewpersona(): void {
    this.loginService.ocultarNav.emit(false);
    this.router.navigate(["/view-persona"])
  }
  viewtrabajo(): void {
    this.loginService.ocultarNav.emit(false);
    this.router.navigate(["/view-trabajo"]);
  }
  viewexp(): void {
    this.loginService.ocultarNav.emit(false);
    this.router.navigate(["/view-experiencia-laboral"]);
  }
  
}
