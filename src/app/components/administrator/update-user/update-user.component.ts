import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/Models/UserModel';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  formGroup: FormGroup;

  constructor(
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public parametersService: ParameterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'name': [data?.nombre || null, [Validators.required]],
      'email': [data?.email || null, [Validators.required]],
      'password': [data?.password || null, [Validators.required]],
    });
  }

  UpdateUser() {
    let model = new UserModel();
    model.id = this.data.id;
    model.Nombre = this.formGroup.get('name')!.value;
    model.Email = this.formGroup.get('email')!.value;
    model.Password = this.formGroup.get('password')!.value;
    model.Profile = 'User';

    this.httpService.UpdateUser(model).subscribe(
      (x) => {
        if (x.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Actualizado',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Error updating user',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      (error) => {
        console.error('Error updating user:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error updating user',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  Close() {
    this.dialogRef.close();
  }
}
