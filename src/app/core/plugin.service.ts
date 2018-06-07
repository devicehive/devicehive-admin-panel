import {Injectable} from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {Plugin} from '../shared/models/plugin.model';
import {PluginCredentials} from '../shared/models/plugin-credentials.model';
import {JwtToken} from '../shared/models/jwt-token.model';

@Injectable()
export class PluginService {

  private PluginListQuery = DeviceHive.models.query.PluginListQuery;
  private PluginRegisterQuery = DeviceHive.models.query.PluginRegisterQuery;
  private PluginUpdateQuery = DeviceHive.models.query.PluginUpdateQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllPlugins(): Promise<Array<Plugin>> {
    const query = new this.PluginListQuery('');
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.plugin.list(query);
  }

  async registerPlugin(plugin: Plugin): Promise<PluginCredentials> {
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

  async updatePlugin(plugin: Plugin): Promise<any> {

    const query = new this.PluginUpdateQuery({
      topicName: plugin.topicName,
      deviceId: plugin.device.id,
      networkIds : plugin.networkIds,
      deviceTypeIds : plugin.deviceTypeIds,
      names : plugin.names,
      returnCommands : plugin.returnCommands,
      returnUpdatedCommands : plugin.returnUpdatedCommands,
      returnNotifications : plugin.returnNotifications,
      name : plugin.name,
      status : plugin.status === Plugin.STATUSES.CREATED ? undefined : plugin.status,
      description : plugin.description,
      parameters : (!plugin.parameters || plugin.parameters.length === 0) ? '' : plugin.parameters
    });

    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.plugin.update(query);
  }

  async generateNewTokens(topicName: string): Promise<JwtToken> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    // Actions - 16 MANAGE_PLUGIN
    return await httpDeviceHive.token.createPluginToken(new DeviceHive.models.PluginToken({actions: [16], topicName: topicName}));
  }

  async deletePlugin(topicName: string): Promise<any> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.plugin.delete(topicName);
  }
}
