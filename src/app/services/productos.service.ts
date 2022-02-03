import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private client : HttpClient) { }

  getProducts(){
    return this.client.get<Product[]>('http://fakestoreapi.com/products');
  }
}
