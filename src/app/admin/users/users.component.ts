import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {UserService} from "../../core/user.service";
import {User, UserRole, UserStatus} from "../../shared/models/user.model";
import {NotifierService} from "angular-notifier";
import {UtilService} from "../../core/util.service";

@Component({
  selector: 'dh-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  userRole = UserRole;
  userStatus = UserStatus;

  newUser: User;
  isSendingRequest = false;

  activeModal: NgbModalRef;

  constructor(private userService: UserService,
              private modalService: NgbModal,
              private router: Router,
              private notifierService: NotifierService) {
  }

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }

  openUserDetails(user: User) {
    this.router.navigate(['/admin/user', user.id]);
  }

  async openNewUserModal(content) {
    this.newUser = new User();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra actions
    }
  }

  async createUser() {
    const inputError = UtilService.getUserInputErrors(this.newUser);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    this.isSendingRequest = true;
    try {
      const createdUser = await this.userService.createUser(this.newUser);

      this.newUser.id = createdUser.id;
      this.newUser.allDeviceTypesAvailable = createdUser.allDeviceTypesAvailable;
      this.users.push(this.newUser.toObject());

      this.newUser = null;
      this.activeModal.close();
      this.isSendingRequest = false;
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async deleteUser(user: User) {
    try {
      await this.userService.deleteUser(user.id);

      let index = this.users.indexOf(user);
      if (index > -1) {
        this.users.splice(index, 1);
      }
    } catch (error) {
      this.notifierService.notify('error', error.message);
    }
  }

  // Method to only display tooltip if value overflows. Seems to have negative impact on performance so we decided not to apply

  // getTooltip(element, user) {
  //   if (element.offsetWidth < element.scrollWidth) {
  //     return user.login;
  //   }
  //   return null;
  // }
}
