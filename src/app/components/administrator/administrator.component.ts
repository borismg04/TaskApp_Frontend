import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/Models/UserModel';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent {

  tableInfoUsers = new MatTableDataSource<UserModel>();
  ColumnsUnfoUsers: string[] = ['id', 'name', 'email', 'profile','edit','delete'];
  showtableInfoUser: boolean = false;
  infoUsers: any = [];
  smallSize: boolean = false;

  constructor(
    public dialog: MatDialog,
    public httpService: HttpService,
    public parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers() {
    this.httpService.GetUsers().subscribe(
      (x: any) => {
        console.log("x: ", x);
        if (x.statusCode == 200) {
          this.parameterService.users = x.result.users || [];
          this.tableInfoUsers = new MatTableDataSource(x.result);
          console.log("x.result: ", x.result);
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
    console.log('Usuario seleccionado para editar:', userUpd);

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
