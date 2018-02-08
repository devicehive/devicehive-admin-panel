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
}
