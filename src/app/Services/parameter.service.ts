import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  //User
  email: string = '';
  password: string = '';
  name: string = '';

  //Task
  task: any = [];

  constructor() { }

  resetvalues() {
    this.email = '';
    this.password = '';
  }
}
