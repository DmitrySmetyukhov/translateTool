import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslationService} from './translation.service';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TranslatePipe],
  providers: [TranslationService],
  exports: [TranslatePipe]
})
export class SharedModule { }
