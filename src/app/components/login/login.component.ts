import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { LoginModel } from 'src/app/Models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  constructor(
    private httpService: HttpService,
    private formGroup: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.formLogin = this.formGroup.group({
      Email: [null, Validators.required],
      Password: [null, [Validators.required]],
    });
  }

  Login() {
    if (this.formLogin.valid) {
      const loginModel: LoginModel = this.formLogin.value;
      this.httpService.Login(loginModel).subscribe(
        (data) => {
          if (data.statusCode == 200) {
            this.router.navigate(['/Home']);
            localStorage.setItem('isAuthenticated', 'true');
          }
        },
        (error) => {
          console.log('Error del backend al iongresar :', error);
        }
      );
    }
  }
}
