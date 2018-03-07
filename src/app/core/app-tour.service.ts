import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class AppTourService {

  isTourActive = false;

  private adminSteps = [
    {
      target: 'tour.start',
      content: 'Welcome to the DeviceHive admin console!',
      placement: 'bottom',
      title: 'Welcome'
    },
    {
      target: 'menu.devices',
      content: 'This is the list of devices that you can access. A device is any IoT unit that communicates with the DeviceHive API.',
      placement: 'bottom',
      title: 'Devices'
    },
    {
      target: 'menu.networks',
      content: 'This is the list of available networks. A network is an isolated area where devices reside.',
      placement: 'bottom',
      title: 'Networks'
    },
    {
      target: 'menu.device-types',
      content: 'This is the list of existing types of devices.',
      placement: 'bottom',
      title: 'Device Types'
    },
    {
      target: 'menu.users',
      content: 'This is a list of users that exist on the DeviceHive server.',
      placement: 'bottom',
      title: 'Users'
    },
    {
      target: 'menu.jwt',
      content: 'This section allows you to generate JWT security tokens. Devices need a JWT token to access DeviceHive.',
      placement: 'bottom',
      title: 'JWT Tokens'
    },
    {
      target: 'menu.plugins',
      content: 'This section allows you to manage plugins. Plugins allow you to extend the functionality of DeviceHive.',
      placement: 'bottom',
      title: 'Plugins'
    },
    {
      target: 'tour.start',
      content: 'For more information, feel free to take a look at our documentation or the contextual help within this console.',
      placement: 'bottom',
      title: 'Enjoy'
    }
  ];

  private clientSteps = [
    {
      target: 'tour.start',
      content: 'Welcome to the DeviceHive admin console!',
      placement: 'bottom',
      title: 'Welcome'
    },
    {
      target: 'menu.devices',
      content: 'This is the list of devices that you can access. A device is any IoT unit that communicates with the DeviceHive API.',
      placement: 'bottom',
      title: 'Devices'
    },
    {
      target: 'menu.networks',
      content: 'This is the list of available networks. A network is an isolated area where devices reside.',
      placement: 'bottom',
      title: 'Networks'
    },
    {
      target: 'menu.device-types',
      content: 'This is the list of existing types of devices.',
      placement: 'bottom',
      title: 'Device Types'
    },
    {
      target: 'menu.jwt',
      content: 'This section allows you to generate JWT security tokens. Devices need a JWT token to access DeviceHive.',
      placement: 'bottom',
      title: 'JWT Tokens'
    },
    {
      target: 'menu.plugins',
      content: 'This section allows you to manage plugins. Plugins allow you to extend the functionality of DeviceHive.',
      placement: 'bottom',
      title: 'Plugins'
    },
    {
      target: 'tour.start',
      content: 'For more information, feel free to take a look at our documentation or the contextual help within this console.',
      placement: 'bottom',
      title: 'Enjoy'
    }
  ];

  constructor(private userService: UserService) {

  }

  startTour(isAdmin: boolean) {
    const that = this;
    const tour = {
      id: 'devicehive-tour',
      onClose: function () {
        that.setTourFinished();
      },
      onEnd: function () {
        that.setTourFinished();
      },
      steps: []
    };

    if (isAdmin) {
      tour.steps = this.adminSteps;
    } else {
      tour.steps = this.clientSteps;
    }

    hopscotch.startTour(tour);
  }

  async setTourFinished() {
    await this.userService.finishTourForCurrentUser();
  }
}

