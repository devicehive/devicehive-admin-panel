import {Injectable} from '@angular/core';
import {DevicehiveService} from "./devicehive.service";

@Injectable()
export class UserService {

  UserListQuery = DeviceHive.models.query.UserListQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllUsers() {
    const query = new this.UserListQuery("");
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.list(query);
  }

}
