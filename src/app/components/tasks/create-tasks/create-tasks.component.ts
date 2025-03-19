import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { FormBuilder } from '@angular/forms';
import { ParamsModel } from 'src/app/Models/ParamsModel';
import { ParameterService } from 'src/app/Services/parameter.service';
import { TaskModel } from 'src/app/Models/TaskModel';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.css']
})
export class CreateTasksComponent {
  formGroup: FormGroup;

  priority: any = ['Alta', 'Media', 'Baja'];
  state: any = ['Gestionado', 'Pendiente', 'En proceso'];

  constructor(
    public httpService: HttpService,
    public dialogRef: MatDialogRef<CreateTasksComponent>,
    public formBuilder: FormBuilder,
    public parametersService: ParameterService,
  ) {
    this.formGroup = this.formBuilder.group({
      'nameTask': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'priority': [null, [Validators.required]],
      'state': [null, [Validators.required]]
    });
  }

  // CreateTask() {
  //   let model = new TaskModel();
  //   const task = this.formGroup.get('nameTask')!.value;
  //   const description = this.formGroup.get('description')!.value;
  //   const userGestion = this.parametersService.name;
  //   const priority = this.formGroup.get('priority')!.value;
  //   const state = this.formGroup.get('state')!.value;

  //   model.nameTask = task;
  //   model.description = description;
  //   model.priority = priority;
  //   model.state = state;
  //   model.userGestion = userGestion;

  //   // const model: TaskModel = {
  //   //   nameTask: 'tarea 1',
  //   //   description: 'esto es una tarea',
  //   //   userGestion: this.parametersService.name, // Asegúrate de que esto devuelve "borismg"
  //   //   priority: 'Alta',
  //   //   state: 'Pendiente'
  //   // };


  //   console.log('Modelo a enviar:', model); // Registro de depuración

  //   this.httpService.CreateTask(model).subscribe(
  //     (x) => {
  //       console.log('Respuesta del servidor:', x); // Registro de depuración
  //       if (x.statusCode == 200) {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Tarea creada',
  //           showConfirmButton: false,
  //           timer: 1500
  //         });
  //         this.dialogRef.close();
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error al crear la tarea',
  //           showConfirmButton: false,
  //           timer: 1500
  //         });
  //         this.dialogRef.close();
  //       }
  //     },
  //     (err) => {
  //       console.error('Error en la llamada HTTP:', err); // Registro de depuración de errores
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error en la llamada HTTP',
  //         text: err.message || 'Error desconocido',
  //         showConfirmButton: false,
  //         timer: 3000
  //       });
  //     }
  //   );
  // }

  CreateTask() {
    let model = new TaskModel();
    const task = this.formGroup.get('nameTask')!.value;
    const description = this.formGroup.get('description')!.value;
    const userGestion = this.parametersService.name;
    const priority = this.formGroup.get('priority')!.value;
    const state = this.formGroup.get('state')!.value;

    console.log('Valores del formulario:', { task, description, priority, state, userGestion });

    model.nameTask = task;
    model.description = description;
    model.priority = priority;
    model.state = state;
    model.userGestion = userGestion;

    console.log('Modelo a enviar:', model);

    this.httpService.CreateTask(model).subscribe(
      (x) => {
        console.log('Respuesta del servidor:', x);
        if (x.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Tarea creada',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear la tarea',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
        }
      },
      (err) => {
        console.error('Error en la llamada HTTP:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error en la llamada HTTP',
          text: err.message || 'Error desconocido',
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
}

  close() {
    this.dialogRef.close();
  }
}
