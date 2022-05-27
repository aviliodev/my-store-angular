import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SwiperModule} from 'swiper/angular'


import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from '../shared/components/img/img.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ReversePipe } from './pipes/reverse.pipe';



@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,

  ],
  exports: [ //se exportan todos, para que puedan ser utilizados en cualquier modulo del sistema
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe
  ],
})
export class SharedModule { }
