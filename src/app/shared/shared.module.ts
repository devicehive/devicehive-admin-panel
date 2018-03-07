import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {KeysPipe} from './pipes/keys.pipe';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TipComponent} from './tip/tip.component';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    ClipboardModule
  ],
  declarations: [
    KeysPipe,
    TipComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    ClipboardModule,

    KeysPipe,
    TipComponent
  ],
})
export class SharedModule {
}
