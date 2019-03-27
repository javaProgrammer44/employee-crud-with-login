import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {first} from 'rxjs/operators';
import {Employee} from '../models/employee';
import {Router} from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-employee-get',
  templateUrl: './employee-get.component.html',
  styleUrls: ['./employee-get.component.css']
})
export class EmployeeGetComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit() {
    this.employeeService.getAll().pipe(first()).subscribe(employees => {
      this.employees = employees;
    });
  }

  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id).subscribe(value => {
      this.router.navigateByUrl('/employee');
      this.employeeService.getAll().pipe(first()).subscribe(employees => {
        this.employees = employees;
        swal('Employee has been deleted successfully', '', 'success');
      });

    });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
