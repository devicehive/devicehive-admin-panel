import {plainToClass} from 'class-transformer';

export class Device {
  constructor(public id?: string,
              public name?: string,
              public data?: string,
              public networkId?: number,
              public deviceTypeId?: number,
              public isBlocked: boolean = false) {
  }

  static fromObject(plainObject: Object): Device {
    const device = plainToClass<Device, Object>(Device, plainObject);
    if (device.data) {
      device.data = JSON.stringify(device.data, null, 2);
    } else {
      device.data = '';
    }
    return device;
  }

  static fromDevice(device: Device) {
    return new this(
      device.id, device.name, device.data, device.networkId, device.deviceTypeId, device.isBlocked
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
