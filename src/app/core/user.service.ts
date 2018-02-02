import {Injectable} from '@angular/core';
import {DevicehiveService} from "./devicehive.service";
import {User} from "../shared/models/user.model";

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

  async createUser(user: User) {
    user.introReviewed = false;
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.insert(user);
  }

  async deleteUser(user: User) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.delete(user.id);
  }

}
