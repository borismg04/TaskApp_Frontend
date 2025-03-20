import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  //User
  email: string = '';
  password: string = '';
  name: string = '';

  users: any = [];

  //Task
  task: any = [];

  constructor() { }

  resetvalues() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.users = [];
    this.task
  }
}
