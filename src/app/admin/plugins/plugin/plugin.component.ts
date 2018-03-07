import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Plugin} from '../../../shared/models/plugin.model';
import {DeviceType} from '../../../shared/models/device-type.model';
import {Network} from '../../../shared/models/network.model';
import {Device} from '../../../shared/models/device.model';
import {HelpService} from '../../../core/help.service';
import {Subject} from 'rxjs/Subject';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'dh-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.scss']
})
export class PluginComponent implements OnInit {

  @Input() plugin: Plugin;
  @Input() devices: Array<Device>;
  @Input() networks: Array<Network>;
  @Input() deviceTypes: Array<DeviceType>;

  @ViewChild('deviceTypeahead') deviceTypeahead: NgbTypeahead;
  deviceFocus = new Subject<string>();
  deviceClick = new Subject<string>();

  @ViewChild('networksTypeahead') networksTypeahead: NgbTypeahead;
  networksFocus = new Subject<string>();
  networksClick = new Subject<string>();

  tempNetwork: Network;
  selectedNetworks: Array<Network> = [];

  @ViewChild('deviceTypesTypeahead') deviceTypesTypeahead: NgbTypeahead;
  deviceTypesFocus = new Subject<string>();
  deviceTypesClick = new Subject<string>();

  tempDeviceType: DeviceType;
  selectedDeviceTypes: Array<DeviceType> = [];

  constructor(public helpService: HelpService) {

  }

  ngOnInit() {
    if (this.plugin.networkIds.length > 0) {
      this.plugin.networkIds.map(id => {
        try {
          const network = this.networks.find(n => n.id === id);
          this.selectedNetworks.push(network);
        } catch (error) {
          console.log(error);
        }
      });
    }

    if (this.plugin.deviceTypeIds.length > 0) {
      this.plugin.deviceTypeIds.map(id => {
        try {
          const deviceType = this.deviceTypes.find(n => n.id === id);
          this.selectedDeviceTypes.push(deviceType);
        } catch (error) {
          console.log(error);
        }
      });
    }

    if (this.plugin.deviceId) {
      try {
        this.plugin.device = this.devices.find(n => n.id === this.plugin.deviceId);
      } catch (error) {
        console.log(error);
      }
    }
  }

  formatter = (x: { name: string }) => x.name;

  searchDevice = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.deviceFocus)
      .merge(this.deviceClick.filter(() => !this.deviceTypeahead.isPopupOpen()))
      .map(term => (term === '' ? this.devices : this.devices.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)))

  searchNetwork = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.networksFocus)
      .merge(this.networksClick.filter(() => !this.networksTypeahead.isPopupOpen()))
      .map(term => (term === '' ? this.networks : this.networks.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)))

  addNetwork() {
    if (this.tempNetwork.id) {
      this.selectedNetworks.push(this.tempNetwork);
      this.plugin.networkIds.push(this.tempNetwork.id);
      this.tempNetwork = null;
    }
  }

  removeNetwork(network: Network) {
    const index = this.selectedNetworks.indexOf(network);
    if (index > -1) {
      this.selectedNetworks.splice(index, 1);
    }

    const idIndex = this.plugin.networkIds.indexOf(network.id);
    if (idIndex > -1) {
      this.plugin.networkIds.splice(idIndex, 1);
    }
  }

  searchDeviceType = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.deviceTypesFocus)
      .merge(this.deviceTypesClick.filter(() => !this.deviceTypesTypeahead.isPopupOpen()))
      .map(term => (term === '' ? this.deviceTypes : this.deviceTypes.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)))

  addDeviceType() {
    if (this.tempDeviceType.id) {
      this.selectedDeviceTypes.push(this.tempDeviceType);
      this.plugin.deviceTypeIds.push(this.tempDeviceType.id);
      this.tempDeviceType = null;
    }
  }

  removeDeviceType(deviceType: DeviceType) {
    const index = this.selectedDeviceTypes.indexOf(deviceType);
    if (index > -1) {
      this.selectedDeviceTypes.splice(index, 1);
    }

    const idIndex = this.plugin.deviceTypeIds.indexOf(deviceType.id);
    if (idIndex > -1) {
      this.plugin.deviceTypeIds.splice(idIndex, 1);
    }
  }
}
