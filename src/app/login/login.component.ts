import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AppService } from '../helpers/app.service';
import { Labels } from '../util/labels';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private app: AppService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    let token = sessionStorage.getItem('jwtToken');
    if (token) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.app.showSpinner();
      this.loginService.authenticate(this.loginForm.value).then((res: any) => {
        console.log('Login res = ', res);
        this.app.hideSpinner();
        if (res.jwt) {
          sessionStorage.setItem('jwtToken', res.jwt);
          sessionStorage.setItem('userName', res.user.username);
          this.router.navigate(['/']);
        } else {
          console.warn('SignIn Failed');
          this.app.showErrorToast(Labels.PLZ_TRY_AGAIN);
        }
      });
    }
  }

}
