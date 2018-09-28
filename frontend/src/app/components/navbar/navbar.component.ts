import { TokenService } from './../../Service/token.service';
import { Router } from '@angular/router';
import { AuthService } from './../../Service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: Boolean;
  constructor(
    private Auth: AuthService,
    private Router: Router,
    private Token: TokenService,
  ) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.Router.navigateByUrl('/login');
  }
}
