import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/Models/UserModel';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  formGroup: FormGroup;


  constructor(
    public httpService: HttpService,
    public dialogRef: MatDialogRef<RegisterUserComponent>,
    public formBuilder: FormBuilder,
    public parametersService: ParameterService,
  ) {
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'email': [null, [Validators.required]],
      'password': [null, [Validators.required]],
    });
  }

  RegisterUsers() {
    let model = new UserModel();
    const name = this.formGroup.get('name')!.value;
    const email = this.formGroup.get('email')!.value;
    const password = this.formGroup.get('password')!.value;
    const profile = 'User';

    model.Nombre = name;
    model.Email = email;
    model.Password = password;
    model.Profile = profile;

    this.httpService.RegisterUser(model).subscribe(
      (x) => {
        if (x.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar el usuario',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el usuario',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  Close() {
    this.dialogRef.close();
  }
}
