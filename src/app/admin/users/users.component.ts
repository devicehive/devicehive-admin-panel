import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
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

  constructor(private userService: UserService,
              private modalService: NgbModal,
              private router: Router) {
  }

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }

  openUserDetails(user) {
    this.router.navigate(['/admin/user', 1]);
  }

  async openNewUserModal(content) {
    try {
      const result = await this.modalService.open(content).result;
      console.log(`Closed with: ${result}`);
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra actions
    }
  }

}
