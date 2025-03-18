import { Injectable } from '@angular/core';
import { LoginModel } from '../Models/LoginModel';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environments';
import { ParamsModel } from '../Models/ParamsModel';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private urlLogin = 'Login/login';

  constructor(
    private http: HttpClient
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
        'Authorization': 'Bearer ' + localStorage.getItem('token')
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

  Login(loginModel: LoginModel): Observable<any> {
    let params = new HttpParams()
      .set('email', loginModel.Email!)
      .set('pass', loginModel.Password!);

    return this.http.get<any>(
      this.GetUrl(this.urlLogin),
      { params: params, headers: this.httpOptions.headers }
    );
  }

  Login1(params: ParamsModel[]): Observable<any> {
    this.setParams(params);
    return this.http.get<any>(
      this.GetUrl(this.urlLogin),
      this.httpOptions
    );
  }
}
