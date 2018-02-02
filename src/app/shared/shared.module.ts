import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {KeysPipe} from "./pipes/keys.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    KeysPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,

    KeysPipe
  ],
})
export class SharedModule { }
