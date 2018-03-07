import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Device} from '../../../shared/models/device.model';
import {Network} from '../../../shared/models/network.model';
import {DeviceType} from '../../../shared/models/device-type.model';
import {HelpService} from '../../../core/help.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dh-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() device: Device;
  @Input() networks: Array<Network>;
  @Input() deviceTypes: Array<DeviceType>;

  @ViewChild('networksTypeahead') networksTypeahead: NgbTypeahead;
  networksFocus = new Subject<string>();
  networksClick = new Subject<string>();
  tempNetwork: Network;

  @ViewChild('deviceTypesTypeahead') deviceTypesTypeahead: NgbTypeahead;
  deviceTypesFocus = new Subject<string>();
  deviceTypesClick = new Subject<string>();
  tempDeviceType: DeviceType;

  constructor(public helpService: HelpService) {
  }

  ngOnInit() {
    if (this.device.networkId) {
      this.tempNetwork = this.networks.find(n => n.id === this.device.networkId);
    }

    if (this.device.deviceTypeId) {
      this.tempDeviceType = this.deviceTypes.find(n => n.id === this.device.deviceTypeId);
    }
  }

  formatter = (x: { name: string }) => x.name;

  searchNetwork = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.networksFocus)
      .merge(this.networksClick.filter(() => !this.networksTypeahead.isPopupOpen()))
      .map(term => (term === '' ? this.networks : this.networks.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)))

  selectNetwork() {
    this.device.networkId = this.tempNetwork.id;
  }

  clearSelectedNetwork() {
    this.tempNetwork = null;
    this.device.networkId = null;
  }

  searchDeviceType = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.deviceTypesFocus)
      .merge(this.deviceTypesClick.filter(() => !this.deviceTypesTypeahead.isPopupOpen()))
      .map(term => (term === '' ? this.deviceTypes : this.deviceTypes.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)))

  selectDeviceType() {
    this.device.deviceTypeId = this.tempDeviceType.id;
  }

  clearSelectedDeviceType() {
    this.tempDeviceType = null;
    this.device.deviceTypeId = null;
  }
}
