import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {DevicehiveService} from '../../core/devicehive.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'dh-github-login',
  templateUrl: './github-login.component.html',
  styleUrls: ['./github-login.component.scss']
})
export class GithubLoginComponent implements OnInit {

  code: string;

  constructor(private route: ActivatedRoute,
              private dh: DevicehiveService,
              private router: Router,
              private notifierService: NotifierService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.logIn();
    });
  }

  async logIn(): Promise<void> {
    try {
      await this.dh.logInWithGithub(this.code);
      this.router.navigate(['/admin']);
    } catch (error) {
      this.notifierService.notify('error', 'Could not log in with Github');
      console.log(error);
      this.dh.logOut();
      window.location.href = document.location.origin;
    }
  }
}
