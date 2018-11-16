import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
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
import { FuncionariosComponent } from './funcionario/funcionarios.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard',  component: DashboardComponent, data: {titulo: 'Dashboard'}},
            { path: 'progress',  component: ProgressComponent, data: {titulo: 'Progress'}},
            { path: 'graficas1',  component: Graficas1Component, data: {titulo: 'Gráficas'}},
            { path: 'promesas',  component: PromesasComponent, data: {titulo: 'Promesas'}},
            { path: 'rxjs',  component: RxjsComponent, data: {titulo: 'RxJs'}},
            { path: 'account-settings',  component: AccountSettingsComponent, data: {titulo: 'Ajustes del tema'}},
            { path: 'perfil',  component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
            // Mantenimientos
            { path: 'usuarios',  component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
            { path: 'capacitacion',  component: CapacitacionComponent, data: {titulo: 'Mantenimiento de capacitaciones'}},
            { path: 'feriado-legal',  component: FeriadoLegalComponent, data: {titulo: 'Mantenimiento de feriados legales'}},
            { path: 'feriado/:id',  component: FeriadoComponent, data: {titulo: 'Actualizar feriado legal'}},
            { path: 'licencia-medica',  component: LicenciasMedicasComponent, data: {titulo: 'Mantenimiento de licencias médicas'}},
            { path: 'licencia/:id',  component: LicenciaComponent, data: {titulo: 'Actualizar licencia médica'}},
            { path: 'tipo-categoria',  component: TipoCategoriaComponent, data: {titulo: 'Mantenimiento Tipo Categoría'}},
            { path: 'tipo-contrato',  component: TipoContratoComponent, data: {titulo: 'Mantenimiento Tipo Contrato'}},
            { path: 'tipo-permiso',  component: TipoPermisoComponent, data: {titulo: 'Mantenimiento Tipo Permiso'}},
            { path: 'categorias',  component: CategoriasComponent, data: {titulo: 'Mantenimiento Categorías'}},
            { path: 'categoria/:id',  component: CategoriaComponent, data: {titulo: 'Mantenimiento Categoría'}},
            { path: 'permisos',  component: PermisosComponent, data: {titulo: 'Mantenimiento Permisos'}},
            { path: 'permiso/:id',  component: PermisoComponent, data: {titulo: 'Mantenimiento Permisos'}},
            { path: 'funcionarios',  component: FuncionariosComponent, data: {titulo: 'Mantenimiento Funcionarios'}},
            { path: 'funcionario/:id',  component: FuncionarioComponent, data: {titulo: 'Mantenimiento Funcionarios'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
