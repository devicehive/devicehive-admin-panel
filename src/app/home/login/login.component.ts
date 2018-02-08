import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DevicehiveService} from "../../core/devicehive.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'dh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitting = false;
  hasErrors = false;
  login: string;
  password: string;

  constructor(private dh: DevicehiveService,
              private router: Router,
              private notifierService: NotifierService) {

  }

  ngOnInit() {
  }

  async logIn() {
    this.isSubmitting = true;
    this.hasErrors = false;

    if (!this.login ||  this.login.length < 1 || !this.password ||this.password.length < 1) {
      this.hasErrors = true;
      this.isSubmitting = false;
      return;
    }

    try {
      await this.dh.logIn(this.login, this.password);
      this.router.navigate(['/admin']);
    } catch (error) {
      this.notifierService.notify('error', 'Could not log in. Incorrect login or password.');
      console.log(error);
    }

    this.isSubmitting = false;
  }

}
