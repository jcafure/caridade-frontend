import { Component, OnInit } from '@angular/core';
import { UserRegisterSessionService } from '../../../core/services/user-register-session.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { TypeAddress, TypeAddressLabelMap } from '../../../core/constant/type-address.enum';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DonorRegisterService } from '../../../core/services/donor-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-donor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-donor.component.html',
  styleUrl: './new-donor.component.css'
})
export class NewDonorComponent implements OnInit{

  formDonor!: FormGroup;
  typeAddressOptions = Object.values(TypeAddress);
  typeAddressLabelMap = TypeAddressLabelMap;
  
  constructor(private userSession: UserRegisterSessionService,
              private formBuilder: FormBuilder,
              private router: Router,
              private donorService: DonorRegisterService,
              private toastr: ToastrService){}

  ngOnInit(): void {
    const email = this.userSession.getUserEmail();
    this.formDonor = this.formBuilder.group({
      name: [''],
      email: [{value: email, disabled: true}],
      phone: [''],
      addressDTOS: this.formBuilder.array([this.createAddressGroup()])
    });
  }

  createAddressGroup(): FormGroup {
    return this.formBuilder.group({
      cep: [''],
      street: [''],
      number: [''],
      complement: [''],
      typeAddress: [''],
      state: [''],
      city: this.formBuilder.group({
        name: ['']
      })
    });
  }

  getAddressLabel(type: TypeAddress | null | undefined): string {
    return type ? TypeAddressLabelMap[type] || '' : '';
  }
  
  get addressControls() {
    return this.formDonor.get('addressDTOS') as FormArray;
  }

  addAddress() {
    this.addressControls.push(this.createAddressGroup());
  }

  onSubmit() {
    if (this.formDonor.invalid) {
      this.markAllAsTouched();
      return;
    }

    const formValue = this.formDonor.getRawValue(); 
    const externalId = this.userSession.getExternalId();

    const donorDto = {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      externalId: externalId, 
      addressDTOS: this.formDonor.value.addressDTOS.map((addr: any) => ({
        cep: addr.cep,
        street: addr.street,
        number: addr.number,
        complement: addr.complement,
        typeAddress: addr.typeAddress,
        city: {
          name: addr.city.name,
        },
      }))
    };

    this.donorService.newDonor(donorDto).subscribe({
      next: (res) => {
        if(res.success){
          this.toastr.success(`Doador "${res.name}" cadastrado com sucesso!`, 'success');
          setTimeout(() => this.router.navigate(['/login']), 3000)
        }
      },
      error: (error) => {
        console.error('Erro ao cadastrar doador', error);
        this.toastr.error(' Erro ao cadastrar o doador. Verifique os dados e tente novamente.', 'error');
      }
    })

  }

  private markAllAsTouched() {
    Object.values(this.formDonor.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        Object.values(control.controls).forEach(subControl => {
          subControl.markAsTouched();
        });
      } else {
        control.markAsTouched();
      }
    });
  }

  removeAddress(index: number) {
    this.addressControls.removeAt(index);
  }
}
