import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {NetworkService} from "../../../core/network.service";
import {DeviceTypeService} from "../../../core/device-type.service";
import {DeviceService} from "../../../core/device.service";
import {DeviceType} from "../../../shared/models/device-type.model";
import {Network} from "../../../shared/models/network.model";
import {Device} from "../../../shared/models/device.model";
import {plainToClass} from "class-transformer";

@Component({
  selector: 'dh-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  device: Device;
  allNetworks: Array<Network>;
  allDeviceTypes: Array<DeviceType>;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private networkService: NetworkService,
              private deviceTypeService: DeviceTypeService,
              private deviceService: DeviceService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.initData(id);
    });
  }

  async initData(deviceId: string) {
    const devicePlain = await this.deviceService.getDevice(deviceId);
    this.device = plainToClass<Device, Object>(Device, devicePlain);

    this.allNetworks = await this.networkService.getAllNetworks();
    this.allDeviceTypes = await this.deviceTypeService.getAllDeviceTypes();
  }

  async updateDevice() {
    await this.deviceService.updateDevice(this.device);
  }

  async openNewCommandModal(content) {
    try {
      const result = await this.modalService.open(content).result;
      console.log(`Closed with: ${result}`);
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

}
