import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentListModel } from 'src/app/students/models/student-list.model';
import { environment } from 'src/environments/environment.development';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  constructor(private http: HttpClient) {}

  add(body): Observable<number> {
    return this.http.post<number>(`${environment.baseUrl}Students`, body);
  }

  get(): Observable<StudentListModel[]> {
    return this.http.get<StudentListModel[]>(`${environment.baseUrl}Students`);
  }

  remove(id): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.baseUrl}Students/${id}`);
  }

  getById(id): Observable<StudentModel> {
    return this.http.get<StudentModel>(
      `${environment.baseUrl}Students/${id}`
    );
  }

  edit(id, data): Observable<boolean> {
    return this.http.put<boolean>(`${environment.baseUrl}/${id}`, data);
  }
}
