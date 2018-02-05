import {Component, Input, OnInit} from '@angular/core';
import {User, UserRole, UserStatus} from "../../../shared/models/user.model";

@Component({
  selector: 'dh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;

  userRole = UserRole;
  userStatus = UserStatus;

  constructor() { }

  ngOnInit() {
  }

  get userDataValue() {
    return JSON.stringify(this.user.data, null, 2);
  }

  set userDataValue(v) {
    try {
      this.user.data = JSON.parse(v)
    } catch (error) {
      // do nothing, error might occur while user is still typing, will validate json at save time
    }
  }
}
