import { Injectable } from '@angular/core';
import { LoginModel } from '../Models/LoginModel';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environments';
import { ParamsModel } from '../Models/ParamsModel';
import { ParameterService } from './parameter.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //Login
  private urlLogin = 'Login/login';

  //API - Task
  private urlGetTasks = 'Task/GetTasks';
  private urlCreateTask = 'Task/CreateTask';
  private urlUpdateTask = 'Task/UpdateTask';
  private urlDeleteTask = 'Task/DeleteTask';

  //API - Users
  private urlGetUsers = 'Users/GetUsuarios';
  private urlRegisterUsers = 'Auth/Register';
  private urlUpdateUsers = 'Users/UpdateUser';
  private urlDeleteUsers = 'Users/DeleteUser'

  constructor(
    private http: HttpClient,
    private parameterService: ParameterService
  ) { }

  GetUrl(url: string): string {
    return environment.baseUrl + url;
  }

  httpOptions: { headers: HttpHeaders; params?: HttpParams } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  setHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'email': this.parameterService.email,
        'pass': this.parameterService.password
      })
    };
  }

  setParams(params: ParamsModel[]) {
    if (params && params.length > 0) {
      let httpParams = new HttpParams();
      params.forEach(param => {
        if (param.value != null) httpParams = httpParams.set(param.name, param.value);
      });
      this.httpOptions.params = httpParams;
    }
  }

  Login(params: ParamsModel[]): Observable<any> {
    this.setParams(params);
    return this.http.get<any>(
      this.GetUrl(this.urlLogin),
      this.httpOptions
    );
  }

  GetTasks(): Observable<any> {
    this.setHeader();
    return this.http.get<any>(
      this.GetUrl(this.urlGetTasks),
      this.httpOptions
    );
  }

  CreateTask(model: any): Observable<any> {
    this.setHeader();
    return this.http.post<any>(
      this.GetUrl(this.urlCreateTask),
      model,
      this.httpOptions
    );
  }

  UpdateTask(model: any): Observable<any> {
    this.setHeader();
    return this.http.post<any>(
      this.GetUrl(this.urlUpdateTask),
      model,
      this.httpOptions
    );
  }

  DeleteTask(id: any): Observable<any> {
    this.setHeader();
    return this.http.delete<any>(
      this.GetUrl(this.urlDeleteTask + '?id=' + id),
      this.httpOptions
    );
  }

  GetUsers(): Observable<any> {
    this.setHeader();
    return this.http.get<any>(
      this.GetUrl(this.urlGetUsers),
      this.httpOptions
    );
  }

  RegisterUser(model: any): Observable<any> {
    this.setHeader();
    return this.http.post<any>(
      this.GetUrl(this.urlRegisterUsers),
      model,
      this.httpOptions
    );
  }

  UpdateUser(model: any): Observable<any> {
    this.setHeader();
    return this.http.post<any>(
      this.GetUrl(this.urlUpdateUsers),
      model,
      this.httpOptions
    );
  }

  DeleteUser(id: any): Observable<any> {
    this.setHeader();
    return this.http.delete<any>(
      this.GetUrl(this.urlDeleteUsers + '?id=' + id),
      this.httpOptions
    );
  }
}
