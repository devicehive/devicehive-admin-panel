import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {LoginComponent} from './login/login.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [LoginComponent]
})
export class HomeModule {
}
