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
  time: NgbTimeStruct = {hour: 13, minute: 0, second: 0};

  accessToken: string;
  refreshToken: string;

  constructor(private jwtService: JwtService) {
  }

  ngOnInit() {
  }

  async createTokens() {
    this.accessToken = "test token";
    this.refreshToken = "test token";
  }
}
