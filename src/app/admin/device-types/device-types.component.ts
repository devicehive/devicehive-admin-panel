import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {DeviceTypeService} from "../../core/device-type.service";
import {DeviceType} from "../../shared/models/device-type.model";
import {plainToClass} from "class-transformer";

@Component({
  selector: 'dh-device-types',
  templateUrl: './device-types.component.html',
  styleUrls: ['./device-types.component.scss']
})
export class DeviceTypesComponent implements OnInit {

  deviceTypes: Array<DeviceType>;

  newDeviceType: DeviceType;
  selectedDeviceType: DeviceType;
  isSendingRequest = false;
  activeModal: NgbModalRef;

  constructor(private deviceTypeService: DeviceTypeService,
              private modalService: NgbModal) {
  }

  async ngOnInit() {
    const deviceTypesPlain = await this.deviceTypeService.getAllDeviceTypes();
    this.deviceTypes = plainToClass(DeviceType, deviceTypesPlain);
  }

  async openDeviceTypeModal(content, selectedDeviceType?: DeviceType) {
    if (selectedDeviceType) {
      this.selectedDeviceType = selectedDeviceType;
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
    this.isSendingRequest = true;
    const createdDeviceType = await this.deviceTypeService.createDeviceType(this.newDeviceType);

    this.newDeviceType.id = createdDeviceType.id;
    this.deviceTypes.push(this.newDeviceType);

    this.newDeviceType = null;
    this.activeModal.close();
    this.isSendingRequest = false;
  }

  async deleteDeviceType(deviceType: DeviceType) {
    await this.deviceTypeService.deleteDeviceType(deviceType.id);

    let index = this.deviceTypes.indexOf(deviceType);
    if (index > -1) {
      this.deviceTypes.splice(index, 1);
    }
  }

  async updateSelectedDeviceType() {
    await this.deviceTypeService.updateDeviceType(this.selectedDeviceType);
    this.activeModal.close();
  }
}
