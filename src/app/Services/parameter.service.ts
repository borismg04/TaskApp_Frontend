import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  email: string = '';
  password: string = '';
  name: string = '';

  constructor() { }

  resetvalues() {
    this.email = '';
    this.password = '';
  }
}
