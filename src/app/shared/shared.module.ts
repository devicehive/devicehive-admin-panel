import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {KeysPipe} from './pipes/keys.pipe';
import {FilterPipe} from './pipes/filter.pipe';
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
    FilterPipe,
    TipComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    ClipboardModule,

    KeysPipe,
    FilterPipe,
    TipComponent
  ],
})
export class SharedModule {
}
