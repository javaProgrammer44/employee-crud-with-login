import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/employee';
import {AlertService} from '../services/alert.service';


import swal from 'sweetalert';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  angForm: FormGroup;
  employee: Employee;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router,
              private alertService: AlertService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {

    this.route.params.subscribe(params => {
      this.employeeService.getById(params['id']).subscribe(res => {
        this.employee = res;
        console.log(res);

        this.angForm = this.fb.group({
          employeeId: [this.employee.id, Validators.required],
          employeeName: [this.employee.employeeName, Validators.required],
          department: [this.employee.department, Validators.required]
        });

      });
    });
  }


  ngOnInit() {
  }


  updateEmployee() {
    const employee = new Employee
    (this.angForm.controls['employeeId'].value, this.angForm.controls['employeeName'].value, this.angForm.controls['department'].value);
    this.employeeService.updateEmployee(employee).subscribe(value => {
      this.router.navigateByUrl('/employee');
      swal('Employee has been updated successfully', '', 'success');
    });

  }

  back() {
    this.router.navigateByUrl('/employee');
  }
}
