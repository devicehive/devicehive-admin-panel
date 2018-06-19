import {Injectable} from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {Device} from '../shared/models/device.model';

@Injectable()
export class DeviceService {

  private DeviceListQuery = DeviceHive.models.query.DeviceListQuery;
  private DeviceCountQuery = DeviceHive.models.query.DeviceCountQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllDevices(): Promise<Array<Device>> {
    const query = new this.DeviceListQuery('');
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.list(query);
  }

  async getDevice(deviceId: string): Promise<Device> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.get(deviceId);
  }

  async createDevice(device: Device): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.add(device);
  }

  async updateDevice(device: Device): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.add(device);
  }

  async deleteDevice(deviceId: string): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.delete(deviceId);
  }

  async getDevicesCount(): Promise<number>{
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    const query = new this.DeviceCountQuery();
    const response = await httpDeviceHive.device.count(query);
    return response.count;
  }

  async getSpecificAmountOfDevices(take: number, skip: number){
    const query = new this.DeviceListQuery({
      take: take,
      skip: skip
    });
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.list(query);
  }
}
