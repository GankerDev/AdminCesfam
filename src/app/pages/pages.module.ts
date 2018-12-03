import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PAGES_ROUTES } from './pages.routes';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
// Mantenedores
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { CapacitacionesComponent } from './capacitacion/capacitaciones.component';
import { FeriadoLegalComponent } from './feriado-legal/feriado-legal.component';
import { FeriadoComponent } from './feriado-legal/feriado.component';
import { LicenciasMedicasComponent } from './licenciaMedica/licencias-medicas.component';
import { LicenciaComponent } from './licenciaMedica/licencia.component';
import { TipoCategoriaComponent } from './tipo-categoria/tipo-categoria.component';
import { TipoContratoComponent } from './tipo-contrato/tipo-contrato.component';
import { TipoPermisoComponent } from './tipo-permiso/tipo-permiso.component';
import { CategoriasComponent } from './categoria/categorias.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PermisoComponent } from './permiso/permiso.component';
import { PermisosComponent } from './permiso/permisos.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { FuncionariosComponent } from './funcionario/funcionarios.component';
import { PuntajeComponent } from './funcionario/puntaje.component';
// Puntajes
import { CapNivelTecComponent } from './puntajes/cap-nivel-tec/cap-nivel-tec.component';
import { CapNotaComponent } from './puntajes/cap-nota/cap-nota.component';
import { PuntajeCapABComponent } from './puntajes/puntaje-cap-ab/puntaje-cap-ab.component';
import { PuntajeABComponent } from './puntajes/puntaje-ab/puntaje-ab.component';
import { PuntajeCapCDEFComponent } from './puntajes/puntaje-cap-cdef/puntaje-cap-cdef.component';
import { PuntajeCDEFComponent } from './puntajes/puntaje-cdef/puntaje-cdef.component';
import { PuntajeExpComponent } from './puntajes/puntaje-exp/puntaje-exp.component';
import { CapNivelTecsComponent } from './puntajes/cap-nivel-tec/cap-nivel-tecs.component';
import { CapNotasComponent } from './puntajes/cap-nota/cap-notas.component';
import { PuntajesComponent } from './puntajes/puntaje-ab/puntajes.component';
import { PuntajesCapABComponent } from './puntajes/puntaje-cap-ab/puntajes-cap-ab.component';
import { PuntajesCapCDEFComponent } from './puntajes/puntaje-cap-cdef/puntajes-cap-cdef.component';
import { PuntajesCDEFComponent } from './puntajes/puntaje-cdef/puntajes-cdef.component';
import { PuntajesExpComponent } from './puntajes/puntaje-exp/puntajes-exp.component';
import { DuracionCapComponent } from './puntajes/horasCapacitacion/duracion-cap.component';
import { DuracionCapsComponent } from './puntajes/horasCapacitacion/duracion-caps.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        // Mantenedores
        CapacitacionComponent,
        CapacitacionesComponent,
        FeriadoLegalComponent,
        FeriadoComponent,
        LicenciasMedicasComponent,
        LicenciaComponent,
        TipoCategoriaComponent,
        TipoContratoComponent,
        TipoPermisoComponent,
        CategoriasComponent,
        CategoriaComponent,
        PermisoComponent,
        PermisosComponent,
        FuncionarioComponent,
        FuncionariosComponent,
        PuntajeComponent,
        // Puntajes
        CapNivelTecComponent,
        CapNotaComponent,
        PuntajeCapABComponent,
        PuntajeABComponent,
        PuntajeCapCDEFComponent,
        PuntajeCDEFComponent,
        PuntajeExpComponent,
        CapNivelTecsComponent,
        CapNotasComponent,
        PuntajesComponent,
        PuntajesCapABComponent,
        PuntajesCapCDEFComponent,
        PuntajesCDEFComponent,
        PuntajesExpComponent,
        DuracionCapComponent,
        DuracionCapsComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule {}

