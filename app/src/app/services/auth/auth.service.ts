import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { Auth, UserAuth } from 'src/app/utils/interface/auth.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = ''
  private currentUser: UserAuth | null = null

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  setTokenJwtCookie(token: string) {
    this.cookieService.set('votacao_token', token)
    this.token = token
  }

  setCurrentUser(user: UserAuth) {
    this.currentUser = user
  }

  getCurrentUser() {
    return this.currentUser
  }

  async getTokenJwtCookie() {
    const token = this.cookieService.get('votacao_token')
    this.token = token
    return token
  }

  async logout() {
    this.cookieService.delete('votacao_token')
    this.token = ''
    this.currentUser = null
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
