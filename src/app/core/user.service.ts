import {Injectable} from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {User} from '../shared/models/user.model';

@Injectable()
export class UserService {

  private UserListQuery = DeviceHive.models.query.UserListQuery;
  private currentUser: User;

  constructor(private dh: DevicehiveService) {
  }

  async getCurrentUser() {
    if (!this.currentUser) {
      const httpDeviceHive = await this.dh.getHttpDeviceHive();
      this.currentUser = await httpDeviceHive.user.getCurrent();
      this.currentUser = User.fromObject(this.currentUser);
    }

    return this.currentUser;
  }

  async forceGetCurrentUser() {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    this.currentUser = await httpDeviceHive.user.getCurrent();
    this.currentUser = User.fromObject(this.currentUser);
    return this.currentUser;
  }

  clearCurrentUser() {
    this.currentUser = null;
  }

  async finishTourForCurrentUser() {
    const updatedUser = new User(this.currentUser.id);
    updatedUser.role = null;
    updatedUser.status = null;
    updatedUser.introReviewed = true;
    this.currentUser.introReviewed = true;
    await this.updateCurrentUser(updatedUser);
  }

  async getAllUsers() {
    const query = new this.UserListQuery('');
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.list(query);
  }

  async createUser(user: User) {
    user.introReviewed = false;
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.insert(user);
  }

  async updateUser(user: User) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.update(user);
  }

  async updateCurrentUser(user: User) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.updateCurrent(user);
  }

  async deleteUser(userId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.delete(userId);
  }

  async getUser(id: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.get(id);
  }

  async grantAccessToNetwork(userId: number, networkId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.assignNetwork(userId, networkId);
  }

  async revokeAccessToNetwork(userId: number, networkId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.unassignNetwork(userId, networkId);
  }

  async getDeviceTypes(userId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.getDeviceTypes(userId);
  }

  async allowAllDeviceTypesForUser(userId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.assignAllDeviceTypes(userId);
  }

  async disallowAllDeviceTypesForUser(userId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.unassignAllDeviceTypes(userId);
  }

  async grantAccessToDeviceType(userId: number, deviceTypeId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.assignDeviceType(userId, deviceTypeId);
  }

  async revokeAccessToDeviceType(userId: number, deviceTypeId: number) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.unassignDeviceType(userId, deviceTypeId);
  }
}
