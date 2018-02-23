import {DevicehiveService} from "./devicehive.service";
import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private dh: DevicehiveService) {
  }

  canActivate() {
    if (this.dh.isLoggedIn()) {
      return true;
    }

    window.location.href = document.location.origin;
    return false;
  }
}
