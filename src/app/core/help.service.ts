import {Injectable} from '@angular/core';

@Injectable()
export class HelpService {

  constructor() {
  }

  /*
  Device
   */

  getDeviceNameTip(): string {
    return 'Device name. Used to identify the device.';
  }

  getDeviceNetworkTip(): string {
    return 'Network the device belongs to.';
  }

  getDeviceDeviceTypeTip(): string {
    return 'The type of the device.';
  }

  getDeviceOperationTip(): string {
    return 'Whether the device should operate normally or be blocked.';
  }

  getDeviceDataTip(): string {
    return 'Arbitrary data about the device in JSON format.';
  }

  /*
  Network
   */

  getNetworkNameTip(): string {
    return 'The network name must be unique.';
  }

  getNetworkDescriptionTip(): string {
    return 'Arbitrary network description in text format.';
  }

  /*
  Device Type
   */
  getDeviceTypeNameTip(): string {
    return 'The device type name must be unique.';
  }

  getDeviceTypeDescriptionTip(): string {
    return 'Arbitrary device type description in text format.';
  }

  /*
  User
   */
  getUserLoginTip(): string {
    return 'The login must be unique.';
  }

  getUserRoleTip(): string {
    return 'Admins have the right to add/edit/delete any entity. Clients can only control their own devices.';
  }

  getUserStatusTip(): string {
    return 'Only active users are able to log in. Disabled users have been banned from the system by an admin. ' +
      'Locked out users entered an incorrect password 5 times in a row.';
  }

  getUserPasswordTip(): string {
    return 'Password for the user. The password must be at least 6 characters long.';
  }

  getUserLastLoginTip(): string {
    return 'Date and time when the user most recently logged in (UTC).';
  }

  getUserDataTip(): string {
    return 'Arbitrary data about the user in JSON format.';
  }

  /*
  JWT Tokens
   */
  getJwtTip(): string {
    return 'Two tokens will be generated. If no expiration date is specified, access token will be valid for 30 minutes ' +
      'and refresh token will be valid for 6 months.';
  }

  /*
  Plugin
   */
  getPluginNameTip(): string {
    return 'Plugin name. Must be unique.';
  }

  getPluginDescriptionTip(): string {
    return 'An arbitrary description of the plugin.';
  }

  getPluginFilterTip(): string {
    return 'Information regarding which data the plugin will receive. Format is: [commands, updated commands, ' +
      'notifications or everything]/comma-separated list of network ids/comma-separated list of device type ids/' +
      'device id/comma-separated list of names';
  }

  getPluginStatusTip(): string {
    return 'Current status of the plugin. CREATED is reserved for newly-created plugins and cannot be set manually.';
  }

  getPluginParametersTip(): string {
    return 'Arbitrary data about the plugin in JSON format.';
  }

  getPluginFiltersTip(): string {
    return 'Select which filters to apply to determine which commands/notifications the plugin will receive. Leaving a field' +
      'empty is equivalent to "any".';
  }

  getPluginNamesTip(): string {
    return 'Comma-separated list of command/notification names the plugin should accept.';
  }

  /*
  Command
   */
  getCommandNameTip(): string {
    return 'Arbitrary name. Does not have to be unique.';
  }

  getCommandTimeTip(): string {
    return 'UTC time is saved in the database.';
  }

  getCommandParametersTip(): string {
    return 'Should be sent as valid JSON.';
  }

  getCommandStatusTip(): string {
    return 'Reported by device or infrastructure.';
  }

  getCommandResultTip(): string {
    return 'Execution outcome which may be sent by device.';
  }

  /*
  Notification
   */
  getNotificationNameTip(): string {
    return 'Arbitrary name. Does not have to be unique.';
  }

  getNotificationTimeTip(): string {
    return 'UTC time is saved in the database.';
  }

  getNotificationParametersTip(): string {
    return 'Should be sent as valid JSON.';
  }
}
