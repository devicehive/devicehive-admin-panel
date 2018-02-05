import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {UserService} from "../../core/user.service";
import {User, UserRole, UserStatus} from "../../shared/models/user.model";

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
  isCreatingUser = false;

  activeModal: NgbModalRef;

  constructor(private userService: UserService,
              private modalService: NgbModal,
              private router: Router) {
  }

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }

  openUserDetails(user: User) {
    this.router.navigate(['/admin/user', user.id]);
  }

  async openNewUserModal(content) {
    this.newUser = new User();
    this.isCreatingUser = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra actions
    }
  }

  async createUser() {
    if (!this.newUser.password || this.newUser.password.length < 6
      || this.newUser.password !== this.newUser.passwordConfirmation
      || !this.newUser.login || this.newUser.password.length < 3
      || !this.newUser.role
      || !this.newUser.status) {
      // TODO display error message
      return;
    }

    this.isCreatingUser = true;
    const createdUser = await this.userService.createUser(this.newUser);

    this.newUser.id = createdUser.id;
    this.newUser.allDeviceTypesAvailable = createdUser.allDeviceTypesAvailable;
    this.users.push(this.newUser);

    this.newUser = null;
    this.activeModal.close();
    this.isCreatingUser = false;
  }

  async deleteUser(user: User) {
    await this.userService.deleteUser(user.id);

    let index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}
