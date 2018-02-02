import { Injectable } from '@angular/core';
import {DevicehiveService} from "./devicehive.service";

@Injectable()
export class NetworkService {

  NetworkListQuery = DeviceHive.models.query.NetworkListQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllNetworks() {
    const query = new this.NetworkListQuery("");
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.network.list(query);
  }

}
