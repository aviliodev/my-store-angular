import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route, RouteConfigLoadEnd } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy { //Se implementa PreloadingStrategy para poder escoger qué módulos seleccionaremos para hacer precarga.

  constructor() { }

  //--------------Para implementar la estrategia de precarga----------------------
  //Funcionará para todas las rutas que tenga data y tengan la bandera "load" (esto se define en el archivo de rutas)
  preload(route: Route, load: ()=> Observable<any>): Observable<any>  {
    if (route.data && route.data['preload']){
      return load();
    }
    return of(null)
  }
  //------------------------------------------------------------------------------
}
