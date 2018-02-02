export class Command {
  constructor(public id?: number,
              public command?: string,
              public timestamp?: string,
              public lastUpdated?: string,
              public userId?: number,
              public deviceId?: number,
              public networkdId?: string,
              public deviceTypeId?: string,
              public parameters?: Object,
              public lifetime?: number,
              public status?: string,
              public result?: string) {
  }
}
