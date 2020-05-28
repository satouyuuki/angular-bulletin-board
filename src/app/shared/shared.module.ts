import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms"; // 追加
import { DatePipe } from "./pipe/date.pipe"; // 追加

@NgModule({
  declarations: [
    DatePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    DatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
