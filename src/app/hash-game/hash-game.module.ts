import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashGameComponent } from './hash-game.component';



@NgModule({
  declarations: [
    HashGameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HashGameComponent
  ]
})
export class HashGameModule { }
