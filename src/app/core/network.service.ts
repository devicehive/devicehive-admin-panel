import { Injectable } from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {Network} from '../shared/models/network.model';

@Injectable()
export class NetworkService {

  private NetworkListQuery = DeviceHive.models.query.NetworkListQuery;
  private NetworkDeleteQuery = DeviceHive.models.query.NetworkDeleteQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllNetworks(): Promise<Array<Network>> {
    const query = new this.NetworkListQuery('');
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.network.list(query);
  }

  async createNetwork(network: Network): Promise<Network> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.network.insert(network);
  }

  async updateNetwork(network: Network): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.network.update(network);
  }

  async deleteNetwork(networkId: number, force: boolean = false): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    const query = new this.NetworkDeleteQuery({
      networkId: networkId,
      force: force
    });
    return await httpDeviceHive.network.delete(query);
  }
}
