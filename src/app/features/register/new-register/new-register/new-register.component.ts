import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterLoginDto } from '../../../../models/register-login.dto';
import { ToastrService } from 'ngx-toastr';
import { UserRegisterSessionService } from '../../../../core/services/user-register-session.service';
import { UserRegisterResponseDto } from '../../../../models/user-register-response.dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent],
  templateUrl: './new-register.component.html',
  styleUrl: './new-register.component.css'
})
export class NewRegisterComponent implements OnInit {

  form!: FormGroup;
  
  constructor(private fb: FormBuilder, 
              private router: Router, 
              private routes: RouterModule,
              private authService: AuthService,
              private userRegisterSession: UserRegisterSessionService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  hasError(field: string, error: string) {
    return this.form.get(field)?.hasError(error) && this.form.get(field)?.touched;
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if(this.form.invalid){
      return;
    }

    const dto: RegisterLoginDto = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService.register(dto).subscribe({
      next: (response: UserRegisterResponseDto) => {
        this.userRegisterSession.setUserData(response);
        this.router.navigate(['/donor/new-profile']);
      }
    });

  }

}
