import { Component, OnInit } from '@angular/core';
import {Product, AddProduct} from "../../models/product.model";
import {StoreService} from "../../services/store.service";
import {ProductosService} from "../../services/productos.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  date = new Date();
  cumpleanos = new Date(2021,12,17);
  total = 0;
  showProductDetail = false;

  products: Product[] = [];
  product: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
      typeImg: ''
    },
  };
  myShoppingCart: Product[] = [];



   constructor(
     private storeService : StoreService,
     private productosService: ProductosService  //patrón de inyección de dependencias, para usar el servicio del Store y de Productos
    ) {
        this.myShoppingCart = storeService.getShoppingCart();
      }

  ngOnInit(): void {
    this.productosService.getProducts().subscribe(data => {
      this.products = data;
    }); //se coloca en OnInit porque este llamado de datos a un servicio, es asíncrono.
  }

  onAddToShoppingCart(elproducto: Product) {
    //this.myShoppingCart.push(elproducto);
    this.storeService.addProduct(elproducto);
    //this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0); /*esta función o método para sumar con reduce el precio de los items, es propia de javascript y manejo de arreglos*/
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productosService.getProduct(id).subscribe(data => {
      this.toggleProductDetail();
      this.product = data;
    });
  }

  addNewProduct(){
    const product : AddProduct = {
      title: 'Nueo producto',
      description: 'uan descripción',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2

    }
    this.productosService.createNewProduct(product)
    .subscribe(data => {
      console.log('created', data);
    });
  }

}
