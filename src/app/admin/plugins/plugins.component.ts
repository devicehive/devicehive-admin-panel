import {Component, OnInit} from '@angular/core';
import {HelpService} from "../../core/help.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NotifierService} from "angular-notifier";
import {Plugin} from "../../shared/models/plugin.model";
import {UserService} from "../../core/user.service";
import {PluginService} from "../../core/plugin.service";
import {User, UserRole} from "../../shared/models/user.model";
import {plainToClass} from "class-transformer";
import {DeviceTypeService} from "../../core/device-type.service";
import {DeviceService} from "../../core/device.service";
import {NetworkService} from "../../core/network.service";
import {DeviceType} from "../../shared/models/device-type.model";
import {Network} from "../../shared/models/network.model";
import {Device} from "../../shared/models/device.model";
import {PluginCredentials} from "../../shared/models/plugin-credentials.model";

@Component({
  selector: 'dh-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  isAdmin = true;
  plugins: Array<Plugin>;

  networks: Array<Network>;
  deviceTypes: Array<DeviceType>;
  devices: Array<Device>;

  newPlugin: Plugin;
  newPluginCredentials: PluginCredentials;

  selectedPlugin: Plugin;
  selectedPluginOriginal: Plugin;
  selectedPluginCredentials: PluginCredentials;

  isSendingRequest = false;
  activeModal: NgbModalRef;

  constructor(public helpService: HelpService,
              private userService: UserService,
              private pluginService: PluginService,
              private networkService: NetworkService,
              private deviceTypeService: DeviceTypeService,
              private deviceService: DeviceService,
              private modalService: NgbModal,
              private notifierService: NotifierService) {
  }

  async ngOnInit() {
    const currentUser = await this.userService.getCurrentUser();
    this.isAdmin = currentUser.role === UserRole.ADMIN;

    const pluginsPlain = await this.pluginService.getAllPlugins();
    this.plugins = plainToClass(Plugin, pluginsPlain);

    this.networks = await this.networkService.getAllNetworks();
    this.deviceTypes = await this.deviceTypeService.getAllDeviceTypes();
    this.devices = await this.deviceService.getAllDevices();
  }

  async openPluginModal(content, selectedPlugin: Plugin) {
    if (selectedPlugin) {
      this.selectedPluginOriginal = Plugin.fromObject(Plugin.fromPluginApiResponse(selectedPlugin));
      this.selectedPlugin = Plugin.fromObject(Plugin.fromPluginApiResponse(selectedPlugin));
    }

    this.newPlugin = new Plugin();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content, {size: 'lg'});
      await this.activeModal.result;
    } catch (dismissReason) {
      this.newPlugin = null;
      this.newPluginCredentials = null;
    }
  }

  async createPlugin() {
    this.isSendingRequest = true;

    try {
      this.newPluginCredentials = await this.pluginService.registerPlugin(this.newPlugin);
      const pluginsPlain = await this.pluginService.getAllPlugins();
      this.plugins = plainToClass(Plugin, pluginsPlain);

      this.newPlugin = null;
      this.isSendingRequest = false;

    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async updateSelectedPlugin() {
    try {
      await this.pluginService.updatePlugin(this.selectedPlugin, this.selectedPluginOriginal);
      const pluginsPlain = await this.pluginService.getAllPlugins();
      this.plugins = plainToClass(Plugin, pluginsPlain);

      this.notifierService.notify('success', 'Plugin updated');
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async generateNewTokens() {
    try {
      let result = await this.pluginService.generateNewTokens(this.selectedPlugin.topicName);
      this.selectedPluginCredentials = new PluginCredentials(result.accessToken, result.refreshToken, this.selectedPlugin.topicName);

    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async deletePlugin(plugin: Plugin) {
    if (confirm("Are you sure you want to delete this plugin?")) {
      try {
        await this.pluginService.deletePlugin(plugin.topicName);

        let index = this.plugins.indexOf(plugin);
        if (index > -1) {
          this.plugins.splice(index, 1);
        }
      } catch (error) {
        this.notifierService.notify('error', error.message);
      }
    }
  }
}
