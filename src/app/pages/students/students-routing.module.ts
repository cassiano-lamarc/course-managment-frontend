import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentsComponent } from './list-students.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { AddStudentComponent } from './add-student/add-student.component';

const routes: Routes = [
  {
    path: '',
    component: ListStudentsComponent,
  },
  {
    path: 'detail/:id',
    component: DetailStudentComponent,
  },
  {
    path: 'add',
    component: AddStudentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
