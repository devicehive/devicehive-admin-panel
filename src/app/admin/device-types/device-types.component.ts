import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {DeviceTypeService} from "../../core/device-type.service";
import {DeviceType} from "../../shared/models/device-type.model";
import {plainToClass} from "class-transformer";
import {NotifierService} from "angular-notifier";
import {UtilService} from "../../core/util.service";
import {UserService} from "../../core/user.service";
import {UserRole} from "../../shared/models/user.model";
import {HelpService} from "../../core/help.service";

@Component({
  selector: 'dh-device-types',
  templateUrl: './device-types.component.html',
  styleUrls: ['./device-types.component.scss']
})
export class DeviceTypesComponent implements OnInit {

  isAdmin = false;
  deviceTypes: Array<DeviceType>;

  newDeviceType: DeviceType;
  selectedDeviceType: DeviceType;
  isSendingRequest = false;
  activeModal: NgbModalRef;

  constructor(public helpService: HelpService,
              private deviceTypeService: DeviceTypeService,
              private userService: UserService,
              private modalService: NgbModal,
              private notifierService: NotifierService) {
  }

  async ngOnInit() {
    const currentUser = await this.userService.getCurrentUser();
    this.isAdmin = currentUser.role === UserRole.ADMIN;

    const deviceTypesPlain = await this.deviceTypeService.getAllDeviceTypes();
    this.deviceTypes = plainToClass(DeviceType, deviceTypesPlain);
  }

  async openDeviceTypeModal(content, selectedDeviceType?: DeviceType) {
    if (selectedDeviceType) {
      this.selectedDeviceType = new DeviceType(selectedDeviceType.id, selectedDeviceType.name, selectedDeviceType.description);
    }

    this.newDeviceType = new DeviceType();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async createDeviceType() {
    const inputError = UtilService.getDeviceTypeInputErrors(this.newDeviceType);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    this.isSendingRequest = true;
    try {
      const createdDeviceType = await this.deviceTypeService.createDeviceType(this.newDeviceType);

      this.newDeviceType.id = createdDeviceType.id;
      this.deviceTypes.push(this.newDeviceType);

      this.newDeviceType = null;
      this.activeModal.close();
      this.isSendingRequest = false;
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async deleteDeviceType(deviceType: DeviceType) {
    if (confirm("Are you sure you want to delete this device type?")) {
      try {
        await this.deviceTypeService.deleteDeviceType(deviceType.id);

        let index = this.deviceTypes.indexOf(deviceType);
        if (index > -1) {
          this.deviceTypes.splice(index, 1);
        }
      } catch (error) {
        this.isSendingRequest = false;
        this.notifierService.notify('error', error.message);
      }
    }
  }

  async updateSelectedDeviceType() {
    const inputError = UtilService.getDeviceTypeInputErrors(this.selectedDeviceType);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    try {
      await this.deviceTypeService.updateDeviceType(this.selectedDeviceType);

      let oldDeviceType = this.deviceTypes.find(i => i.id === this.selectedDeviceType.id);
      let index = this.deviceTypes.indexOf(oldDeviceType);
      if (index > -1) {
        this.deviceTypes[index] = this.selectedDeviceType;
      }

      this.activeModal.close();
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }
}
