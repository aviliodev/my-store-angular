import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private client : HttpClient) { }

  getProducts(){
    return this.client.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products?limit=10&offset=10');
  }

  getProduct(id: string){
    return this.client.get<Product>('https://young-sands-07814.herokuapp.com/api/products/' + id);
  }
}
