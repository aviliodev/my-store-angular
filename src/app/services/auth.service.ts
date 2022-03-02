import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(private client : HttpClient) { }

  login(email: string, password: string){
    return this.client.post<Auth>(`${this.apiUrl}/login`, {email,password});
  }

  profile(token: string){
    // let headers = new HttpHeaders;
    // headers.set('Authorization', `Bearer ${token}`);
    return this.client.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
}
