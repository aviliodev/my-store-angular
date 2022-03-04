import { Component } from '@angular/core';
import { Product } from './models/product.model';


import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

constructor(
  private userService: UsersService,
  private filesService: FilesService)
  {

  }

  onLoaded(img: string) {
    console.log('Padre. url de imagen hijo: ', img);
  }

  toggleImg() {
    this.showImg = !this.showImg; //cambia el estado de true a false y viceversa.
  }

  createUser(){
    this.userService.createUser({email: 'user1@correo.com', password:'12345',name:'User1'})
    .subscribe(respuesta => {
      console.log(respuesta);
    })
  }

  downloadPDF(){
    this.filesService.getFile('my.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });
    }

  }


}

