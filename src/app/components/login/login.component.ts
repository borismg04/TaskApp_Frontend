import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  constructor(
    //private parameterServis: ParameterServicesService,
    //private resetService: ResetServiceService,
    private formGroup: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
  ){
    this.formLogin = this.formGroup.group({
      Email: [null, Validators.required],
      Password: [null, [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
    })
  }

  login(){
    if(this.formLogin.valid){
      console.log(this.formLogin.value);
      this.router.navigate(['/home']);
    }
  }
}
