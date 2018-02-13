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
import {Notification} from "../../../shared/models/notification.model";
import 'rxjs/add/observable/interval';
import {NotificationService} from "../../../core/notification.service";
import {NotifierService} from "angular-notifier";
import {UtilService} from "../../../core/util.service";

@Component({
  selector: 'dh-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit, OnDestroy {

  device: Device;
  networks: Array<Network>;
  deviceTypes: Array<DeviceType>;

  commands: Array<Command>;
  newCommand: Command;

  notifications: Array<Notification>;
  newNotification: Notification;

  isSendingRequest = false;
  activeModal: NgbModalRef;

  private shouldPollCommands = true;
  private shouldPollNotifications = true;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private networkService: NetworkService,
              private deviceTypeService: DeviceTypeService,
              private deviceService: DeviceService,
              private commandService: CommandService,
              private notificationService: NotificationService,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.initData(id);
    });
  }

  ngOnDestroy(): void {
    this.shouldPollCommands = false;
    this.shouldPollNotifications = false;
  }

  async initData(deviceId: string) {
    const devicePlain = await this.deviceService.getDevice(deviceId);
    this.device = Device.fromObject(devicePlain);

    this.networks = await this.networkService.getAllNetworks();
    this.deviceTypes = await this.deviceTypeService.getAllDeviceTypes();

    this.commands = await this.commandService.getAllCommands(this.device.id);
    this.pollCommands();
    this.pollUpdatedCommands();

    this.notifications = await this.notificationService.getAllNotifications(this.device.id);
    this.pollNotifications();
  }

  async updateDevice() {
    const inputError = UtilService.getDeviceInputErrors(this.device);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    try {
      await this.deviceService.updateDevice(this.device);
      this.notifierService.notify('success', 'Device updated');
    } catch (error) {
      this.notifierService.notify('error', error.message);
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
    this.newNotification = new Notification();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async sendNewCommand() {
    this.isSendingRequest = true;
    try {
      await this.commandService.insertCommand(this.device.id, this.newCommand);
      this.isSendingRequest = false;
      this.activeModal.close();
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async pollCommands() {
    const commands = await this.commandService.pollCommands(this.device.id);
    commands.forEach(c => {
      this.commands.unshift(c);
    });
    if (this.shouldPollCommands) this.pollCommands();
  }

  async pollUpdatedCommands() {
    const refreshedCommands = await this.commandService.pollUpdatedCommands(this.device.id);
    for (let i = 0; i < this.commands.length; i++) {
      for (let j = 0; j < refreshedCommands.length; j++) {
        if (refreshedCommands[j].id === this.commands[i].id) {
          this.commands[i] = refreshedCommands[j];
        }
      }
    }

    if (this.shouldPollCommands) this.pollUpdatedCommands();
  }

  async sendNewNotification() {
    this.isSendingRequest = true;

    try {
      await this.notificationService.insertNotification(this.device.id, this.newNotification);
      this.isSendingRequest = false;
      this.activeModal.close();
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async pollNotifications() {
    const notifications = await this.notificationService.pollNotifications(this.device.id);
    notifications.forEach(c => {
      this.notifications.unshift(c);
    });
    if (this.shouldPollNotifications) this.pollNotifications();
  }
}
