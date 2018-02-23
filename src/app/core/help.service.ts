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
}
