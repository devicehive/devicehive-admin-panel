import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {error} from "util";

@Injectable()
export class DevicehiveService {

  private httpDeviceHive = null;

  private mainServiceURL: string = environment.mainServiceURL;
  private authServiceURL: string = environment.authServiceURL;
  private pluginServiceURL: string = environment.pluginServiceURL;
  private loggedIn = false;

  constructor() {
  }

  async getHttpDeviceHive() {
    if (!this.httpDeviceHive) {
      const dh = JSON.parse(sessionStorage.getItem('dh'));
      if (dh == null) {
        throw error()
      } else {
        this.httpDeviceHive = new DeviceHive({
          login: dh.login,
          password: dh.password,
          accessToken: dh.accessToken,
          refreshToken: dh.refreshToken,
          mainServiceURL: this.mainServiceURL,
          authServiceURL: this.authServiceURL,
          pluginServiceURL: this.pluginServiceURL
        });
        await this.httpDeviceHive.connect();
      }
    }

    return this.httpDeviceHive;
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
      sessionStorage.setItem('dh', JSON.stringify(this.httpDeviceHive));
      this.loggedIn = true;
    } catch (error) {
      this.loggedIn = false;
      throw error;
    }
  }

  logOut() {
    sessionStorage.removeItem('dh')
  }

  isLoggedIn() {
    if (this.httpDeviceHive && this.loggedIn) {
      return true;
    }

    const dh = JSON.parse(sessionStorage.getItem('dh'));
    return dh != null;
  }
}
