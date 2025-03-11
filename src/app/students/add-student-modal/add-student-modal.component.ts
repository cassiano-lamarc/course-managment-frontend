import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { StudentService } from '../../shared/services/students/student.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { StudentListModel } from 'src/app/students/models/student-list.model';
import { StudentModel } from '../models/student.model';

export interface DialogData {
  student: StudentListModel;
}

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss'],
})
export class AddStudentModalComponent implements OnInit {
  nameMaxLength = 100;
  emailMaxLength = 200;
  studentForm?: FormGroup;
  dialogTitle: string;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private service: StudentService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.studentForm = fb.group({
      name: [
        null,
        [Validators.required, Validators.maxLength(this.nameMaxLength)],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(this.emailMaxLength),
        ],
      ],
      birthDate: [null, null],
      phone: [null, Validators.maxLength(20)],
    });

    this.dateAdapter.setLocale('pt-BR');

    this.isEdit = (this.data?.student?.id ?? 0) > 0;
    this.dialogTitle = this.isEdit ? 'Edit' : 'Register';
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.service
        .getById(this.data?.student?.id)
        .subscribe({
          next: (res: StudentModel) => {
            this.studentForm?.get('name').setValue(res?.name);
            this.studentForm?.get('email').setValue(res?.email);
            this.studentForm?.get('birthDate').setValue(res?.birthDate);
            this.studentForm?.get('phone').setValue(res?.phone);
          },
          error: () => {
            this.dialog?.closeAll();
          },
        });
    }
  }

  confirm(): void {
    if (this.isEdit)
      this.service
        .edit(this.data?.student?.id, this.studentForm.value)
        .subscribe({
          next: (res) => {
            Swal.fire('Success', 'Student has been edited', 'success');
            this.dialog?.closeAll();
          },
        });
    else
      this.service
        .add(this.studentForm?.value)
        .subscribe({
          next: (res) => {
            Swal.fire('Success', 'Student has been created', 'success');
            this.dialog?.closeAll();
          },
        });
  }
}
