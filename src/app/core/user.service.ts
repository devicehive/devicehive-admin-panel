import {Injectable} from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {User} from '../shared/models/user.model';
import {DeviceType} from '../shared/models/device-type.model';

@Injectable()
export class UserService {

  private UserListQuery = DeviceHive.models.query.UserListQuery;
  private currentUser: User;

  constructor(private dh: DevicehiveService) {
  }

  async getCurrentUser(): Promise<User> {
    if (!this.currentUser) {
      const httpDeviceHive = await this.dh.getHttpDeviceHive();
      this.currentUser = await httpDeviceHive.user.getCurrent();
      this.currentUser = User.fromObject(this.currentUser);
    }

    return this.currentUser;
  }

  async forceGetCurrentUser(): Promise<User> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    this.currentUser = await httpDeviceHive.user.getCurrent();
    this.currentUser = User.fromObject(this.currentUser);
    return this.currentUser;
  }

  clearCurrentUser(): void {
    this.currentUser = null;
  }

  async finishTourForCurrentUser(): Promise<void> {
    const updatedUser = new User(this.currentUser.id);
    updatedUser.role = null;
    updatedUser.status = null;
    updatedUser.introReviewed = true;
    this.currentUser.introReviewed = true;
    await this.updateCurrentUser(updatedUser);
  }

  async getAllUsers(): Promise<Array<User>> {
    const query = new this.UserListQuery('');
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.list(query);
  }

  async createUser(user: User): Promise<User> {
    user.introReviewed = false;
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.insert(user);
  }

  async updateUser(user: User): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.update(user);
  }

  async updateCurrentUser(user: User): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.updateCurrent(user);
  }

  async deleteUser(userId: number): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.delete(userId);
  }

  async getUser(id: number): Promise<User> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.get(id);
  }

  async grantAccessToNetwork(userId: number, networkId: number): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.assignNetwork(userId, networkId);
  }

  async revokeAccessToNetwork(userId: number, networkId: number): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.unassignNetwork(userId, networkId);
  }

  async getDeviceTypes(userId: number): Promise<Array<DeviceType>> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.getDeviceTypes(userId);
  }

  async allowAllDeviceTypesForUser(userId: number): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.assignAllDeviceTypes(userId);
  }

  async disallowAllDeviceTypesForUser(userId: number): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.unassignAllDeviceTypes(userId);
  }

  async grantAccessToDeviceType(userId: number, deviceTypeId: number): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.assignDeviceType(userId, deviceTypeId);
  }

  async revokeAccessToDeviceType(userId: number, deviceTypeId: number): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.user.unassignDeviceType(userId, deviceTypeId);
  }
}
