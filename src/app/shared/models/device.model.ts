export class Device {
  constructor(public id?: string,
              public name?: string,
              public data?: Object,
              public networkId?: number,
              public deviceTypeId?: number,
              public blocked?: boolean) {
  }

  toObject() {
    return Object.assign({}, this);
  }
}
