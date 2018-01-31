import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { UserDetailsComponent } from './user-details/user-details.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [UserDetailsComponent],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,

    UserDetailsComponent
  ],
})
export class SharedModule { }
