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
              public allDeviceTypesAvailable?: boolean) {
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
