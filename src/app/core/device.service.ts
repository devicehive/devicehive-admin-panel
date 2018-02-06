import {Injectable} from '@angular/core';
import {DevicehiveService} from "./devicehive.service";
import {Device} from "../shared/models/device.model";

@Injectable()
export class DeviceService {

  DeviceListQuery = DeviceHive.models.query.DeviceListQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllDevices() {
    const query = new this.DeviceListQuery("");
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.list(query);
  }

  async getDevice(deviceId: string) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.get(deviceId);
  }

  async createDevice(device: Device) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.add(device);
  }

  async updateDevice(device: Device) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.add(device);
  }

  async deleteDevice(deviceId: string) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.device.delete(deviceId);
  }

}
