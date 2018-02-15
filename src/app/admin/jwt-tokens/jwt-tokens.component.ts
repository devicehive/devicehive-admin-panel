import {Component, OnInit} from '@angular/core';
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {JwtService} from "../../core/jwt.service";

@Component({
  selector: 'dh-jwt-tokens',
  templateUrl: './jwt-tokens.component.html',
  styleUrls: ['./jwt-tokens.component.scss']
})
export class JwtTokensComponent implements OnInit {

  date: NgbDateStruct;
  time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

  accessToken: string;
  refreshToken: string;

  constructor(private jwtService: JwtService) {
  }

  ngOnInit() {
  }

  async createTokens() {
    let expiration: Date = null;
    if (this.date) {
      // we have to do this.date.month - 1 because NgbDateStruct starts counting months from 1 and Date starts counting from 0
      expiration = new Date(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute);
    }
    const tokens = await this.jwtService.createTokens(expiration);
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  clearExpirationDate() {
    this.date = null;
    this.time = {hour: 0, minute: 0, second: 0};
  }
}
