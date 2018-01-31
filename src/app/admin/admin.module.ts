import {NgModule} from '@angular/core';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SharedModule} from "../shared/shared.module";
import { UsersComponent } from './users/users.component';
import { NetworksComponent } from './networks/networks.component';
import { DeviceTypesComponent } from './device-types/device-types.component';
import { DevicesComponent } from './devices/devices.component';
import { JwtTokensComponent } from './jwt-tokens/jwt-tokens.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
    NetworksComponent,
    DeviceTypesComponent,
    DevicesComponent,
    JwtTokensComponent,
    EditUserComponent
  ]
})
export class AdminModule {
}
