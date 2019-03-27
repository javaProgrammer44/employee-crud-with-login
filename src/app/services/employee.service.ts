import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Employee} from '../models/employee';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class EmployeeService {
  private user: User;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Employee[]>('http://localhost:4000/employees', {headers: this.addHeader()});
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`http://localhost:4000/employee/${id}`, {headers: this.addHeader()});
  }

  addEmployee(employee: Employee) {
    return this.http.post(`http://localhost:4000/employee`, employee, {headers: this.addHeader()});
  }

  updateEmployee(employee: Employee) {
    return this.http.put(`http://localhost:4000/employee/${employee.id}`, employee, {headers: this.addHeader()});
  }

  deleteEmployee(id: number) {
    return this.http.delete(`http://localhost:4000/employee/${id}`, {headers: this.addHeader()});
  }


  public addHeader(): HttpHeaders {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.user) {
      const header = new HttpHeaders({
        'Authorization': 'Bearer ' + this.user.token,
        'Content-Type': 'application/json; charset=utf-8'
      });
      return header;
    }
  }
}
