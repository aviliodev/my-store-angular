import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductosService} from "../../../services/productos.service";
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  products : Product[] = [];
  productID : string | null = null;
  limit = 10;
  offset = 0;

  constructor(
    private productosService: ProductosService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productosService.getProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = data;
      this.offset += this.limit; //para indicar el nuevo offset despues de cargar 10 items nuevos
    }); //se coloca en OnInit porque este llamado de datos a un servicio, es asíncrono.

    this.route.queryParamMap.subscribe(param => {
      this.productID = param.get('product');
    })

  }

  onLoadMore(){
    this.productosService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data); //para añadir la nueva colección de productos a la lista
      this.offset += this.limit; //para indicar el nuevo offset despues de cargar 10 items nuevos
    })
  }
}
