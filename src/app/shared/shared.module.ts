import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../componentes/modal-upload/modal-upload.component';



@NgModule ({
    imports: [
        RouterModule,        // Es algo que hay que importar si se quiere usar reuterLink en paginas dentro de la seccion
        CommonModule,
        PipesModule
    ],
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ]
})
export class SharedModule{ }
