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
import { LicenciaMedicaComponent } from './licencia-medica/licencia-medica.component';


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
            { path: 'licencia-medica',  component: LicenciaMedicaComponent, data: {titulo: 'Mantenimiento de licencias médicas'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
