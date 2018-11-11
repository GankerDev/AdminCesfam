import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
   {
     titulo: 'Principal',
     icono: 'mdi mdi-gauge',
     submenu: [
       { titulo: 'Dashboard', url: '/dashboard'},
       { titulo: 'ProgressBar', url: '/progress'},
       { titulo: 'Gráficas', url: '/graficas1'},
       { titulo: 'Ajustes de tema', url: '/account-settings'},
       { titulo: 'Promesas', url: '/promesas'},
       { titulo: 'Rxjs', url: '/rxjs'}
     ]
   },
   {
     titulo: 'Mantenimiento',
     icono: 'mdi mdi-folder-lock-open',
     submenu: [
       {titulo: 'Usuarios', url: '/usuarios'},
       {titulo: 'Capacitación', url: '/capacitacion'},
       {titulo: 'Categoría', url: '/categoria'},
       {titulo: 'Feriado legal', url: '/feriado-legal'},
       {titulo: 'Funcionarios', url: '/funcionario'},
       {titulo: 'Licencias medicas', url: '/licencia-medica'},
       {titulo: 'Permisos', url: '/permiso'},
       {titulo: 'Tipo Categoría', url: '/tipo-categoria'},
       {titulo: 'Tipo Contrato', url: '/tipo-contrato'},
       {titulo: 'Tipo Permiso', url: '/tipo-permiso'}
     ]
   },
   {
    titulo: 'Puntajes',
    icono: 'mdi mdi-settings',
    submenu: [
      {titulo: 'Capacitación nivel técnico', url: '/cap-nive-tecnico'},
      {titulo: 'Nota Capacitación', url: '/cap-notas'},
      {titulo: 'Puntaje A-B', url: '/puntajeAb'},
      {titulo: 'Puntaje C-D-E-F', url: '/puntajeCDEF'},
      {titulo: 'Puntaje capacitación A-B', url: '/puntaje-cap-ab'},
      {titulo: 'Puntaje capacitación C-D-E-F', url: '/puntaje-cap-cdef'},
      {titulo: 'Puntaje experiencia', url: '/puntaje-exp'}
    ]
   }
  ];

  constructor() { }
}
