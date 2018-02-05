import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Network} from "../../shared/models/network.model";
import {NetworkService} from "../../core/network.service";
import {plainToClass} from "class-transformer";

@Component({
  selector: 'dh-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {

  networks: Array<Network>;

  newNetwork: Network;
  selectedNetwork: Network;
  isSendingRequest = false;
  activeModal: NgbModalRef;

  constructor(private networkService: NetworkService,
              private modalService: NgbModal) {
  }

  async ngOnInit() {
    const networksPlain = await this.networkService.getAllNetworks();
    this.networks = plainToClass(Network, networksPlain);
  }

  async openNetworkModal(content, selectedNetwork?: Network) {
    if (selectedNetwork) {
      this.selectedNetwork = selectedNetwork;
    }

    this.newNetwork = new Network();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async createNetwork() {
    this.isSendingRequest = true;
    const createdNetwork = await this.networkService.createNetwork(this.newNetwork);

    this.newNetwork.id = createdNetwork.id;
    this.networks.push(this.newNetwork);

    this.newNetwork = null;
    this.activeModal.close();
    this.isSendingRequest = false;
  }

  async deleteNetwork(network: Network) {
    await this.networkService.deleteNetwork(network.id);

    let index = this.networks.indexOf(network);
    if (index > -1) {
      this.networks.splice(index, 1);
    }
  }

  async updateSelectedNetwork() {
    await this.networkService.updateNetwork(this.selectedNetwork);
    this.activeModal.close();
  }
}
