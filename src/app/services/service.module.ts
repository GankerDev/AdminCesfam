import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  CapacitacionService,
  FeriadoLegalService,
  LicenciaMedicaService,
  CapNivelTecService,
  HorasCapService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    CapacitacionService,
    FeriadoLegalService,
    LicenciaMedicaService,
    CapNivelTecService,
    HorasCapService
  ],
  declarations: []
})
export class ServiceModule { }
