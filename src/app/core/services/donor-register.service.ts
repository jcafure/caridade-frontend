import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonorRegisterDto } from '../../models/donor-register.dto';
import { Observable } from 'rxjs';
import { DonorRegisterResponseDto } from '../../models/donor-register-response.dto';

@Injectable({
  providedIn: 'root'
})
export class DonorRegisterService {
  private readonly apiUrl = 'http://localhost:8080/donors';

  constructor(private http: HttpClient) { }

  newDonor(dto: DonorRegisterDto): Observable<DonorRegisterResponseDto>{
    return this.http.post<DonorRegisterResponseDto>(`${this.apiUrl}/new-donor`, dto);
  }
  
}
