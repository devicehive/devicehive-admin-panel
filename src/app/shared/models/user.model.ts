export class User {
  constructor(public id?: string,
              public login?: string,
              public role?: UserRole,
              public status?: UserStatus,
              public lastLogin?: string,
              public data?: Object,
              public password?: string,
              public introReviewed?: boolean,
              public allDeviceTypesAvailable?: boolean) {
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
