import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentServiceService } from '../services/student-service.service';
import { StudentModel } from '../models/student.model';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { LoaderServiceService } from 'src/app/services/loader-service.service';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.scss'],
})
export class DetailStudentComponent implements OnInit {
  studentId: number;
  student: StudentModel;

  constructor(
    private activedRoute: ActivatedRoute,
    private service: StudentServiceService,
    private route: Router,
    private loader: LoaderServiceService
  ) {
    this.studentId = Number(this.activedRoute?.snapshot?.paramMap?.get('id'));
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.service.getById(this.studentId).subscribe({
      next: (res: StudentModel) => {
        this.student = res;
      },
    });
  }

  back(): void {
    this.route?.navigate(['/students']);
  }

  detele(): void {
    Swal?.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: `Do you want delete ${this.student?.name}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result?.isConfirmed) {
        this.loader?.start();
        this.service
          ?.remove(this.student?.id)
          .pipe(
            finalize(() => {
              this.loader.stop();
            })
          )
          .subscribe({
            next: (res) => {
              if (res) {
                Swal.fire(
                  'Success',
                  'The register has been deleted',
                  'success'
                );
                this.route.navigate(['/students']);
              } else
                Swal.fire(
                  'Error',
                  'Ocourred an error deleting the student',
                  'error'
                );
            },
          });
      }
    });
  }
}
