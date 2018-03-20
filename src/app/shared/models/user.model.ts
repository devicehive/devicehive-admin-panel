import {Network} from './network.model';
import {plainToClass} from 'class-transformer';

export enum UserRole {
  ADMIN,
  CLIENT
}

export enum UserStatus {
  ACTIVE,
  LOCKED_OUT,
  DISABLED
}

export class User {
  constructor(public id?: number,
              public login?: string,
              public role: UserRole = UserRole.CLIENT,
              public status: UserStatus = UserStatus.ACTIVE,
              public lastLogin?: string,
              public data?: string,
              public password?: string,
              public passwordConfirmation?: string,
              public introReviewed?: boolean,
              public allDeviceTypesAvailable?: boolean,
              public networks?: Array<Network>) {
  }

  static fromObject(plainObject: Object): User {
    const user = plainToClass<User, Object>(User, plainObject);
    if (user.data) {
      user.data = JSON.stringify(user.data, null, 2);
    } else {
      user.data = '';
    }
    return user;
  }

  static fromUser(user: User) {
    return new this(
      user.id, user.login, user.role, user.status, user.lastLogin, user.data, user.password, user.passwordConfirmation,
      user.introReviewed, user.allDeviceTypesAvailable, user.networks
    );
  }

  toObject() {
    const obj = Object.assign({}, this);
    if (this.data != null && this.data.length > 0) {
      obj.data = JSON.parse(this.data);
    } else {
      obj.data = null;
    }
    return obj;
  }
}
