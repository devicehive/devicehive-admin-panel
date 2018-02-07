import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DevicehiveService} from "../core/devicehive.service";

@Component({
  selector: 'dh-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private dh: DevicehiveService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logOut() {
    this.dh.logOut();
    this.router.navigate(['/login']);
  }
}
