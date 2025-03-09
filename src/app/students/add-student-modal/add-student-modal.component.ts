import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { StudentServiceService } from '../services/student-service.service';
import { LoaderServiceService } from 'src/app/services/loader-service.service';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss'],
})
export class AddStudentModalComponent {
  nameMaxLength = 100;
  emailMaxLength = 200;
  studentForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private service: StudentServiceService,
    private loader: LoaderServiceService,
    public dialog: MatDialog
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
  }

  confirm() {
    this.loader?.start();

    this.service
      ?.add(this.studentForm?.value)
      .pipe(
        finalize(() => {
          this.loader?.stop();
        })
      )
      .subscribe({
        next: (res) => {
          Swal.fire('Success', 'Student has been created', 'success');
          this.dialog?.closeAll();
        }
      });
  }
}
