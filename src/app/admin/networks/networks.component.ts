import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'dh-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  async openNewNetworkModal(content) {
    try {
      const result = await this.modalService.open(content).result;
      console.log(`Closed with: ${result}`);
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async openEditNetworkModal(content) {
    try {
      const result = await this.modalService.open(content).result;
      console.log(`Closed with: ${result}`);
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }
}
