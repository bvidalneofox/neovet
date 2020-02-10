import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private _http: HttpClient) { }

  setEvento(formEvento): Observable<any> {
    let form = new FormData();
    form.append("title", formEvento.titulo);
    form.append("descripcion", formEvento.descripcion);
    form.append("color", formEvento.colorFondo);
    form.append("textColor", formEvento.colorTexto);
    form.append("start", formEvento.horaInicio);
    form.append("end", formEvento.horaTermino);
    return this._http.post("http://127.0.0.1:8000/api/setEvento", form);
  }

  getEventos(): Observable<any>{
    return this._http.get("http://127.0.0.1:8000/api/getEventos/");
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
    return this._http.post("http://127.0.0.1:8000/api/updateEvento", form);
  }

}
