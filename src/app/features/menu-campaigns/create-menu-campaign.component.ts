import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ProductDto } from '../../models/product.dto';
import { MenuCampaingService } from '../../core/services/menu-campaing.service';
import { ProductsService } from '../../core/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-menu-campaign',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-menu-campaign.component.html',
  styleUrl: './create-menu-campaign.component.css'
})
export class CreateMenuCampaignComponent implements OnInit {

  form!: FormGroup;
  formItem!: FormGroup;
  products: ProductDto[] = [];

  constructor(private formBuilder: FormBuilder, 
    private menuCampaignService: MenuCampaingService,
    private productService: ProductsService ){}

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
   alert('Este produto já foi adicionado.');
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

}
 