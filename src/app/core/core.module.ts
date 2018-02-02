import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DevicehiveService} from "./devicehive.service";
import {LoggedInGuard} from "./logged-in.guard";
import {UserService} from "./user.service";
import {NetworkService} from "./network.service";
import {DeviceTypeService} from "./device-type.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  declarations: [],
  providers: [
    DevicehiveService,
    LoggedInGuard,
    UserService,
    NetworkService,
    DeviceTypeService
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
