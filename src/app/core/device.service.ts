import {Injectable} from '@angular/core';
import {DevicehiveService} from "./devicehive.service";

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

}
