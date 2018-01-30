import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {UsersComponent} from "./users/users.component";
import {NetworksComponent} from "./networks/networks.component";
import {DeviceTypesComponent} from "./device-types/device-types.component";
import {DevicesComponent} from "./devices/devices.component";
import {JwtTokensComponent} from "./jwt-tokens/jwt-tokens.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'users'
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'networks',
        component: NetworksComponent
      },
      {
        path: 'device-types',
        component: DeviceTypesComponent
      },
      {
        path: 'devices',
        component: DevicesComponent
      },
      {
        path: 'jwt-tokens',
        component: JwtTokensComponent
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
