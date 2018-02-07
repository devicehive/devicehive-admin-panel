export class Notification {
  constructor(public id?: number,
              public notification?: string,
              public timestamp?: string,
              public parameters?: Object) {
  }

  toObject() {
    return Object.assign({}, this);
  }
}
