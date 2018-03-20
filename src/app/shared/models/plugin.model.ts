import {Device} from './device.model';
import {plainToClass} from 'class-transformer';

export class Plugin {
  constructor(public id?: string,
              public name?: string,
              public description?: string,
              public topicName?: string,
              public filter?: string,
              public status?: string,
              public subscriptionId?: string,
              public userId?: number,
              public parameters?: string,
              public returnCommands: boolean = false,
              public returnUpdatedCommands: boolean = false,
              public returnNotifications: boolean = false,
              public names: string = '',
              public device: Device = new Device(),
              public deviceId?: string,
              public networkIds: Array<number> = [],
              public deviceTypeIds: Array<number> = []) {

  }

  static fromObject(plainObject: Object): Plugin {
    const plugin = plainToClass<Plugin, Object>(Plugin, plainObject);
    if (plugin.parameters) {
      plugin.parameters = JSON.stringify(plugin.parameters, null, 2);
    } else {
      plugin.parameters = '';
    }
    return plugin;
  }

  static fromPluginApiResponse(plugin: Plugin) {
    const pluginCopy = new this(plugin.id, plugin.name, plugin.description, plugin.topicName, plugin.filter, plugin.status,
      plugin.subscriptionId, plugin.userId, plugin.parameters);

    const filters = plugin.filter.split('/');

    const typesString = filters[0];
    if (typesString === 'command') {
      pluginCopy.returnCommands = true;
    } else if (typesString === 'command_update') {
      pluginCopy.returnUpdatedCommands = true;
    } else if (typesString === 'notification') {
      pluginCopy.returnNotifications = true;
    } else {
      pluginCopy.returnCommands = true;
      pluginCopy.returnUpdatedCommands = true;
      pluginCopy.returnNotifications = true;
    }

    const networkIds = filters[1];
    if (networkIds === '*') {
      pluginCopy.networkIds = [];
    } else {
      pluginCopy.networkIds = networkIds.split(',').map(x => parseInt(x, 10));
    }

    const deviceTypeIds = filters[2];
    if (deviceTypeIds === '*') {
      pluginCopy.deviceTypeIds = [];
    } else {
      pluginCopy.deviceTypeIds = deviceTypeIds.split(',').map(x => parseInt(x, 10));
    }

    const deviceId = filters[3];
    if (deviceId === '*') {
      pluginCopy.deviceId = null;
    } else {
      pluginCopy.deviceId = deviceId;
    }

    const names = filters[4];
    if (names === '*') {
      pluginCopy.names = null;
    } else {
      pluginCopy.names = names;
    }

    return pluginCopy;
  }

  toObject() {
    const obj = Object.assign({}, this);
    if (this.parameters != null && this.parameters.length > 0) {
      obj.parameters = JSON.parse(this.parameters);
    } else {
      obj.parameters = null;
    }
    return obj;
  }
}
