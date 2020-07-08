import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { FormBuilder, Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any = { usuario: "admin", clave: "1234" };
  form: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required)
    });
  }

  onLoginClick(): void {
    let usuario: string = this.form.get("usuario").value;
    let clave: string = this.form.get("clave").value;

    if ((this.user.usuario == usuario) && (this.user.clave == clave)) {
      this.loginService.ocultarNav.emit(false);
      this.router.navigate(["/persona"]);
    }
    else
      console.log("Usuario o contraseña erroneos");
  }
}
