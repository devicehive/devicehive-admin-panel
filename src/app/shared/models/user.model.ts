import {Network} from "./network.model";

export class User {
  constructor(public id?: number,
              public login?: string,
              public role?: UserRole,
              public status?: UserStatus,
              public lastLogin?: string,
              public data?: Object,
              public password?: string,
              public passwordConfirmation?: string,
              public introReviewed?: boolean,
              public allDeviceTypesAvailable?: boolean,
              //TODO - can this be refactored to Set<Network> ?
              public networks?: Array<Network>) {
  }

  toObject() {
    return Object.assign({}, this);
  }
}

export enum UserRole {
  ADMIN,
  CLIENT
}

export enum UserStatus {
  ACTIVE,
  LOCKED_OUT,
  DISABLED
}
