import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {Employee} from '../models/employee';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  private static num = 1;
  employees: Employee[] = [];



  constructor() {
    this.employees = JSON.parse(sessionStorage.getItem('employees'));
    console.log('xxxxx');
    if (!this.employees) {
      this.employees = [];
      this.employees.push(new Employee(1, 'Yasir Shabbir', 'IT'));
      this.employees.push(new Employee(2, 'Zeeshan Malik', 'Operation'));
      this.employees.push(new Employee(3, 'Saravana kumar', 'CEO'));
    }

    sessionStorage.setItem('employees', JSON.stringify(this.employees));

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        // find if any user matches login credentials


        if ('yasir' === request.body.username && 'yasir' === request.body.password) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const body = {
            id: 1,
            username: request.body.username,
            token: 'fake-jwt-token'
          };

          return of(new HttpResponse({status: 200, body: body}));
        } else {
          // else return 400 bad request
          return throwError({error: {message: 'Username or password is incorrect'}});
        }
      }

      // get users
      if (request.url.endsWith('/employees') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          console.log(this.employees);

          // let filteredUsers = this.employees.filter(user => {
          //   return user.username === request.body.username && user.password === request.body.password;
          // });

          return of(new HttpResponse({status: 200, body: this.employees}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }

      // get users
      if (request.url.includes('/employee/') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
        const id = +request.url.substr(request.url.length - 1);


        let filteredEmployee;
        this.employees.forEach(employee => {
          if (employee.id === id) {
            filteredEmployee = employee;
          }
        });

        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({status: 200, body: filteredEmployee}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }

      // get users
      if (request.url.includes('employee/') && request.method === 'PUT') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application

        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const id = +request.url.substr(request.url.length - 1);


          this.employees.forEach(employee => {
            if (employee.id === id) {
              employee.employeeName = request.body.employeeName;
              employee.department = request.body.department;
            }
          });

          sessionStorage.setItem('employees', JSON.stringify(this.employees));
          return of(new HttpResponse({status: 200}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }

      // get users
      if (request.url.includes('employee/') && request.method === 'DELETE') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application

        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          const id = +request.url.substr(request.url.length - 1);

          const employeeList = [];
          this.employees.forEach(employee => {
            if (employee.id !== id) {
              employeeList.push(employee);
            }
          });

          this.employees = null;
          this.employees = employeeList;
          sessionStorage.setItem('employees', JSON.stringify(this.employees));
          return of(new HttpResponse({status: 200}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }

      // get users
      if (request.url.endsWith('employee') && request.method === 'POST') {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application

        if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {


          const employee = new Employee(request.body.id, request.body.employeeName, request.body.department);
          this.employees.push(employee);

          sessionStorage.setItem('employees', JSON.stringify(this.employees));
          return of(new HttpResponse({status: 200}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      }


      // pass through any requests not handled above
      return next.handle(request);

    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
