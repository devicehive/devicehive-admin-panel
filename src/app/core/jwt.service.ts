import {Injectable} from '@angular/core';
import {DevicehiveService} from "./devicehive.service";
import * as decode from 'jwt-decode';
import {TokenRequest} from "../shared/models/token-request.model";

@Injectable()
export class JwtService {

  constructor(private dh: DevicehiveService) {
  }

  async createTokens(expiration) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    const refreshToken = await this.dh.getRefreshToken();
    const decoded = decode(refreshToken);
    const tokenRequest = new TokenRequest(decoded.payload.u, expiration, decoded.payload.a, decoded.payload.n, decoded.payload.dt);
    return await httpDeviceHive.token.createUserToken(tokenRequest);
  }
}
