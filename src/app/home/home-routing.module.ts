import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {JwtLoginComponent} from "./jwt-login/jwt-login.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'jwt/:token', component: JwtLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
