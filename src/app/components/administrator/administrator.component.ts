import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/Models/UserModel';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import Swal from 'sweetalert2';
import { TaskModel } from 'src/app/Models/TaskModel';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent {

  tableInfoUsers = new MatTableDataSource<UserModel>();
  ColumnsUnfoUsers: string[] = ['id', 'name', 'email', 'profile', 'edit', 'delete'];
  showtableInfoUser: boolean = false;
  infoUsers: any = [];
  smallSize: boolean = false;

  tableInfoTasks = new MatTableDataSource<TaskModel>();
  ColumnsUnfoTasks: string[] = ['id', 'nameTask', 'description', 'priority', 'state', 'userGestion'];
  showTableInfoTasks: boolean = false;

  constructor(
    public dialog: MatDialog,
    public httpService: HttpService,
    public parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.GetUsers();
    this.GetAllTasks();
  }

  GetUsers() {
    this.httpService.GetUsers().subscribe(
      (x: any) => {
        if (x.statusCode == 200) {
          this.parameterService.users = x.result.users || [];
          this.tableInfoUsers = new MatTableDataSource(x.result);
          this.showtableInfoUser = true;
        } else {
          this.parameterService.users = [];
          this.showtableInfoUser = false;
        }
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.parameterService.users = [];
      }
    );
  }

  GetAllTasks() {
    this.httpService.GetTaskAdmin().subscribe(
      (x: any) => {
        if (x.statusCode == 200) {
          this.parameterService.allTask = x.result.tasks || [];
          this.tableInfoTasks = new MatTableDataSource(x.result);
          this.showTableInfoTasks = true;
        } else {
          this.parameterService.allTask = [];
          this.showTableInfoTasks = false;
        }
      }
    );
  }

  DeleteUser(id: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      text: 'No podrás recuperar la información',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.DeleteUser(id).subscribe(
          (x) => {
            if (x.statusCode == 200) {
              Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado',
                showConfirmButton: false,
                timer: 1500
              });
              this.GetUsers();
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Error deleting user',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
          },
          (error) => {
            console.error('Error deleting user:', error);
            Swal.fire({
              title: 'Error',
              text: 'Error deleting user',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        );
      }
    });
  }

  ModalRegisterUser() {
    let width = this.smallSize ? "90%" : "40%";
    const dialogRef = this.dialog.open(RegisterUserComponent, {
      width: width,
      data: {
        httpService: this.httpService,
        parametersService: this.parameterService,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.GetUsers();
    });
  }

  ModalUpdateUser(userUpd: any) {
    let width = this.smallSize ? "90%" : "40%";
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: width,
      data: userUpd
    });
    dialogRef.afterClosed().subscribe(() => {
      this.GetUsers();
    });
  }
}
