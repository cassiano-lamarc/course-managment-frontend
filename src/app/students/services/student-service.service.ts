import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentListModel } from 'src/app/models/student-list.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  constructor(private http: HttpClient) {}

  add(body): Observable<number> {
    return this.http.post<number>(`${environment.baseUrl}Students`, body);
  }

  get(): Observable<StudentListModel[]>{
    return this.http.get<StudentListModel[]>(`${environment.baseUrl}Students`);
  }
}
