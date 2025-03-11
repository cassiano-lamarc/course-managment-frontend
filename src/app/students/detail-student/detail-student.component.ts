import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../shared/services/students/student.service';
import { StudentModel } from '../models/student.model';
import Swal from 'sweetalert2';

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
    private service: StudentService,
    private route: Router,
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
        this.service
          ?.remove(this.student?.id)
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
