import {Injectable} from '@angular/core';

@Injectable()
export class HelpService {

  constructor() {
  }

  /*
  Device
   */

  getDeviceNameTip() {
    return 'Device name. Used to identify the device.'
  }

  getDeviceNetworkTip() {
    return 'Network the device belongs to.'
  }

  getDeviceDeviceTypeTip() {
    return 'The type of the device.'
  }

  getDeviceOperationTip() {
    return 'Whether the device should operate normally or be blocked.'
  }

  getDeviceDataTip() {
    return 'Arbitrary data about the device in JSON format.'
  }

  /*
  Network
   */

  getNetworkNameTip() {
    return 'Network name. The name must be unique.'
  }

  getNetworkDescriptionTip() {
    return 'A description for the network.'
  }

  /*
  Device Type
   */
  getDeviceTypeNameTip() {
    return 'Device type name. The name must be unique.'
  }

  getDeviceTypeDescriptionTip() {
    return 'A description for the device type.'
  }

  /*
  User
   */
  getUserLoginTip() {
    return 'User login. The login must be unique.'
  }

  getUserRoleTip() {
    return 'Role of the user. Admins have the right to add/edit/delete any entity. Clients can only control their own devices.'
  }

  getUserStatusTip() {
    return 'User status. Only active users are able to log in. Disabled users have been banned from the system by an admin. ' +
      'Locked out users entered an incorrect password 5 times in a row.'
  }

  getUserPasswordTip() {
    return 'Password for the user. The password must be at least 6 characters long.'
  }

  getUserLastLoginTip() {
    return 'Date and time when the user most recently logged in (UTC).'
  }

  getUserDataTip() {
    return 'Arbitrary data about the user in JSON format.'
  }

  /*
  Plugin
   */
  getPluginNameTip() {
    return 'Plugin name. Must be unique.'
  }

  getPluginDescriptionTip() {
    return 'An arbitrary description of the plugin.'
  }

  getPluginFilterTip() {
    return 'Information regarding which data the plugin will receive. Format is: [commands, updated commands, ' +
      'notifications or everything]/comma-separated list of network ids/comma-separated list of device type ids/' +
      'device id/comma-separated list of names'
  }

  getPluginStatusTip() {
    return 'Current status of the plugin. CREATED is reserved for newly-created plugins and cannot be set manually.'
  }

  getPluginParametersTip() {
    return 'Arbitrary data about the plugin in JSON format.'
  }

  getPluginFiltersTip() {
    return 'Select which filters to apply to determine which commands/notifications the plugin will receive. Leaving a field' +
      'empty is equivalent to "any".'
  }

  getPluginNamesTip() {
    return 'Comma-separated list of command/notification names the plugin should accept.'
  }
}
