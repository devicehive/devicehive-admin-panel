import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Network } from '../../shared/models/network.model';
import { NetworkService } from '../../core/network.service';
import { plainToClass } from 'class-transformer';
import { NotifierService } from 'angular-notifier';
import { UtilService } from '../../core/util.service';
import { UserService } from '../../core/user.service';
import { UserRole } from '../../shared/models/user.model';
import { HelpService } from '../../core/help.service';

@Component({
  selector: 'dh-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {

  isAdmin = false;
  networks: Array<Network>;
  searchName = '';

  newNetwork: Network;
  selectedNetwork: Network;
  isSendingRequest = false;
  activeModal: NgbModalRef;
  @ViewChild('deleteNetworkModal') deleteNetworkModal: ElementRef;

  constructor(public helpService: HelpService,
    private networkService: NetworkService,
    private userService: UserService,
    private modalService: NgbModal,
    private notifierService: NotifierService) {
  }

  async ngOnInit(): Promise<void> {
    const currentUser = await this.userService.getCurrentUser();
    this.isAdmin = currentUser.role === UserRole.ADMIN;

    const networksPlain = await this.networkService.getAllNetworks();
    this.networks = plainToClass(Network, networksPlain);
  }

  async openNetworkModal(content, selectedNetwork?: Network): Promise<void> {
    if (selectedNetwork) {
      this.selectedNetwork = new Network(selectedNetwork.id, selectedNetwork.name, selectedNetwork.description);
    }

    this.newNetwork = new Network();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      console.log(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async createNetwork(): Promise<void> {
    const inputError = UtilService.getNetworkInputErrors(this.newNetwork);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    this.isSendingRequest = true;
    try {
      const createdNetwork = await this.networkService.createNetwork(this.newNetwork);

      this.newNetwork.id = createdNetwork.id;
      this.networks.push(this.newNetwork);

      this.newNetwork = null;
      this.activeModal.close();
      this.isSendingRequest = false;
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async deleteNetwork(network: Network): Promise<void> {
    try {
      await this.networkService.deleteNetwork(network.id);

      const index = this.networks.indexOf(network);
      if (index > -1) {
        this.networks.splice(index, 1);
      }
    } catch (error) {
      this.isSendingRequest = false;
      this.openNetworkModal(this.deleteNetworkModal, network);
    }
  }

  async deleteNetworkForce(): Promise<void> {
    try {
      const networkId = this.selectedNetwork.id;
      await this.networkService.deleteNetwork(networkId, true);

      const index = this.networks.findIndex(network => network.id === networkId);
      if (index > -1) {
        this.networks.splice(index, 1);
      }
      this.activeModal.close();
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async updateSelectedNetwork(): Promise<void> {
    const inputError = UtilService.getNetworkInputErrors(this.selectedNetwork);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    try {
      await this.networkService.updateNetwork(this.selectedNetwork);

      const oldNetwork = this.networks.find(i => i.id === this.selectedNetwork.id);
      const index = this.networks.indexOf(oldNetwork);
      if (index > -1) {
        this.networks[index] = this.selectedNetwork;
      }

      this.activeModal.close();
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }
}
