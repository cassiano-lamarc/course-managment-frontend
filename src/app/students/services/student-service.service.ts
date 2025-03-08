import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  constructor(private http: HttpClient) {}

  add(body): Observable<number> {
    return this.http.post<number>(`${environment.baseUrl}Students`, body);
  }
}
