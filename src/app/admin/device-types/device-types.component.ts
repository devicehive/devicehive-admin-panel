import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeviceTypeService} from "../../core/device-type.service";
import {DeviceType} from "../../shared/models/device-type.model";

@Component({
  selector: 'dh-device-types',
  templateUrl: './device-types.component.html',
  styleUrls: ['./device-types.component.scss']
})
export class DeviceTypesComponent implements OnInit {

  deviceTypes: Array<DeviceType>;

  constructor(private deviceTypeService: DeviceTypeService,
              private modalService: NgbModal) { }

  async ngOnInit() {
    this.deviceTypes = await this.deviceTypeService.getAllDeviceTypes();
  }

  async openNewDeviceTypeModal(content) {
    try {
      const result = await this.modalService.open(content).result;
      console.log(`Closed with: ${result}`);
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async openEditDeviceTypeModal(content) {
    try {
      const result = await this.modalService.open(content).result;
      console.log(`Closed with: ${result}`);
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

}
