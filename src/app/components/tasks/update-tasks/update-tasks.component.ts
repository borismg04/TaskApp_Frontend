import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModel } from 'src/app/Models/TaskModel';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.css']
})
export class UpdateTasksComponent {
  formGroup: FormGroup;

  priority: any = ['Alta', 'Media', 'Baja'];
  state: any = ['Gestionado', 'Pendiente', 'En proceso'];

  constructor(
    public httpService: HttpService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateTasksComponent>,
    public parametersService: ParameterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'nameTask': [data?.nameTask || null, [Validators.required]],
      'description': [data?.description || null, [Validators.required]],
      'priority': [data?.priority || null, [Validators.required]],
      'state': [data?.state || null, [Validators.required]]
    });
  }

  UpdateTask() {
    let model = new TaskModel();
    model.id = this.data.id;
    model.nameTask = this.formGroup.get('nameTask')!.value;
    model.description = this.formGroup.get('description')!.value;
    model.priority = this.formGroup.get('priority')!.value;
    model.state = this.formGroup.get('state')!.value;
    model.userGestion = this.parametersService.name;

    this.httpService.UpdateTask(model).subscribe(
      (x) => {
        if (x.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Tarea Actualizada',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Error updating task',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      (error) => {
        console.error('Error updating task:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error updating task',
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
