import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class HospitalizacionesService {

  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  getHospitalizacionesActivas(): Observable<any> {
    return this._http.get(this.url + "getHospitalizacionesActivas");
  }

}
