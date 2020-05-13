import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: '', 
    component: PagesComponent, 
    canActivate: [ LoginGuardGuard ], 
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: '**', component: NopagefoundComponent }
];


export const App_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );



/*

Para estructurar las rutas se tiene que hacer el archivo de rutas en la seccion y en este se colocan
solamente paginas que estan dentro de la seccion (carpeta de paginas).
Esta hoja de rutas en importada en el .module de la seccion, donde tambien se importan los demas modulos
de otras secciones a las que se necesita acceso. No se importa la hoja de rutas de otras secciones.

*/
