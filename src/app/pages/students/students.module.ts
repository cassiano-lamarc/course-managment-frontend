import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ListStudentsComponent } from './list-students.component';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { AddStudentModule } from './add-student/add-student.module';

@NgModule({
  declarations: [
    ListStudentsComponent,
    AddStudentModalComponent,
    DetailStudentComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AddStudentModule,
  ],
  providers: [provideNgxMask()],
})
export class StudentsModule {}
