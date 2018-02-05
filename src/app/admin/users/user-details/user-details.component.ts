import {Component, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../core/user.service";
import {NetworkService} from "../../../core/network.service";
import {Network} from "../../../shared/models/network.model";
import {plainToClass} from "class-transformer";
import {DeviceType} from "../../../shared/models/device-type.model";
import {DeviceTypeService} from "../../../core/device-type.service";

@Component({
  selector: 'dh-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  allNetworks: Array<Network>;
  allDeviceTypes: Array<DeviceType>;
  userDeviceTypes: Array<DeviceType>;

  selectedNetwork: Network;
  selectedDeviceType: DeviceType;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private networkService: NetworkService,
              private deviceTypeService: DeviceTypeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.initData(id);
    });
  }

  async initData(userId: number) {
    const userPlain = await this.userService.getUser(userId);
    this.user = plainToClass<User, Object>(User, userPlain);

    this.allNetworks = await this.networkService.getAllNetworks();
    this.allDeviceTypes = await this.deviceTypeService.getAllDeviceTypes();
    this.userDeviceTypes = await this.userService.getDeviceTypes(this.user.id);
  }

  async updateUser() {
    await this.userService.updateUser(this.user);
  }

  async grantAccessToNetwork() {
    await this.userService.grantAccessToNetwork(this.user.id, this.selectedNetwork.id);

    const existingNetwork = this.user.networks.find(network => network.id === this.selectedNetwork.id);
    if (!existingNetwork) {
      this.user.networks.push(this.selectedNetwork);
    }
  }

  async revokeAccessToNetwork(network: Network) {
    await this.userService.revokeAccessToNetwork(this.user.id, network.id);

    let index = this.user.networks.indexOf(network);
    if (index > -1) {
      this.user.networks.splice(index, 1);
    }
  }

  async toggleAllowAllDeviceTypes() {
    if (this.user.allDeviceTypesAvailable) {
      await this.userService.allowAllDeviceTypesForUser(this.user.id);
    } else {
      await this.userService.disallowAllDeviceTypesForUser(this.user.id);
      this.userDeviceTypes = await this.userService.getDeviceTypes(this.user.id);
    }
  }

  async grantAccessToDeviceType() {
    await this.userService.grantAccessToDeviceType(this.user.id, this.selectedDeviceType.id);

    if (!this.userDeviceTypes) {
      this.userDeviceTypes = new Array<DeviceType>();
    }

    const existingDeviceType = this.userDeviceTypes.find(deviceType => deviceType.id === this.selectedDeviceType.id);
    if (!existingDeviceType) {
      this.userDeviceTypes.push(this.selectedDeviceType);
    }
  }

  async revokeAccessToDeviceType(deviceType: DeviceType) {
    await this.userService.revokeAccessToDeviceType(this.user.id, deviceType.id);

    let index = this.userDeviceTypes.indexOf(deviceType);
    if (index > -1) {
      this.userDeviceTypes.splice(index, 1);
    }
  }
}
