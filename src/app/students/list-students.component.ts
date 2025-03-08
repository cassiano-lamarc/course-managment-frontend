import { Component } from '@angular/core';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent {
  constructor(public dialog: MatDialog) {}

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(AddStudentModalComponent);
  }
}
