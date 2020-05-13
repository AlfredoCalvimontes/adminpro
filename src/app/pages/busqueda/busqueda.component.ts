import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/models/usuario.model';
import { Medico } from '../../../models/medico.model';
import { Hospital } from 'src/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( public activatedRoute: ActivatedRoute,
               public http: HttpClient,
               public router: Router
                ) {

    activatedRoute.params
      .subscribe( params => {
        let termino = params['termino'];
        this.buscar( termino );
      } );
  }

  ngOnInit(): void {
  }

  buscar( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
      .subscribe( (resp: any) => {

         this.hospitales = resp.hospitales;
         this.medicos = resp.medicos;
         this.usuarios = resp.usuarios;

         console.log(this.medicos[0].img);
      } );

  }

}
