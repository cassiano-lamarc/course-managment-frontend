import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response.model';
import { StudentListModel } from 'src/app/models/student-list.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  constructor(private http: HttpClient) {}

  add(body): Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(`${environment.baseUrl}Students`, body);
  }

  get(): Observable<BaseResponse<StudentListModel[]>>{
    return this.http.get<BaseResponse<StudentListModel[]>>(`${environment.baseUrl}Students`);
  }

  remove(id): Observable<BaseResponse<boolean>>{
    return this.http.delete<BaseResponse<boolean>>(`${environment.baseUrl}Students/${id}`);
  }
}
