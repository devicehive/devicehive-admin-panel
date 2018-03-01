import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {UsersComponent} from "./users/users.component";
import {NetworksComponent} from "./networks/networks.component";
import {DeviceTypesComponent} from "./device-types/device-types.component";
import {DevicesComponent} from "./devices/devices.component";
import {JwtTokensComponent} from "./jwt-tokens/jwt-tokens.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {DeviceDetailsComponent} from "./devices/device-details/device-details.component";
import {LoggedInGuard} from "../core/logged-in.guard";
import {PluginsComponent} from "./plugins/plugins.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        redirectTo: 'devices'
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'user/:id',
        component: UserDetailsComponent
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
        path: 'device/:id',
        component: DeviceDetailsComponent
      },
      {
        path: 'jwt-tokens',
        component: JwtTokensComponent
      },
      {
        path: 'plugins',
        component: PluginsComponent
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
