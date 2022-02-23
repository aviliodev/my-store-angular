import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product, AddProduct, UpdateProduct} from '../models/product.model'

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

  createNewProduct(data: AddProduct) {
    return this.client.post<Product>('https://young-sands-07814.herokuapp.com/api/products', data);

  }

  updateProduct(id: string, data: UpdateProduct) {
    return this.client.put<Product>('https://young-sands-07814.herokuapp.com/api/products/' + id, data);

  }
}
