import { Component, OnInit, ViewChild } from '@angular/core';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentListModel } from './models/student-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/shared/services/students/student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit {
  dataSource: MatTableDataSource<StudentListModel> =
    new MatTableDataSource<StudentListModel>();
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private service: StudentService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service?.get().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(AddStudentModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  addStudent() {
    this.route.navigate(['/students/add'])
  }

  openEditStudentDialog(row) {
    const dialogRef = this.dialog.open(AddStudentModalComponent, {
      data: {
        student: row,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue?.trim()?.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  askConfirmationDelete(item): void {
    Swal?.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: `Do you want delete ${item?.name}?`,
      showCancelButton: true,
    }).then((result) => {
      if (result?.isConfirmed) {
        this.service?.remove(item?.id).subscribe({
          next: (res) => {
            if (res) {
              Swal.fire('Success', 'The register has been deleted', 'success');
              this.loadData();
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

  detailStudent(id): void {
    this.route?.navigate([`/students/detail/${id}`]);
  }
}
