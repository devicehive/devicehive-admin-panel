import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { User, UserRole, UserStatus } from '../../shared/models/user.model';
import { NotifierService } from 'angular-notifier';
import { UtilService } from '../../core/util.service';
import { HelpService } from '../../core/help.service';

@Component({
  selector: 'dh-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 10;
  itemsCount: number = 100;
  pagesCount: number;

  users: Array<User>;
  userRole = UserRole;
  userStatus = UserStatus;

  newUser: User;
  isSendingRequest = false;

  activeModal: NgbModalRef;

  constructor(public helpService: HelpService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private notifierService: NotifierService) {
  }

  async ngOnInit(): Promise<void> {
    this.itemsCount = await this.userService.getUsersCount();
    this.pagesCount = Math.ceil(this.itemsCount / this.itemsPerPage);

    this.users = await this.userService.getSpecificAmountOfUsers(this.itemsPerPage, 0);
  }

  async loadPage() {
    const take = this.itemsPerPage * this.page > this.itemsCount ? this.itemsCount - this.itemsPerPage * (this.page - 1) : this.itemsPerPage;
    const skip = this.itemsPerPage * (this.page - 1);

    this.users = await this.userService.getSpecificAmountOfUsers(take, skip);
  }

  async updatePagination() {
    this.itemsCount = await this.userService.getUsersCount();
    this.pagesCount = Math.ceil(this.itemsCount / this.itemsPerPage);
    this.loadPage();
  }

  openUserDetails(user: User): void {
    this.router.navigate(['/admin/user', user.id]);
  }

  async openNewUserModal(content): Promise<void> {
    this.newUser = new User();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra actions
    }
  }

  async createUser(): Promise<void> {
    const inputError = UtilService.getUserInputErrors(this.newUser);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    this.isSendingRequest = true;
    try {
      await this.userService.createUser(this.newUser);
      await this.updatePagination();
      this.notifierService.notify('success','User has been successfully created');

      this.newUser = null;
      this.activeModal.close();
      this.isSendingRequest = false;

    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async deleteUser(user: User): Promise<void> {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await this.userService.deleteUser(user.id);
        await this.updatePagination();
        this.notifierService.notify('success','User has been successfully deleted');
      } catch (error) {
        this.notifierService.notify('error', error.message);
      }
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
