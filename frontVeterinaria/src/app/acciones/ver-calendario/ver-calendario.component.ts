import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { EventosService } from 'src/app/servicios/eventos.service';

@Component({
  selector: 'app-ver-calendario',
  templateUrl: './ver-calendario.component.html',
  styleUrls: ['./ver-calendario.component.css']
})
export class VerCalendarioComponent implements OnInit {
  //Control de set
  step = 0;
  //Variables ngModel del form nuevo evento
  nuevoEventoForm = {
    id: '',
    titulo: '',
    descripcion: '',
    colorFondo: '#7aa9eb',
    colorTexto: '#000000',
    horaInicio: '',
    horaTermino: ''
  }
  //variables de horas para los label
  labelHoraInicio = '';
  labelHoraTermino = '';
  //Idioma del Calendario
  locales = [esLocale];
  //Plugins a soportar por el calendario
  calendarPlugins = [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin];
  //Eventos a mostrar en el calendario
  data = []
  //Datos del Header
  header = {
    left: 'today,prev,next',
    center: 'title',
    right: 'dayGridMonth,listWeek,dayGridWeek,timeGridWeek'
  }

  constructor(private _eventosService: EventosService) { }

  ngOnInit() {
    this.getEventos();
  }

  //detectar click en el dia
  diaClick(test) {
    this.limpiarVariable();
    this.nuevoEventoForm.horaInicio = test.dateStr + 'T00:00';
    this.nuevoEventoForm.horaTermino = test.dateStr + 'T00:00';
    document.getElementById('open-modal-nueva-cita').click();
  }

  //detectar click en un evento
  eventoClick(evento) {
    this.limpiarVariable();
    this.nuevoEventoForm.id = evento.event.id;
    this.nuevoEventoForm.titulo = evento.event.title;
    this.nuevoEventoForm.descripcion = evento.event.extendedProps.descripcion;
    this.nuevoEventoForm.colorFondo = evento.event.backgroundColor;
    this.nuevoEventoForm.colorTexto = evento.event.textColor;
    this.nuevoEventoForm.horaInicio = evento.event.start.getFullYear() + "-" + ("0" + (evento.event.start.getMonth() + 1)).slice(-2) + "-" + ("0" + evento.event.start.getDate()).slice(-2) + "T" + ("0" + evento.event.start.getHours()).slice(-2) + ":" + ("0" + evento.event.start.getMinutes()).slice(-2);
    this.labelHoraInicio = evento.event.start.getFullYear() + "-" + ("0" + (evento.event.start.getMonth() + 1)).slice(-2) + "-" + ("0" + evento.event.start.getDate()).slice(-2) + " " + ("0" + evento.event.start.getHours()).slice(-2) + ":" + ("0" + evento.event.start.getMinutes()).slice(-2);
    if (evento.event.end != null) {
      this.nuevoEventoForm.horaTermino = evento.event.end.getFullYear() + "-" + ("0" + (evento.event.end.getMonth() + 1)).slice(-2) + "-" + ("0" + evento.event.end.getDate()).slice(-2) + "T" + ("0" + evento.event.end.getHours()).slice(-2) + ":" + ("0" + evento.event.end.getMinutes()).slice(-2);
      this.labelHoraTermino = evento.event.end.getFullYear() + "-" + ("0" + (evento.event.end.getMonth() + 1)).slice(-2) + "-" + ("0" + evento.event.end.getDate()).slice(-2) + " " + ("0" + evento.event.end.getHours()).slice(-2) + ":" + ("0" + evento.event.end.getMinutes()).slice(-2);
    }
    document.getElementById('open-modal-ver-cita').click();
  }

  eventRender(info) { 
    console.log('hola');
  } 

  limpiarVariable() {
    this.nuevoEventoForm.titulo = '';
    this.nuevoEventoForm.descripcion = '';
    //this.nuevoEventoForm.colorFondo = '';
    //this.nuevoEventoForm.colorTexto = '';
    this.nuevoEventoForm.horaInicio = '';
    this.nuevoEventoForm.horaTermino = '';
  }

  setNuevoEvento(form) {
    let datos = form.value;
    this._eventosService.setEvento(datos).subscribe(response => {
      if (response.estado == 'success') {
        alert(response.mensaje);
        this.getEventos();
      } else {
        alert(response.mensaje);
      }
    }, error => {
      console.log(error);
    });
  }

  getEventos() {
    this._eventosService.getEventos().subscribe(response => {
      this.data = response;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  updateEvento() {
    this._eventosService.updateEvento(this.nuevoEventoForm).subscribe(response => {
      if (response.estado == 'success') {
        alert(response.mensaje);
        this.getEventos();
      } else {
        alert(response.mensaje);
      }
    }, error => {
      console.log(error);
    });
  }

  controlSteps(accion) {
    switch (accion) {
      case 0:
        this.step = 0;
        break;

      case 1:
        if (this.step == 1) {
          this.step = 0;
        } else {
          this.step++;
        }
        break;

      case 2:
        this.step--;
        break;

      default:
        break;
    }
  }

}
