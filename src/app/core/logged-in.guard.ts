import {DevicehiveService} from "./devicehive.service";
import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private dh: DevicehiveService, private router: Router) {
  }

  canActivate() {
    if (this.dh.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
