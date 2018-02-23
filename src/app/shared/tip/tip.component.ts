import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dh-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {

  @Input() text: string;

  constructor() {
  }

  ngOnInit() {
  }

}
