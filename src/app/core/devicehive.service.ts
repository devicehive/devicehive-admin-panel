import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {error} from "util";

@Injectable()
export class DevicehiveService {

  private httpDeviceHive = null;

  private mainServiceURL: string;
  private authServiceURL: string;
  private pluginServiceURL: string;
  private autoUpdateSession: boolean;
  private loggedIn = false;

  private refreshToken: string;

  constructor() {
    const root = document.location.origin;
    if (environment.mainServiceURL.startsWith('http')) {
      this.mainServiceURL = environment.mainServiceURL;
    } else {
      this.mainServiceURL = root + environment.mainServiceURL;
    }

    if (environment.authServiceURL.startsWith('http')) {
      this.authServiceURL = environment.authServiceURL
    } else {
      this.authServiceURL = root + environment.authServiceURL;
    }

    if (environment.pluginServiceURL.startsWith('http')) {
      this.pluginServiceURL = environment.pluginServiceURL;
    } else {
      this.pluginServiceURL = environment.pluginServiceURL;
    }

    this.autoUpdateSession = environment.autoUpdateSession;
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
          pluginServiceURL: this.pluginServiceURL,
          autoUpdateSession: this.autoUpdateSession
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
      pluginServiceURL: this.pluginServiceURL,
      autoUpdateSession: this.autoUpdateSession
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

  async logInWithToken(token: string) {
    this.httpDeviceHive = new DeviceHive({
      accessToken: token,
      mainServiceURL: this.mainServiceURL,
      authServiceURL: this.authServiceURL,
      pluginServiceURL: this.pluginServiceURL,
      autoUpdateSession: this.autoUpdateSession
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

  async getToken() {
    if (this.refreshToken) {
      return this.refreshToken;
    } else if (this.httpDeviceHive.refreshToken) {
      return this.httpDeviceHive.refreshToken;
    } else if (this.httpDeviceHive.accessToken) {
      return this.httpDeviceHive.accessToken;
    } else {
      const tokens = await this.httpDeviceHive.token.login(this.httpDeviceHive.login, this.httpDeviceHive.password);
      this.refreshToken = tokens.refreshToken;
      return this.refreshToken;
    }
  }
}
