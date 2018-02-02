export class Device {
  constructor(public id?: string,
              public name?: string,
              public data?: Object,
              public networkdId?: number,
              public deviceTypeId?: number,
              public blocked?: boolean) {
  }
}
