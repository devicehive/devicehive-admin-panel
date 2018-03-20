import {Component, OnInit, ViewChild} from '@angular/core';
import {User, UserRole, UserStatus} from '../../../shared/models/user.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../core/user.service';
import {NetworkService} from '../../../core/network.service';
import {Network} from '../../../shared/models/network.model';
import {DeviceType} from '../../../shared/models/device-type.model';
import {DeviceTypeService} from '../../../core/device-type.service';
import {NotifierService} from 'angular-notifier';
import {UtilService} from '../../../core/util.service';
import {NgbModal, NgbModalRef, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

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

  @ViewChild('networksTypeahead') networksTypeahead: NgbTypeahead;
  networksFocus = new Subject<string>();
  networksClick = new Subject<string>();
  selectedNetwork: Network;

  @ViewChild('deviceTypesTypeahead') deviceTypesTypeahead: NgbTypeahead;
  deviceTypesFocus = new Subject<string>();
  deviceTypesClick = new Subject<string>();
  selectedDeviceType: DeviceType;

  userRole = UserRole;
  userStatus = UserStatus;

  isCollapsed = false;

  editUser: User;
  activeModal: NgbModalRef;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private userService: UserService,
              private networkService: NetworkService,
              private deviceTypeService: DeviceTypeService,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.initData(id);
    });
  }

  searchNetwork = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.networksFocus)
      .merge(this.networksClick.filter(() => !this.networksTypeahead.isPopupOpen()))
      .map(term => (term === '' ? this.allNetworks : this.allNetworks.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)))

  searchDeviceType = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.deviceTypesFocus)
      .merge(this.deviceTypesClick.filter(() => !this.deviceTypesTypeahead.isPopupOpen()))
      .map(term => (term === '' ? this.allDeviceTypes : this.allDeviceTypes
        .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)))

  formatter = (x: { name: string }) => x.name;

  async initData(userId: number): Promise<void> {
    try {
      const userPlain = await this.userService.getUser(userId);
      this.user = User.fromObject(userPlain);

      this.allNetworks = await this.networkService.getAllNetworks();
      this.allDeviceTypes = await this.deviceTypeService.getAllDeviceTypes();
      this.userDeviceTypes = await this.userService.getDeviceTypes(this.user.id);
    } catch (error) {
      this.notifierService.notify('error', error.message);
    }
  }

  async openEditUserModal(content): Promise<void> {
    this.editUser = User.fromUser(this.user);

    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra actions
    }
  }

  async updateUser(): Promise<void> {
    const inputError = UtilService.getUserDetailsInputErrors(this.editUser);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    try {
      await this.userService.updateUser(this.editUser);
      this.user = this.editUser;
      this.editUser = null;
      this.activeModal.close();
    } catch (error) {
      this.notifierService.notify('error', error.message);
    }
  }

  async grantAccessToNetwork(): Promise<void> {
    try {
      await this.userService.grantAccessToNetwork(this.user.id, this.selectedNetwork.id);

      const existingNetwork = this.user.networks.find(network => network.id === this.selectedNetwork.id);
      if (!existingNetwork) {
        this.user.networks.push(this.selectedNetwork);
      }
    } catch (error) {
      this.notifierService.notify('error', error.message);
    }
  }

  async revokeAccessToNetwork(network: Network): Promise<void> {
    try {
      await this.userService.revokeAccessToNetwork(this.user.id, network.id);

      const index = this.user.networks.indexOf(network);
      if (index > -1) {
        this.user.networks.splice(index, 1);
      }
    } catch (error) {
      this.notifierService.notify('error', error.message);
    }
  }

  async toggleAllowAllDeviceTypes(): Promise<void> {
    try {
      if (this.user.allDeviceTypesAvailable) {
        await this.userService.allowAllDeviceTypesForUser(this.user.id);
      } else {
        await this.userService.disallowAllDeviceTypesForUser(this.user.id);
        this.userDeviceTypes = await this.userService.getDeviceTypes(this.user.id);
      }
    } catch (error) {
      this.notifierService.notify('error', error.message);
    }
  }

  async grantAccessToDeviceType(): Promise<void> {
    try {
      await this.userService.grantAccessToDeviceType(this.user.id, this.selectedDeviceType.id);

      if (!this.userDeviceTypes) {
        this.userDeviceTypes = new Array<DeviceType>();
      }

      const existingDeviceType = this.userDeviceTypes.find(deviceType => deviceType.id === this.selectedDeviceType.id);
      if (!existingDeviceType) {
        this.userDeviceTypes.push(this.selectedDeviceType);
      }
    } catch (error) {
      this.notifierService.notify('error', error.message);
    }
  }

  async revokeAccessToDeviceType(deviceType: DeviceType): Promise<void> {
    try {
      await this.userService.revokeAccessToDeviceType(this.user.id, deviceType.id);

      const index = this.userDeviceTypes.indexOf(deviceType);
      if (index > -1) {
        this.userDeviceTypes.splice(index, 1);
      }
    } catch (error) {
      this.notifierService.notify('error', error.message);
    }
  }

  clearSelectedNetwork(): void {
    this.selectedNetwork = null;
  }

  clearSelectedDeviceType(): void {
    this.selectedDeviceType = null;
  }
}
