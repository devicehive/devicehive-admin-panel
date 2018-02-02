import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {DeviceService} from "../../core/device.service";
import {Device} from "../../shared/models/device.model";
import {NetworkService} from "../../core/network.service";
import {DeviceTypeService} from "../../core/device-type.service";
import {Network} from "../../shared/models/network.model";
import {DeviceType} from "../../shared/models/device-type.model";

@Component({
  selector: 'dh-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  networks: Array<Network>;
  deviceTypes: Array<DeviceType>;
  devices: Array<Device>;

  constructor(private networkService: NetworkService,
              private deviceTypeService: DeviceTypeService,
              private deviceService: DeviceService,
              private modalService: NgbModal,
              private router: Router) {

  }

  async ngOnInit() {
    this.networks = await this.networkService.getAllNetworks();
    this.deviceTypes = await this.deviceTypeService.getAllDeviceTypes();

    this.devices = await this.deviceService.getAllDevices();
  }

  findNetworkNameById(id: number) {
    return this.networks.find(n => n.id === id).name;
  }

  findDeviceTypeNameById(id: number) {
    return this.deviceTypes.find(n => n.id === id).name;
  }

  openDeviceDetails(device) {
    this.router.navigate(['/admin/device', 1]);
  }

  async openNewDeviceModal(content) {
    try {
      const result = await this.modalService.open(content).result;
      console.log(`Closed with: ${result}`);
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

}
