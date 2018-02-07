import {Injectable} from '@angular/core';
import {DevicehiveService} from "./devicehive.service";

@Injectable()
export class JwtService {

  constructor(private dh: DevicehiveService) {
  }

}
