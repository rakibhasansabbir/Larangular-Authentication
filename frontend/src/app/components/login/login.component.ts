import { AuthService } from './../../Service/auth.service';
import { JarwisService } from './../../Service/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'util';
import { TokenService } from './../../Service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private Router: Router,
    private Auth: AuthService) { }

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponce(data),
      error => this.handleError(error)
    );
  }
  ngOnInit() {
  }

  handleError(error) {
    this.error = error.error.error;
  }

  handleResponce(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.Router.navigateByUrl('/profile');
  }

}
