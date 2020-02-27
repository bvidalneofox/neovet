import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {

  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  setLogoService(archivo): Observable<any> {
    let form = new FormData();
    form.append("archivo", archivo);
    return this._http.post(this.url + "setLogoVeterinaria", form);
  }

  getConfiguraciones(): Observable<any>{
    return this._http.get(this.url + "getConfiguraciones");
  }

}
