import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Network} from "../../shared/models/network.model";
import {NetworkService} from "../../core/network.service";

@Component({
  selector: 'dh-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {

  networks: Array<Network>;

  constructor(private networkService: NetworkService,
              private modalService: NgbModal) {
  }

  async ngOnInit() {
    this.networks = await this.networkService.getAllNetworks();
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
