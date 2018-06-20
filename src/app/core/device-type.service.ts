import { Injectable } from '@angular/core';
import { DevicehiveService } from './devicehive.service';
import { DeviceType } from '../shared/models/device-type.model';
import { DeviceTypeFilter } from '../shared/models/filters/device-type-filter.model';

@Injectable()
export class DeviceTypeService {

  private DeviceTypeListQuery = DeviceHive.models.query.DeviceTypeListQuery;
  private DeviceTypeDeleteQuery = DeviceHive.models.query.DeviceTypeDeleteQuery;
  private DeviceTypeCountQuery = DeviceHive.models.query.DeviceTypeCountQuery;

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

  async deleteDeviceType(deviceTypeId: number, force: boolean = false): Promise<any> {
    const query = new this.DeviceTypeDeleteQuery({
      deviceTypeId: deviceTypeId,
      force: force
    });
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.deviceType.delete(query);
  }

  async getDeviceTypesCount(): Promise<number> {
    const query = new this.DeviceTypeCountQuery();
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    const response = await httpDeviceHive.deviceType.count(query);
    return response.count;
  }

  async getSpecificAmountOfDeviceTypes(take: number, skip: number, filter: DeviceTypeFilter = new DeviceTypeFilter()): Promise<Array<DeviceType>> {
    const query = new this.DeviceTypeListQuery({
      sortField: filter.sortField,
      sortOrder: filter.sortOrder,
      take: take,
      skip: skip
    });
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.deviceType.list(query);
  }
}
