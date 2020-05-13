import { Injectable } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/internal/operators';
import { catchError } from "rxjs/operators";
import {Observable, throwError} from 'rxjs';
// import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router, ChildrenOutletContexts } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor( public http: HttpClient,
               public router: Router,
               public _subirArchivoService: SubirArchivoService ) {
    this.cargarStorage();
   }

  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
        .pipe(
          map( (resp: any) => {
            this.token = resp.token;
            localStorage.setItem('token', this.token);
            console.log('Token renovado');

            return true;
          } ),
          catchError(err => {
            this.router.navigate(['/login']);

            Swal.fire({
              title: 'No se pudo renovar token',
              text: 'No fue posible renovar token',
              icon: 'error'
            });

            return Observable.throw( err );

          })
        );

  }

  estaLogueado() {
    return (  this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else  {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {

      this.usuario = null;
      this.token = '';
      this.menu = [];

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('menu');

      this.router.navigate(['/login']);

  }

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token} )
    .pipe(
      map( (resp: any) => {

          this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
          return true;

      } )
    );

  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
              .pipe(
                map( (resp: any) => {
                    // console.log( resp.token );
                    this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                    return true;

                } ),
                catchError(err => {

                  Swal.fire({
                    title: 'Error en el login',
                    text: err.error.mensaje,
                    icon: 'error'
                  });

                  return throwError(err.message);

                })
              );

  }

  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .pipe(
                map( (resp: any) => {

                  Swal.fire({
                    title: 'Usuario Creado',
                    text: usuario.email,
                    icon: 'success'
                  });
                  return resp.usuario;
                } ),
                catchError(err => {

                  Swal.fire({
                    title: err.error.mensaje,
                    text: err.error.mensaje,
                    icon: 'error'
                  });

                  return throwError(err.message);

                })
              );

  }

  actualizarUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
         .pipe(
            map( (resp: any) => {

                //  Se verifica si es el mismo usuario actual para actualizarlo y se vea el cambio de imagen y nombre en tiempo real.
              if ( usuario._id === this.usuario._id ) {
                let usuarioDB: Usuario = resp.usuario;
                this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
              }

              Swal.fire({
               title: 'Usuario Actualizado',
               text: usuario.nombre,
               icon: 'success'
              });

              return true;

           } ),
           catchError(err => {

             Swal.fire({
               title: err.error.mensaje,
               text: err.error.mensaje,
               icon: 'error'
             });

             return throwError(err.message);

           })
         );

  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {

          this.usuario.img = resp.usuario.img;
          Swal.fire({
            title: 'Imagen Actualizada',
            text: this.usuario.nombre,
            icon: 'success'
           });

          this.guardarStorage( id, this.token, this.usuario, this.menu );

        })
        .catch( resp => {
          console.log(resp);
        } );

  }

  cargarUsuarios( desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url )
    .pipe(
      map( (resp: any) => resp.usuarios ));

  }

  borrarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
           .pipe(
             map( (resp: any) => {
              Swal.fire(
                'Usuario borrado',
                'El usuario ha sido eliminado correctamente',
                'success'
              );

              return true;
             } ));

  }

}
