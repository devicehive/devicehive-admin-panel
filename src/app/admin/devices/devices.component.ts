import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
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

  newDevice: Device;
  isSendingRequest = false;
  activeModal: NgbModalRef;

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
    this.router.navigate(['/admin/device', device.id]);
  }

  async openNewDeviceModal(content) {
    this.newDevice = new Device();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async createDevice() {
    this.isSendingRequest = true;
    this.newDevice.id = this.generateDeviceId();
    await this.deviceService.createDevice(this.newDevice);

    this.devices.push(this.newDevice);

    this.newDevice = null;
    this.activeModal.close();
    this.isSendingRequest = false;
  }

  async deleteDevice(device: Device) {
    await this.deviceService.deleteDevice(device.id);

    let index = this.devices.indexOf(device);
    if (index > -1) {
      this.devices.splice(index, 1);
    }
  }

  private generateDeviceId(): string {
    let newId = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 36; i++) {
      newId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return newId;
  }
}
