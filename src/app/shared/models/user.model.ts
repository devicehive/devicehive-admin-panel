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

  toUserUpdate(): UserUpdate {
    return new UserUpdate(this.login, this.role.valueOf(), this.status.valueOf(), this.data, this.password, this.introReviewed);
  }
}

export class UserUpdate {
  constructor(public login: string,
              public role: number,
              public status: number,
              public data: Object,
              public password: string,
              public introReviewed: boolean) {

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
