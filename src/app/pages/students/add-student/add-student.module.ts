import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';

import { AddStudentComponent } from './add-student.component';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddCourseModule } from '../../course/add-course/add-course.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [AddStudentComponent, AddStudentFormComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    AddCourseModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [AddStudentComponent],
})
export class AddStudentModule {}
