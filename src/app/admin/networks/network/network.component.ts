import {Component, Input, OnInit} from '@angular/core';
import {Network} from "../../../shared/models/network.model";

@Component({
  selector: 'dh-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  @Input() network: Network;

  constructor() {
  }

  ngOnInit() {
  }

}
