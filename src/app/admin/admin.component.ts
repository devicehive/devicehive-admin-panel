import {Component, OnInit} from '@angular/core';
import {DevicehiveService} from '../core/devicehive.service';
import {UserService} from '../core/user.service';
import {User, UserRole} from '../shared/models/user.model';
import {AppTourService} from '../core/app-tour.service';

@Component({
  selector: 'dh-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentUser: User;
  userRole = UserRole;

  constructor(private dh: DevicehiveService,
              private userService: UserService,
              public appTourService: AppTourService) {
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.userService.forceGetCurrentUser();
    if (!this.currentUser.introReviewed) {
      this.appTourService.startTour(this.currentUser.role === UserRole.ADMIN);
    }
  }

  logOut(): void {
    this.dh.logOut();
    this.userService.clearCurrentUser();
    window.location.href = document.location.origin;
  }
}
