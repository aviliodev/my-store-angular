import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductosService } from 'src/app/services/productos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productID : string  | null = null;
  product : Product | null = null;

  constructor(private route : ActivatedRoute,
              private productosService: ProductosService,
              private location : Location) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productID = params.get('id');
        if (this.productID){
          return this.productosService.getProduct(this.productID);
        }
        return [null];//si el return dentro del if no devuelve nada, entonces este return devuelve vacio.
      })
    )
    .subscribe(data => {
      this.product = data;
    });
  }

  goToBack() {
    this.location.back();
  }

}
