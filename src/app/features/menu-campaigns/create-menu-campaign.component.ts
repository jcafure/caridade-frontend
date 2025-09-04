import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ProductDto } from '../../models/product.dto';
import { MenuCampaingService } from '../../core/services/menu-campaing.service';
import { ProductsService } from '../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { MenuCampaignDto } from '../../models/menu-campaign.dto';
import { StatusDonationItem } from '../../core/constant/status-donation-item';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-menu-campaign',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-menu-campaign.component.html',
  styleUrl: './create-menu-campaign.component.css'
})
export class CreateMenuCampaignComponent implements OnInit {

  form!: FormGroup;
  formItem!: FormGroup;
  products: ProductDto[] = [];

  constructor(private formBuilder: FormBuilder, 
    private menuCampaignService: MenuCampaingService,
    private productService: ProductsService,
    private toastr: ToastrService,
    private router: Router){}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
       donationItemDTOList: this.formBuilder.array([])
    });

    this.formItem = this.formBuilder.group({
    productDTO: [null, Validators.required],
    quantity: [0, [Validators.required, Validators.min(0.1)]]

  });

    this.loadProducts();
  }

  loadProducts(): void {
   const page = 0;
   const size = 300;
   const sortField = 'name';
   const sortDirection = 'asc';
   const name = ''

    this.productService.findAllProductDto(page, size, sortField, sortDirection, name)
    .subscribe({
      next: response  => this.products = response.content,
      error: () => alert('Erro ao carregar produtos.')
    })
  }

  get items(): FormArray {
  return this.form.get('donationItemDTOList') as FormArray;
}

addItem(): void {
  if (this.formItem.invalid) return;

  const item = this.formItem.value;

  if (this.isItemDuplicated(item.productDTO.id)) {
  this.toastr.warning('Este produto já foi adicionado!');
   this.formItem.reset();
    return;
  }

  this.items.push(this.formBuilder.group({
    productDTO: item.productDTO,
    quantity: item.quantity
  }));
  
  this.formItem.reset();
}

private isItemDuplicated(productId: number): boolean {
  return this.items.controls.some(control => {
    const existing = control.get('productDTO')?.value;
    return existing?.id === productId;
  });
}

removeItem(index: number): void {
  this.items.removeAt(index);
}

onSubmit(): void{
  if(this.form.invalid) {
     this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.value;
  const dto: MenuCampaignDto = {
    name: formValue.name,
    donationItemDTOList: formValue.donationItemDTOList.map((item: any) => ({
      productDto: item.productDTO,
      quantity: item.quantity,
      statusItem: StatusDonationItem.FOR_DONATED,
    }))
    
  };
  
  this.menuCampaignService.newMenuCampaign(dto).subscribe({
    next: () => {
      this.toastr.success('Menu ' + dto.name + ' criado com sucesso!');
      this.form.reset();
      this.items.clear();
      this.router.navigate(['/menu-campaigns/menus'])
    },
    error: () => {
      this.toastr.error('Erro ao criar menu da campanha.');
    }
  });
}
}
 