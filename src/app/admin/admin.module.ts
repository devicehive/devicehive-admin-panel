import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SharedModule} from "../shared/shared.module";
import {UsersComponent} from './users/users.component';
import {NetworksComponent} from './networks/networks.component';
import {DeviceTypesComponent} from './device-types/device-types.component';
import {DevicesComponent} from './devices/devices.component';
import {JwtTokensComponent} from './jwt-tokens/jwt-tokens.component';
import {UserDetailsComponent} from './users/user-details/user-details.component';
import {UserComponent} from "./users/user/user.component";
import {NetworkComponent} from "./networks/network/network.component";
import {DeviceTypeComponent} from './device-types/device-type/device-type.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
    UserComponent,
    NetworksComponent,
    NetworkComponent,
    DeviceTypesComponent,
    DevicesComponent,
    JwtTokensComponent,
    UserDetailsComponent,
    DeviceTypeComponent
  ]
})
export class AdminModule {
}
