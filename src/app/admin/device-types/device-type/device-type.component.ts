import {Component, Input, OnInit} from '@angular/core';
import {DeviceType} from "../../../shared/models/device-type.model";
import {HelpService} from "../../../core/help.service";

@Component({
  selector: 'dh-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent implements OnInit {

  @Input() deviceType: DeviceType;

  constructor(public helpService: HelpService) {
  }

  ngOnInit() {
  }

}
