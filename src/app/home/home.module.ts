import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import { JwtLoginComponent } from './jwt-login/jwt-login.component';
import { GithubLoginComponent } from './github-login/github-login.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [LoginComponent, JwtLoginComponent, GithubLoginComponent]
})
export class HomeModule {
}
