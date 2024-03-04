import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = ''
  jwt: any

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }
  setTokenJwtCookie(token: string) {
    this.cookieService.set('votacao_token', token)
    this.token = token
  }

  getTokenJwtCookie() {
    const token = this.cookieService.get('votacao_token')
    this.token = token
    return token
  }

  async login(document: string, password: string) {
    const jwt = await lastValueFrom(this.http
      .post<Auth>(`${environment.api}/v1/auth/`, {
        user: {
          document,
          password
        }
      }))

    this.setTokenJwtCookie(jwt.token)
    return jwt
  }
}
