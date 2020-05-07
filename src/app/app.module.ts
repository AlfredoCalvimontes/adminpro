import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Rutas
import { App_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // AppRoutingModule,
    PagesModule,
    App_ROUTES,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Los module van siempre en imports.
Para importar un component en alguna page se puede declarar directamente en el module de la seccion y exportar desde
la misma para que todos las pages o components de la seccion puedan usarle. No debe estar en ningun otro module.
Al declararlo e importarlo en app.module (el de raiz), no exportara a todas partes, solo a los que esten directamente
en su seccion, no las secciones alojadas en su carpeta pues son otras secciones.

Por ello mismo no se puede usar en varias secciones.
...

*/
