import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService ) { }

  cargarHospitales( desde: number = 0) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url )
      .pipe(
        map( (resp: any) => {
          this.totalHospitales = resp.total;
          return resp.hospitales;
        } )
      );

  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.hospital )
      );

  }

  buscarHospitales( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
    .pipe(
      map( (resp: any) => resp.hospitales ));

  }

  actualizarHospital( hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
         .pipe(
            map( (resp: any) => {
              console.log(resp);
              Swal.fire({
               title: 'Hospital Actualizado',
               text: hospital.nombre,
               icon: 'success'
              });

              return true;

           } )
         );

  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
           .pipe(
             map( (resp: any) => {
              Swal.fire(
                'Hospital borrado',
                'El hospital ha sido eliminado correctamente',
                'success'
              );

              return true;
             } ));

  }

  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
           .pipe(
             map( (resp: any) => {
              Swal.fire(
                'Hospital creado',
                'El hospital ha sido creado correctamente',
                'success'
              );

              return resp.hospital;
             } ));

  }


}
