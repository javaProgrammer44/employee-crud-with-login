import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EmployeeAddComponent} from './employee-add/employee-add-component';
import {EmployeeGetComponent} from './employee-get/employee-get.component';
import {AuthGuard} from './guards';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employee/add', component: EmployeeAddComponent , canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeeGetComponent, canActivate: [AuthGuard]},
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: '**', component: LoginComponent },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
