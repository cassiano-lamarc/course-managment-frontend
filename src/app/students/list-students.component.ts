import { Component, OnInit, ViewChild } from '@angular/core';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentListModel } from '../models/student-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentServiceService } from './services/student-service.service';
import { LoaderServiceService } from '../services/loader-service.service';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit {
  dataSource: MatTableDataSource<StudentListModel> =
    new MatTableDataSource<StudentListModel>();
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private service: StudentServiceService,
    private loader: LoaderServiceService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loader?.start();
    this.service
      ?.get()
      .pipe(
        finalize(() => {
          this.loader.stop();
        })
      )
      .subscribe({
        next: (res) => {
          debugger;
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          this.snack.open('Ocourred an error loading students');
        },
      });
  }

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(AddStudentModalComponent);

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
}
