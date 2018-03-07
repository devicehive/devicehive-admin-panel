import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import { JwtLoginComponent } from './jwt-login/jwt-login.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [LoginComponent, JwtLoginComponent]
})
export class HomeModule {
}
