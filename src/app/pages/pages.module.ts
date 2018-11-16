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
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
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
        CapacitacionComponent,
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
        FuncionariosComponent
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

