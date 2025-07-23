import { Component, OnInit } from '@angular/core';
import { MenuCampaingService } from '../../../../core/services/menu-campaing.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ProductDto } from '../../../../models/product.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { MenuCampaignDto } from '../../../../models/menu-campaign.dto';
import { Product } from '../../../../models/product.model';
import { AddProductsModalComponent } from "../../../../shared/products-dialog/add-products-modal/add-products-modal.component";

@Component({
  selector: 'app-update-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddProductsModalComponent],
  templateUrl: './update-menu.component.html',
  styleUrl: './update-menu.component.css'
})
export class UpdateMenuComponent implements OnInit {

  menuForm!: FormGroup;
  availableProducts: ProductDto [] = [];
  menuId!: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute, 
              private router:Router,
              private menuService: MenuCampaingService,
              private productService: ProductsService,
              private toastr: ToastrService){}

  ngOnInit(): void {
    this.buildForm();
    this.loadingMenu();
    this.loadProducts();

  }

   private buildForm() {
    this.menuForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      donationItemDTOList: this.formBuilder.array([])
    });
  }

  private loadProducts(){
    this.productService.findAllProductDto(0, 0, 'name', 'asc', '').subscribe({
      next: (product) => {
         this.availableProducts = product.content;
      }
    })

  }

  private loadingMenu() {
    
    this.menuId = Number(this.route.snapshot.paramMap.get('id'));
    this.menuService.findMenuById(this.menuId).subscribe({
      next: (menu: MenuCampaignDto) => {
        this.menuForm.patchValue({
            id:menu.id,
            name: menu.name
        });

        menu.donationItemDTOList.forEach(item => {
            const itemGroup = this.formBuilder.group({
              productDto: [item.productDto],
              quantity: [item.quantity],
              statusItem: [item.statusItem]
            });
           this.donationItems.push(itemGroup);

        })
      }
    })
  }
  
  get donationItems(): FormArray {
    return this.menuForm.get('donationItemDTOList') as FormArray;
  }

  addToFormArray(item: any): void {
  const itemForm = this.formBuilder.group({
    productDto: [item.productDTO],
    quantity: [item.quantity, [Validators.required, Validators.min(1)]],
    statusItem: ['Aguardando Doação', Validators.required]
  });

  this.donationItems.push(itemForm);
}

  goBack(): void {
     this.router.navigate(['/menu-campaigns/menus']);
  }
}
