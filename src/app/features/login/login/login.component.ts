import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginDto } from '../../../models/register-login.dto';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

import { UserRegisterResponseDto } from '../../../models/user-register-response.dto';
import { UserRegisterSessionService } from '../../../core/services/user-register-session.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private userSession: UserRegisterSessionService,
              private router: Router,
              private toastr: ToastrService){}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group(({
       email: ['', Validators.required],
       password: ['', Validators.required]
    }))
   
  }

  onSubmit(){
    if(this.formLogin.invalid){
        return;
      }
  
    const dto: LoginDto = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };
  
    this.authService.authenticated(dto).subscribe({
      next: (token: string) => {
        this.authService.saveToken(token);
        const decodedToken = jwtDecode<UserRegisterResponseDto>(token);
        this.userSession.setUserData(decodedToken);
        this.router.navigate(['/home']);
      },
        error: (err) => {
          console.error('Erro ao autenticar:', err);
          this.toastr.error('Erro ao autenticar. Contate o suporte do sistema.');
        }
      });
  }

}
