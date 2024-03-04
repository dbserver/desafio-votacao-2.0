import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserAuth } from 'src/app/utils/interface/auth.interface';
import { UserDto } from 'src/app/utils/interface/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  async getCurrentUser() {
    return await lastValueFrom(this.http
      .get<UserAuth>(`${environment.api}/v1/users/`))
  }

  async postUser(dto: UserDto) {
    return await lastValueFrom(this.http
      .post<UserAuth>(`${environment.api}/v1/users/`, {
        user: dto
      }))
  }
}
