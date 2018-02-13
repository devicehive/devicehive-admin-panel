import {Injectable} from '@angular/core';
import {User} from "../shared/models/user.model";
import {Network} from "../shared/models/network.model";

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
      return 'Data must either be empty or contain valid json'
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

  static isValidJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
