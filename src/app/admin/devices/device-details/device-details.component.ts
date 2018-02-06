import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {NetworkService} from "../../../core/network.service";
import {DeviceTypeService} from "../../../core/device-type.service";
import {DeviceService} from "../../../core/device.service";
import {DeviceType} from "../../../shared/models/device-type.model";
import {Network} from "../../../shared/models/network.model";
import {Device} from "../../../shared/models/device.model";
import {plainToClass} from "class-transformer";
import {CommandService} from "../../../core/command.service";
import {Command} from "../../../shared/models/command.model";
import 'rxjs/add/observable/interval';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'dh-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  device: Device;
  networks: Array<Network>;
  deviceTypes: Array<DeviceType>;

  commands: Array<Command>;

  newCommand: Command;
  isSendingRequest = false;
  activeModal: NgbModalRef;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private networkService: NetworkService,
              private deviceTypeService: DeviceTypeService,
              private deviceService: DeviceService,
              private commandService: CommandService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.initData(id);
    });
  }

  async initData(deviceId: string) {
    const devicePlain = await this.deviceService.getDevice(deviceId);
    this.device = plainToClass<Device, Object>(Device, devicePlain);

    this.networks = await this.networkService.getAllNetworks();
    this.deviceTypes = await this.deviceTypeService.getAllDeviceTypes();

    this.commands = await this.commandService.getAllCommands(this.device.id);
    this.pollCommands();
  }

  async pollCommands() {
    const commands = await this.commandService.pollCommands(this.device.id);
    commands.forEach(c => {
      this.commands.unshift(c);
    });
    this.pollCommands();
  }

  async updateDevice() {
    await this.deviceService.updateDevice(this.device);
  }

  async refreshCommand(command: Command) {
    const refreshedCommand = await this.commandService.getCommand(this.device.id, command.id);
    const index = this.commands.indexOf(command);

    if (index > -1) {
      this.commands[index] = refreshedCommand;
    }
  }

  async openNewCommandModal(content) {
    this.newCommand = new Command();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async openNewNotificationModal(content) {
    try {
      const result = await this.modalService.open(content).result;
      console.log(`Closed with: ${result}`);
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async sendNewCommand() {
    this.isSendingRequest = true;
    await this.commandService.insertCommand(this.device.id, this.newCommand);
    this.isSendingRequest = false;
    this.activeModal.close();
  }
}
