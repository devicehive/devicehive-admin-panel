import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {JwtLoginComponent} from './jwt-login/jwt-login.component';
import {GithubLoginComponent} from './github-login/github-login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'jwt/:token', component: JwtLoginComponent},
  {path: 'login/github/callback', component: GithubLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
