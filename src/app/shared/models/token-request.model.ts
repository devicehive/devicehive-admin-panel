export class TokenRequest {
  constructor(public userId: number,
              public expiration: Date,
              public actions?: Array<string>,
              public networkIds?: Array<string>,
              public deviceTypeIds?: Array<string>) {

  }

  toObject() {
    return Object.assign({}, this);
  }
}
