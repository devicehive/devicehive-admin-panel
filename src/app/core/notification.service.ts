import {Injectable} from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {Notification} from '../shared/models/notification.model';

@Injectable()
export class NotificationService {

  private NotificationPollQuery = DeviceHive.models.query.NotificationPollQuery;
  private NotificationListQuery = DeviceHive.models.query.NotificationListQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllNotifications(deviceId: string): Promise<Array<Notification>> {
    const query = new this.NotificationListQuery({deviceId: deviceId});
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.notification.list(query);
  }

  async pollNotifications(deviceId: string): Promise<Array<Notification>> {
    const query = new this.NotificationPollQuery({deviceId: deviceId});
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.notification.poll(query);
  }

  async insertNotification(deviceId: string, notification: Notification): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.notification.insert(deviceId, notification);
  }
}
