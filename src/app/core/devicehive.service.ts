import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
declare var DeviceHive;

@Injectable()
export class DevicehiveService {

  public httpDeviceHive = null;

  private mainServiceURL: string = environment.mainServiceURL;
  private authServiceURL: string = environment.authServiceURL;
  private pluginServiceURL: string = environment.pluginServiceURL;
  private loggedIn = false;

  constructor() {
  }

  async logIn(login: string, password: string) {
    this.httpDeviceHive = new DeviceHive({
      login: login,
      password: password,
      mainServiceURL: this.mainServiceURL,
      authServiceURL: this.authServiceURL,
      pluginServiceURL: this.pluginServiceURL
    });


    try {
      await this.httpDeviceHive.connect();
      this.loggedIn = true;
    } catch (error) {
      this.loggedIn = false;
      throw error;
    }
  }

  isLoggedIn() {
    return this.httpDeviceHive && this.loggedIn;
  }
}
