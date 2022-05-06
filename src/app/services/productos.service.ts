import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {Product, AddProduct, UpdateProduct} from '../models/product.model'
import { environment } from 'src/environments/environment';
import { catchError, map, retry, throwError } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  //private apiUrl = `${environment.API_URL}/api/products`;
  /*Antes se colocaba la URL completa, pero, para evitar posibles problemas con el CORS del backend,
  Se coloca nada más la porción que va despues del dominio "/api/products".*/
  private apiUrl = `${environment.API_URL}/api`;
  /*Ahora, a causa del getProductsByCategory, la URL ya no puede ser /api/products. Ahora deberá llegar hasta /api, y el resto que se coloque en cada get, segun convenga.

  Luego, atraves de un proxy (proxy.config.json) se le añade el pedazo que le falta "https://young-sands-07814.herokuapp.com"
  Para poder utilizar el proxy, se debe activar desde el package.json, en la seccion de scripts, en el start.

  Esto, solo funciona en ambiente de desarrollo. En producción, el backend debe proporcionar permisos
  para que cualquier dominio o al menos nuestro dominio pueda accesar al servicio.

  ADICIONALMENTE: se agregó la variable ${environment.API_URL}, es una variable de entorno (ver carpeta enviroments) que vendrá
  vacia en ambiente de desarrollo, pero en producción, donde no usaremos proxy, devolverá la porción
  de la URL que falta, para que esté completa. para que el sistema sepa que está en ambiente de producción,
  se debe compilar con el comando "ng build --prod" */

  constructor(private client : HttpClient) { }

  getProducts(){
    return this.client.get<Product[]>(`${this.apiUrl}/products?limit=10&offset=10`);
  }

  getProduct(id: string){
    return this.client.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse)=>{
        if (error.status === HttpStatusCode.Conflict){
          return throwError('algo falló en el server');
        }
        if (error.status === HttpStatusCode.NotFound){
          return throwError('elproducto no existe');
        }

        if (error.status === HttpStatusCode.Unauthorized){
          return throwError('no estas autorizado');
        }
        return throwError('pasó algo malo');
      })
    );
  }

  getProductsByPage(limit:number, offset: number){
    // return this.client.get<Product[]>(`https://young-sands-07814.herokuapp.com/api/products?limit=${limit}&offset=${offset}`);
    return this.client.get<Product[]>(`${this.apiUrl}/products`, {params: {limit,offset}, context: checkTime()}) //esto de context: checktime, no es obligatorio, se le agregó para añadirle un contexto, definido en el interceptor time para evaluar el tiempo de respuesta; con el context, solo se evaluará el tiempo en getProductsByPage()
    .pipe(
       retry(3), //retry se usa para volver a intentar hacer la consulta 3 veces, en caso de que la conexión esté fallando
       map(products => products.map(item => { //este map es propio de rxjs, sirve para evaluar cada item de la respuesta y modificarlo. En esta caso se está agregando valor al campo taxes, el cual viene vacio porque le backend no lo envia, si no que se llena aqui en el servicio.
         return {
           ...item,
           taxes: .12 * item.price
         }
       }))
    );
  }

  getProductsByCategory(limit:number, offset: number, categoryID: string){
    return this.client.get<Product[]>(`${this.apiUrl}/categories/${categoryID}/products`, {params: {limit,offset}})
    .pipe(
       retry(3), //retry se usa para volver a intentar hacer la consulta 3 veces, en caso de que la conexión esté fallando
       map(products => products.map(item => { //este map es propio de rxjs, sirve para evaluar cada item de la respuesta y modificarlo. En esta caso se está agregando valor al campo taxes, el cual viene vacio porque le backend no lo envia, si no que se llena aqui en el servicio.
         return {
           ...item,
           taxes: .12 * item.price
         }
       }))
    );
  }

  createNewProduct(data: AddProduct) {
    return this.client.post<Product>(`${this.apiUrl}/products`, data);

  }

  updateProduct(id: string, data: UpdateProduct) {
    return this.client.put<Product>(`${this.apiUrl}/products/${id}`, data);

  }

  deleteProduct(id: string){
    return this.client.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
