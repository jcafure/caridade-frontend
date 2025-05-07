import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto, RegisterLoginDto } from '../../models/register-login.dto';
import { UserRegisterResponseDto } from '../../models/user-register-response.dto';
import { Observable } from 'rxjs';
import { UserRegisterSessionService } from './user-register-session.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:9091/auth';

  constructor(private http: HttpClient,
              private userSession: UserRegisterSessionService) { }

  register(dto: RegisterLoginDto): Observable<UserRegisterResponseDto> {
    return this.http.post<UserRegisterResponseDto>(`${this.apiUrl}/register`, dto);
  }

  authenticated(dto: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, dto, {
      responseType: 'text' as 'json'
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  logout(): void {
    localStorage.clear();
    this.userSession.clear();
  }

}
