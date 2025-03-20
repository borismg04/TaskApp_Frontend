import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  //User
  email: string = '';
  password: string = '';
  name: string = '';
  profile: string = '';

  users: any = [];
  passwordUser: string = '';

  //Task
  task: any = [];
  allTask: any = [];

  constructor() { }

  resetvalues() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.users = [];
    this.task = [];
    this.passwordUser = '';
    this.profile = '';
  }
}
