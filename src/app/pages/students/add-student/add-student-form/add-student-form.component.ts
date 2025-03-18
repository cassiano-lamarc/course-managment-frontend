import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

import { StudentService } from 'src/app/shared/services/students/student.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.scss'],
})
export class AddStudentFormComponent {
  nameMaxLength = 100;
  emailMaxLength = 200;
  studentForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private service: StudentService
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
      cpf: [null, Validators.maxLength(20)],
      rg: [null, Validators.maxLength(20)],
    });

    this.dateAdapter.setLocale('pt-BR');
  }
}
