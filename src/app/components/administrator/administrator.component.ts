import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/Models/UserModel';
import { HttpService } from 'src/app/Services/http.service';
import { ParameterService } from 'src/app/Services/parameter.service';
import { RegisterUserComponent } from './register-user/register-user.component';

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

  ModalUpdateUser() {
    console.log("Update");
  }

  DeleteUser() {
    console.log("DeleteUser");
  }

  RegisterUser() {
    console.log("RegisterUser");
  }
}
