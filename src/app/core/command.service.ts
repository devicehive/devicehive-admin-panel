import {Injectable} from '@angular/core';
import {DevicehiveService} from './devicehive.service';
import {Command} from '../shared/models/command.model';

@Injectable()
export class CommandService {

  private CommandPollQuery = DeviceHive.models.query.CommandPollQuery;
  private CommandListQuery = DeviceHive.models.query.CommandListQuery;

  constructor(private dh: DevicehiveService) {
  }

  async getAllCommands(deviceId: string): Promise<Array<Command>> {
    const query = new this.CommandListQuery({deviceId: deviceId});
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.command.list(query);
  }

  async pollCommands(deviceId: string): Promise<Array<Command>> {
    const query = new this.CommandPollQuery({deviceId: deviceId});
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.command.poll(query);
  }

  async pollUpdatedCommands(deviceId: string): Promise<Array<Command>> {
    const query = new this.CommandPollQuery({deviceId: deviceId, returnUpdatedCommands: true});
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.command.poll(query);
  }

  async insertCommand(deviceId: string, command: Command): Promise<Command> {
    const httpDeviceHive = await this.dh.getHttpDeviceHive();
    return await httpDeviceHive.command.insert(deviceId, command);
  }
}
