import { Injectable } from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {DeviceType} from '../shared/models/device-type.model';

@Injectable()
export class DeviceTypeService {

  private DeviceTypeListQuery = DeviceHive.models.query.DeviceTypeListQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllDeviceTypes(): Promise<Array<DeviceType>> {
    const query = new this.DeviceTypeListQuery('');
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.deviceType.list(query);
  }

  async createDeviceType(deviceType: DeviceType): Promise<DeviceType> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.deviceType.insert(deviceType);
  }

  async updateDeviceType(deviceType: DeviceType): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.deviceType.update(deviceType);
  }

  async deleteDeviceType(deviceTypeId: number): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.deviceType.delete(deviceTypeId);
  }
}
