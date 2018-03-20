export class Network {
  constructor(public id?: number,
              public name?: string,
              public description?: string) {
  }

  toObject() {
    return Object.assign({}, this);
  }
}
