import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseComponent } from './add-course.component';



@NgModule({
  declarations: [AddCourseComponent],
  imports: [
    CommonModule
  ],
  exports: [AddCourseComponent]
})
export class AddCourseModule { }
