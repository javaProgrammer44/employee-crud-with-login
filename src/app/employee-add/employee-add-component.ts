import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/employee';
import {AlertService} from '../services/alert.service';
import swal from 'sweetalert';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add-component.html',
  styleUrls: ['./employee-add-component.css']
})
export class EmployeeAddComponent implements OnInit {

  static NEW_ID = 4;

  angForm: FormGroup;

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              private router: Router,
              private alertService: AlertService) {
    this.createForm();


    if (sessionStorage.getItem('NEW_ID')) {
      EmployeeAddComponent.NEW_ID = +sessionStorage.getItem('NEW_ID');
    }

  }

  createForm() {
    this.angForm = this.fb.group({
      employeeId: [EmployeeAddComponent.NEW_ID, Validators.required],
      employeeName: ['', Validators.required],
      department: ['', Validators.required]
    });
  }


  ngOnInit() {
  }

  addEmployee() {
    const employee = new Employee(
      +this.angForm.controls['employeeId'].value, this.angForm.controls['employeeName'].value, this.angForm.controls['department'].value);
    this.employeeService.addEmployee(employee).subscribe(value => {
      EmployeeAddComponent.NEW_ID = EmployeeAddComponent.NEW_ID + 1;
      sessionStorage.setItem('NEW_ID', EmployeeAddComponent.NEW_ID + '');
      this.router.navigateByUrl('/employee');
      swal('Employee has been added successfully', '', 'success');
    });
  }

  back() {
    this.router.navigateByUrl('/employee');
  }


}
