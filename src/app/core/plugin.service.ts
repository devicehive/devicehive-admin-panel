import {Injectable} from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {Plugin} from '../shared/models/plugin.model';

@Injectable()
export class PluginService {

  private PluginListQuery = DeviceHive.models.query.PluginListQuery;
  private PluginRegisterQuery = DeviceHive.models.query.PluginRegisterQuery;
  private PluginUpdateQuery = DeviceHive.models.query.PluginUpdateQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllPlugins() {
    const query = new this.PluginListQuery('');
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.plugin.list(query);
  }

  async registerPlugin(plugin: Plugin) {
    const query = new this.PluginRegisterQuery({
      deviceId: plugin.device.id,
      networkIds: plugin.networkIds,
      deviceTypeIds: plugin.deviceTypeIds,
      names: plugin.names,
      returnCommands: plugin.returnCommands,
      returnUpdatedCommands: plugin.returnUpdatedCommands,
      returnNotifications: plugin.returnNotifications
    });

    const plug = {
      name: plugin.name,
      description: plugin.description,
      parameters: (!plugin.parameters || plugin.parameters.length === 0) ? {} : JSON.parse(plugin.parameters)
    };

    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.plugin.register(plug, query);
  }

  async updatePlugin(plugin: Plugin, originalPlugin: Plugin) {
    let queryObject: any;
    queryObject = {topicName: plugin.topicName};

    if (plugin.device.id !== originalPlugin.device.id) {
      queryObject.deviceId = plugin.device.id;
    }

    if (plugin.networkIds !== originalPlugin.networkIds) {
      queryObject.networkIds = plugin.networkIds;
    }

    if (plugin.deviceTypeIds !== originalPlugin.deviceTypeIds) {
      queryObject.deviceTypeIds = plugin.deviceTypeIds;
    }

    if (plugin.names !== originalPlugin.names) {
      queryObject.names = plugin.names;
    }

    if (plugin.returnCommands !== originalPlugin.returnCommands) {
      queryObject.returnCommands = plugin.returnCommands;
    }

    if (plugin.returnUpdatedCommands !== originalPlugin.returnUpdatedCommands) {
      queryObject.returnUpdatedCommands = plugin.returnUpdatedCommands;
    }

    if (plugin.returnNotifications !== originalPlugin.returnNotifications) {
      queryObject.returnNotifications = plugin.returnNotifications;
    }

    if (plugin.name !== originalPlugin.name) {
      queryObject.name = plugin.name;
    }

    if (plugin.status !== originalPlugin.status) {
      queryObject.status = plugin.status;
    }

    if (plugin.description !== originalPlugin.description) {
      queryObject.description = plugin.description;
    }

    if (plugin.parameters !== originalPlugin.parameters) {
      queryObject.parameters = (!plugin.parameters || plugin.parameters.length === 0) ? '' : plugin.parameters;
    }

    const query = new this.PluginUpdateQuery(queryObject);

    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.plugin.update(query);
  }

  async generateNewTokens(topicName: string) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.token.createPluginToken(new DeviceHive.models.PluginToken({topicName: topicName}));
  }

  async deletePlugin(topicName: string) {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.plugin.delete(topicName);
  }
}
