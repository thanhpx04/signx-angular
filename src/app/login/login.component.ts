import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService, LoginResponseData } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    
    const email = form.value.email;
    const password = form.value.password;

    let loginObservable: Observable<LoginResponseData>;

    this.isLoading = true;

    loginObservable = this.loginService.login(email, password);

    loginObservable.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }

}
