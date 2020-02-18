import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = '';

  constructor(private _http: HttpClient, public jwtHelper: JwtHelperService) {
    this.url = global.url;
  }

  login(formLogin): Observable<any> {
    let form = new FormData();
    form.append("email", formLogin.correo);
    form.append("password", formLogin.password);
    return this._http.post(this.url + "login", form);
  }

  logout(): Observable<any> {
    return this._http.get(this.url + "logout");
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    console.log(!this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);
  }

}
