import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [LogoComponent]
})
export class LogoModule { }
