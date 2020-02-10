import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url = '';

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  setEvento(formEvento): Observable<any> {
    let form = new FormData();
    form.append("title", formEvento.titulo);
    form.append("descripcion", formEvento.descripcion);
    form.append("color", formEvento.colorFondo);
    form.append("textColor", formEvento.colorTexto);
    form.append("start", formEvento.horaInicio);
    form.append("end", formEvento.horaTermino);
    return this._http.post(this.url + "setEvento", form);
  }

  getEventos(): Observable<any>{
    return this._http.get(this.url + "getEventos");
  }

  updateEvento(formEvento): Observable<any> {
    let form = new FormData();
    form.append("id", formEvento.id);
    form.append("title", formEvento.titulo);
    form.append("descripcion", formEvento.descripcion);
    form.append("color", formEvento.colorFondo);
    form.append("textColor", formEvento.colorTexto);
    form.append("start", formEvento.horaInicio);
    form.append("end", formEvento.horaTermino);
    return this._http.post(this.url + "updateEvento", form);
  }

  deleteEvento(id):Observable<any>{
    let form = new FormData();
    form.append('id', id);
    return this._http.post(this.url + "deleteEvento", form);
  }

}
