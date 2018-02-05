import { Injectable } from '@angular/core';
import {DevicehiveService} from "./devicehive.service";
import {Network} from "../shared/models/network.model";

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

  async createNetwork(network: Network) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.network.insert(network);
  }

  async updateNetwork(network: Network) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.network.update(network);
  }

  async deleteNetwork(networkId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.network.delete(networkId);
  }
}
