import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {error} from 'util';

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
      this.authServiceURL = environment.authServiceURL;
    } else {
      this.authServiceURL = root + environment.authServiceURL;
    }

    if (environment.pluginServiceURL.startsWith('http')) {
      this.pluginServiceURL = environment.pluginServiceURL;
    } else {
      this.pluginServiceURL = root + environment.pluginServiceURL;
    }

    this.autoUpdateSession = environment.autoUpdateSession;
  }

  async getHttpDeviceHive(): Promise<any> {
    if (!this.httpDeviceHive) {
      const token = sessionStorage.getItem('refresh_token');
      if (token == null) {
        throw error();
      } else {
        this.httpDeviceHive = new DeviceHive({
          refreshToken: token,
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

  async logIn(login: string, password: string): Promise<void> {
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
      sessionStorage.setItem('refresh_token', this.httpDeviceHive.refreshToken);

      this.loggedIn = true;
    } catch (error) {
      this.loggedIn = false;
      throw error;
    }
  }

  async logInWithToken(token: string): Promise<void> {
    this.httpDeviceHive = new DeviceHive({
      accessToken: token,
      mainServiceURL: this.mainServiceURL,
      authServiceURL: this.authServiceURL,
      pluginServiceURL: this.pluginServiceURL,
      autoUpdateSession: this.autoUpdateSession
    });

    try {
      await this.httpDeviceHive.connect();
      sessionStorage.setItem('refresh_token', this.httpDeviceHive.refreshToken);

      this.loggedIn = true;
    } catch (error) {
      this.loggedIn = false;
      throw error;
    }
  }

  logOut(): void {
    sessionStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    if (this.httpDeviceHive && this.loggedIn) {
      return true;
    }

    const token = sessionStorage.getItem('refresh_token');
    return token != null;
  }

  async getToken(): Promise<string | string> {
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
