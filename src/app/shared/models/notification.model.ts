export class Notification {
  constructor(public id?: number,
              public notification?: string,
              public timestamp?: string,
              public parameters?: string) {
  }

  toObject() {
    let obj = Object.assign({}, this);
    if (this.parameters != null && this.parameters.length > 0) {
      obj.parameters = JSON.parse(this.parameters);
    } else {
      obj.parameters = null;
    }
    return obj;
  }
}
