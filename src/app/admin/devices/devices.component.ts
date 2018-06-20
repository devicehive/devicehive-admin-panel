import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DeviceService } from '../../core/device.service';
import { Device } from '../../shared/models/device.model';
import { NetworkService } from '../../core/network.service';
import { DeviceTypeService } from '../../core/device-type.service';
import { DeviceFilter } from '../../shared/models/filters/device-filter.model';
import { Network } from '../../shared/models/network.model';
import { DeviceType } from '../../shared/models/device-type.model';
import { NotifierService } from 'angular-notifier';
import { UtilService } from '../../core/util.service';
import { HelpService } from '../../core/help.service';

@Component({
  selector: 'dh-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 10;
  itemsCount: number = 100;
  pagesCount: number;

  networks: Array<Network>;
  deviceTypes: Array<DeviceType>;
  devices: Array<Device>;

  filter: DeviceFilter;
  filterIsActive: boolean = false;

  newDevice: Device;
  isSendingRequest = false;
  activeModal: NgbModalRef;

  constructor(public helpService: HelpService,
    private networkService: NetworkService,
    private deviceTypeService: DeviceTypeService,
    private deviceService: DeviceService,
    private modalService: NgbModal,
    private router: Router,
    private notifierService: NotifierService) {

  }

  async ngOnInit(): Promise<void> {

    this.filter = new DeviceFilter();

    this.networks = await this.networkService.getAllNetworks();
    this.deviceTypes = await this.deviceTypeService.getAllDeviceTypes();
    this.devices = await this.deviceService.getSpecificAmountOfDevices(this.itemsPerPage, 0);

    this.itemsCount = await this.deviceService.getDevicesCount();
    this.pagesCount = Math.ceil(this.itemsCount / this.itemsPerPage);
  }

  async loadPage() {
    const take = this.itemsPerPage * this.page > this.itemsCount ? this.itemsCount - this.itemsPerPage * (this.page - 1) : this.itemsPerPage;
    const skip = this.itemsPerPage * (this.page - 1);

    if (this.filterIsActive){
      this.devices = await this.deviceService.getSpecificAmountOfDevices(take, skip, this.filter); 
    } else {
      this.devices = await this.deviceService.getSpecificAmountOfDevices(take, skip); 
    }
  }

  async updatePagination() {
    if (this.filterIsActive){
      this.itemsCount = await this.deviceService.getDevicesCount(this.filter);
    } else {
      this.itemsCount = await this.deviceService.getDevicesCount();
    }

    this.pagesCount = Math.ceil(this.itemsCount / this.itemsPerPage);
    this.loadPage();
  }

  async applyFilter() {
    this.filterIsActive = true;
    this.page = 1;
    this.updatePagination();
  }

  async clearFilter() {
    this.filter.clear();
    if (this.filterIsActive){
      this.filterIsActive = false;
      this.page = 1;
      this.updatePagination();
    }
  }

  findNetworkNameById(id: number): string {
    try {
      return this.networks.find(n => n.id === id).name;
    } catch (error) {
      return '[Error while accessing network]';
    }
  }

  findDeviceTypeNameById(id: number): string {
    try {
      return this.deviceTypes.find(n => n.id === id).name;
    } catch (error) {
      return '[Error while accessing device type]';
    }
  }

  openDeviceDetails(device): void {
    this.router.navigate(['/admin/device', device.id]);
  }

  async openNewDeviceModal(content): Promise<void> {
    this.newDevice = new Device();

    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async createDevice(): Promise<void> {
    const inputError = UtilService.getDeviceInputErrors(this.newDevice);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    this.isSendingRequest = true;

    try {
      this.newDevice.id = this.generateDeviceId();
      await this.deviceService.createDevice(this.newDevice);

      this.newDevice = null;
      this.activeModal.close();
      this.isSendingRequest = false;

      await this.updatePagination();
      this.notifierService.notify('success', 'Device has been added successfully');

    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async deleteDevice(device: Device): Promise<void> {
    if (confirm('Are you sure you want to delete this device?')) {
      try {
        await this.deviceService.deleteDevice(device.id);

        await this.updatePagination();
        this.notifierService.notify('success', 'Device has been deleted successfully');

      } catch (error) {
        this.isSendingRequest = false;
        this.notifierService.notify('error', error.message);
      }
    }
  }

  private generateDeviceId(): string {
    let newId = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 36; i++) {
      newId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return newId;
  }
}
