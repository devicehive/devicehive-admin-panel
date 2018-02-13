import {Component, Input, OnInit} from '@angular/core';
import {Device} from "../../../shared/models/device.model";
import {Network} from "../../../shared/models/network.model";
import {DeviceType} from "../../../shared/models/device-type.model";

@Component({
  selector: 'dh-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() device: Device;
  @Input() networks: Array<Network>;
  @Input() deviceTypes: Array<DeviceType>;

  constructor() {
  }

  ngOnInit() {
  }
}
