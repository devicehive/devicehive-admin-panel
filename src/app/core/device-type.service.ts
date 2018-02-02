import { Injectable } from '@angular/core';
import {DevicehiveService} from "./devicehive.service";

@Injectable()
export class DeviceTypeService {

  DeviceTypeListQuery = DeviceHive.models.query.DeviceTypeListQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllDeviceTypes() {
    const query = new this.DeviceTypeListQuery("");
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.deviceType.list(query);
  }

}
