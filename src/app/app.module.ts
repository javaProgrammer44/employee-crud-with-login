import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, fakeBackendProvider} from './helpers';
import {AlertComponent} from './alert/alert.component';
import {EmployeeAddComponent} from './employee-add/employee-add-component';
import {EmployeeGetComponent} from './employee-get/employee-get.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    EmployeeAddComponent,
    EmployeeGetComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
