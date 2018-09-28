import { Router } from '@angular/router';
import { TokenService } from './../../Service/token.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../../Service/jarwis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private Router: Router) { }

  private error = [];

  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponce(data),
      error => this.handleError(error)
    );
  }

  handleResponce(data) {
    this.Token.handle(data.access_token);
    this.Router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
