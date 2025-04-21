import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterLoginDto } from '../../models/register-login.dto';
import { UserRegisterResponseDto } from '../../models/user-register-response.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:9091/auth';

  constructor(private http: HttpClient) { }

  register(dto: RegisterLoginDto): Observable<UserRegisterResponseDto> {
    return this.http.post<UserRegisterResponseDto>(`${this.apiUrl}/register`, dto);
  }
}
