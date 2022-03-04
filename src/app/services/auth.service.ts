import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { switchMap,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private client : HttpClient,
    private tokenService : TokenService) { }

  login(email: string, password: string){
    return this.client.post<Auth>(`${this.apiUrl}/login`, {email,password})
    .pipe( //a partir de aqui para abajo, solo sirve para guardar el token en un localstorage.
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  profile(){
    // let headers = new HttpHeaders;
    // headers.set('Authorization', `Bearer ${token}`);
    return this.client.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile()),
    )
  }
}
