import {Injectable} from '@angular/core';
import {User} from '../shared/models/user.model';
import {Network} from '../shared/models/network.model';
import {DeviceType} from '../shared/models/device-type.model';
import {Device} from '../shared/models/device.model';
import {Command} from '../shared/models/command.model';
import {Notification} from '../shared/models/notification.model';
import {isNumeric} from 'rxjs/util/isNumeric';
import {Plugin} from '../shared/models/plugin.model';

@Injectable()
export class UtilService {

  constructor() {
  }

  static getUserInputErrors(user: User): string {
    if (!user.login || user.login.length < 3) {
      return 'Login must be at least 3 characters long';
    }

    if (!user.password || user.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    if (user.password !== user.passwordConfirmation) {
      return 'Password must be the same as the password confirmation';
    }

    if (user.data != null && user.data.length > 0 && !this.isValidJson(user.data)) {
      return 'Data must either be empty or contain valid json';
    }

    return null;
  }

  static getUserDetailsInputErrors(user: User): string {
    if (!user.login || user.login.length < 3) {
      return 'Login must be at least 3 characters long';
    }

    if (user.password && user.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    if (user.password && user.password !== user.passwordConfirmation) {
      return 'Password must be the same as the password confirmation';
    }

    if (user.data != null && user.data.length > 0 && !this.isValidJson(user.data)) {
      return 'Data must either be empty or contain valid json';
    }

    return null;
  }

  static getNetworkInputErrors(network: Network): string {
    if (!network.name || network.name.length < 1) {
      return 'Network name cannot be empty';
    }

    if (network.name.length > 128) {
      return 'Network name cannot be longer than 128 symbols';
    }

    if (network.description && network.description.length > 128) {
      return 'Description cannot be longer than 128 symbols';
    }

    return null;
  }

  static getDeviceTypeInputErrors(deviceType: DeviceType): string {
    if (!deviceType.name || deviceType.name.length < 1) {
      return 'Device type name cannot be empty';
    }

    if (deviceType.name.length > 128) {
      return 'Device type name cannot be longer than 128 symbols';
    }

    if (deviceType.description && deviceType.description.length > 128) {
      return 'Description cannot be longer than 128 symbols';
    }

    return null;
  }

  static getDeviceInputErrors(device: Device): string {
    if (!device.name || device.name.length < 1) {
      return 'Device name cannot be empty';
    }

    if (device.name.length > 128) {
      return 'Device name cannot be longer than 128 symbols';
    }

    if (!device.networkId) {
      return 'Please select a network';
    }

    if (!device.deviceTypeId) {
      return 'Please select a device type';
    }

    if (device.data != null && device.data.length > 0 && !this.isValidJson(device.data)) {
      return 'Data must either be empty or contain valid json';
    }

    return null;
  }

  static getCommandInputErrors(command: Command): string {
    if (!command.command || command.command.length < 1) {
      return 'Command cannot be empty';
    }

    if (command.parameters != null && command.parameters.length > 0 && !this.isValidJson(command.parameters)) {
      return 'Parameters must either be empty or contain valid json';
    }

    return null;
  }

  static getNotificationInputErrors(notification: Notification): string {
    if (!notification.notification || notification.notification.length < 1) {
      return 'Notification cannot be empty';
    }

    if (notification.parameters != null && notification.parameters.length > 0 && !this.isValidJson(notification.parameters)) {
      return 'Parameters must either be empty or contain valid json';
    }

    return null;
  }

  static getPluginInputErrors(plugin: Plugin): string {
    if (!plugin.name || plugin.name.length < 3) {
      return 'Plugin name should be at least 3 characters long';
    }

    if (plugin.name.includes(' ')) {
      return 'Plugin name cannot contain spaces';
    }

    if (!plugin.description || plugin.description.length < 3) {
      return 'Plugin description should be at least 3 characters long';
    }

    if (plugin.parameters != null && plugin.parameters.length > 0 && !this.isValidJson(plugin.parameters)) {
      return 'Parameters must either be empty or contain valid json';
    }

    if (!plugin.returnCommands && !plugin.returnUpdatedCommands && !plugin.returnNotifications) {
      return 'Commands, updated commands and notifications cannot all be false. Pick at least one.';
    }
  }

  static isValidJson(str: string): boolean {
    if (isNumeric(str)) {
      return false;
    }

    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
