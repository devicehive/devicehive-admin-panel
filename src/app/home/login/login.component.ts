import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicehiveService } from '../../core/devicehive.service';
import { NotifierService } from 'angular-notifier';
import { environment } from '../../../environments/environment';

declare const gapi: any;
declare const FB: any;

@Component({
  selector: 'dh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  auth2: any;
  githubUrl: string;
  googleClientId: string;
  facebookAppId: string;
  githubClientId: string;

  isSubmitting = false;
  hasErrors = false;
  login: string;
  password: string;

  constructor(private dh: DevicehiveService,
    private zone: NgZone,
    private router: Router,
    private notifierService: NotifierService) {
    this.googleClientId = environment.googleClientId;
    this.facebookAppId = environment.facebookAppId;
    this.githubClientId = environment.githubClientId;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.githubClientId) {
      this.githubInit();
    }

    if (this.googleClientId) {
      this.googleInit();
    }

    if (this.facebookAppId) {
      this.facebookInit();
    }
  }

  async googleLogIn(token: string) {
    try {
      await this.dh.logInWithGoogle(token);
      this.zone.run(() => this.router.navigateByUrl('/admin'));
    } catch (error) {
      this.notifierService.notify('error', 'Could not log in with Google');
      console.log(error);
    }
  }

  async getFacebookLoginStatus() {
    try {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          this.facebookLogIn(response.authResponse.accessToken);
        } else {
          FB.login((loginResponse) => {
            this.facebookLogIn(loginResponse.authResponse.accessToken);
          }, { scope: 'email' });
        }
      });
    } catch (error) {
      this.notifierService.notify('error', 'Could not log in with Facebook');
      console.log(error);
    }
  }

  async facebookLogIn(token: string) {
    try {
      await this.dh.logInWithFacebook(token);
      this.zone.run(() => this.router.navigateByUrl('/admin'));
    } catch (error) {
      this.notifierService.notify('error', 'Could not log in with Facebook');
      console.log(error);
    }
  }

  async githubLogIn() {
    window.location.href = this.githubUrl;
  }

  async logIn(): Promise<void> {
    this.isSubmitting = true;
    this.hasErrors = false;

    if (!this.login || this.login.length < 1 || !this.password || this.password.length < 1) {
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

  private googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.googleClientId,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachGoogleSignin(document.getElementById('googleBtn'));
    });
  }

  private attachGoogleSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        this.googleLogIn(token);
      }, (error) => {
        this.notifierService.notify('error', JSON.stringify(error, undefined, 2));
      });
  }

  private facebookInit() {
    FB.init({
      appId: this.facebookAppId,
      autoLogAppEvents: true,
      cookie: true,
      xfbml: true,
      version: 'v2.5'
    });
    FB.AppEvents.logPageView();
  }

  private githubInit() {
    this.githubUrl = `https://github.com/login/oauth/authorize?client_id=${this.githubClientId}` +
      `&scope=user&redirect_uri=${document.location.origin}/login/github/callback`;
  }
}
