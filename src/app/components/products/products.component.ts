import { Component, OnInit } from '@angular/core';
import {Product, AddProduct, UpdateProduct} from "../../models/product.model";
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

  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'succes' | 'error' | 'init' = 'init'; //puede tener 4 estados. el estaod inciial es init

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
    this.productosService.getProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = data;
      this.offset += this.limit; //para indicar el nuevo offset despues de cargar 10 items nuevos
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
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productosService.getProduct(id)
    .subscribe(data => {
      this.product = data;
      this.statusDetail = 'succes';
    }, errMsg => {
      window.alert(errMsg);
      this.statusDetail = 'error';
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

  updateProduct(){
    const productChanges : UpdateProduct = {
      title: 'Producto 2',
      description: 'producto actualizado',
    }

    let idProdSeleccionado = this.product.id; //this.product.id es el id del producto seleccionado en onShowDetail()

    this.productosService.updateProduct(idProdSeleccionado, productChanges)
    .subscribe(data => {
      // console.log('updated',data);
      const productIndex = this.products.findIndex(item => item.id === this.product.id); //se busca el indice del producto seleccionado en la lista de productos
      this.products[productIndex] = data; //se actualiza el producto seleccionado dentro de la lista de productos
      this.product = data; //se actualiza el producto seleccionado
    })
  }

  deleteProduct(){
    let idProdSeleccionado = this.product.id; //this.product.id es el id del producto seleccionado en onShowDetail()
    this.productosService.deleteProduct(idProdSeleccionado)
    .subscribe(() =>{
      const productIndex = this.products.findIndex(item => item.id === this.product.id); //se busca el indice del producto seleccionado en la lista de productos
      this.products.splice(productIndex,1);
      this.showProductDetail = false;

    })
  }

  loadMore(){
    this.productosService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data); //para añadir la nueva colección de productos a la lista
      this.offset += this.limit; //para indicar el nuevo offset despues de cargar 10 items nuevos
    });
  }

}
