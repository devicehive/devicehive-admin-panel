import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DevicehiveService} from "../../core/devicehive.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'dh-jwt-login',
  templateUrl: './jwt-login.component.html',
  styleUrls: ['./jwt-login.component.scss']
})
export class JwtLoginComponent implements OnInit {

  token: string;

  constructor(private route: ActivatedRoute,
              private dh: DevicehiveService,
              private router: Router,
              private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.logIn();
    });
  }

  async logIn() {
    try {
      await this.dh.logInWithToken(this.token);
      this.router.navigate(['/admin']);
    } catch (error) {
      this.notifierService.notify('error', 'Could not log in. Incorrect login or password.');
      console.log(error);
    }
  }
}
