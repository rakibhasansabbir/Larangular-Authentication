import { error } from 'util';
import { JarwisService } from './../../../Service/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };
  constructor(
    private route: ActivatedRoute,
    private Jarwis: JarwisService) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.Jarwis.changePassword(this.form).subscribe(
      data => this.handleResponce(data),
      error => this.handleError(error)
    )

  }

  handleResponce(data) {

  }

  handleError(error) {

  }



}
