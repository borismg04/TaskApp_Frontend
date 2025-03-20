import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from '../../Services/parameter.service';
import { ParamsModel } from '../../Models/ParamsModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private httpService: HttpService,
    private parameterService: ParameterService,
    private formGroup: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.formLogin = this.formGroup.group({
      Email: [null, Validators.required],
      Password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  Login() {
    if (this.formLogin.valid) {
      this.parameterService.email = this.formLogin.get('Email')?.value;
      this.parameterService.password = this.formLogin.get('Password')?.value;

      let params = new ParamsModel();
      params.name = 'email';
      params.value = this.parameterService.email;

      let params2 = new ParamsModel();
      params2.name = 'pass';
      params2.value = this.parameterService.password;

      this.httpService.Login([params, params2]).subscribe(
        (x) => {
          if (x.statusCode == 200) {
            this.router.navigate(['/Home']);
            localStorage.setItem('isAuthenticated', 'true');
            this.parameterService.name = x.result.nombre;
            this.parameterService.profile = x.result.profile;
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Contraseña errónea',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Contraseña errónea',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
    }
  }
}
