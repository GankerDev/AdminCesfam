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
       {titulo: 'Categoría', url: '/categorias'},
       {titulo: 'Feriado legal', url: '/feriado-legal'},
       {titulo: 'Funcionarios', url: '/funcionarios'},
       {titulo: 'Licencias medicas', url: '/licencia-medica'},
       {titulo: 'Permisos', url: '/permisos'},
       {titulo: 'Tipo Categoría', url: '/tipo-categoria'},
       {titulo: 'Tipo Contrato', url: '/tipo-contrato'},
       {titulo: 'Tipo Permiso', url: '/tipo-permiso'}
     ]
   },
   {
    titulo: 'Puntajes',
    icono: 'mdi mdi-settings',
    submenu: [
      {titulo: 'Capacitación nivel técnico', url: '/cap-nivel-tecnicos'},
      {titulo: 'Nota Capacitación', url: '/cap-notas'},
      {titulo: 'Duración capacitación', url: '/horas-caps'},
      {titulo: 'Puntaje A-B', url: '/puntajeAbs'},
      {titulo: 'Puntaje C-D-E-F', url: '/puntajeCDEFs'},
      {titulo: 'Puntaje capacitación A-B', url: '/puntaje-cap-abs'},
      {titulo: 'Puntaje capacitación C-D-E-F', url: '/puntaje-cap-cdefs'},
      {titulo: 'Puntaje experiencia', url: '/puntaje-exps'}
    ]
   }
  ];

  constructor() { }
}
