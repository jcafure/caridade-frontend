import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UnitOfMeasure } from '../../../core/constant/unit-of-measure.enum';
import { ProductCategory } from '../../../core/constant/product-category.enum';
import { ProductCategoryLabelMap } from '../../../core/constant/product-category.enum';
import { UnitOfMeasureLabelMap } from '../../../core/constant/unit-of-measure.enum';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../core/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-product',
  standalone: true,
  templateUrl: './new-product.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class NewProductComponent implements OnInit {

  productForm!: FormGroup;
  productCategories = Object.values(ProductCategory);
  unitOfMeasures = Object.values(UnitOfMeasure);
  productCategoryLabels = ProductCategoryLabelMap;
  unitOfMeasureLabels = UnitOfMeasureLabelMap;
  isSubmitting = false;

  constructor(private fb: FormBuilder,
              private router: Router, 
              private productService: ProductsService,
              private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryProduct: ['', Validators.required],
      unitOfMeasure: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const productDto: Product = this.productForm.value;
    
    this.productService.create(productDto).subscribe({
      next: ()=> {
        this.toastr.success('Produto salvo com sucesso!');
        this.productForm.reset();
        this.productForm.markAsPristine();
        this.productForm.markAsUntouched();
      },
      error: (err) => {
        if (err.status === 409) {
          this.toastr.error(err.error?.message || 'Produto já existe.');
          this.isSubmitting = false;
        } else {
          this.toastr.error('Erro inesperado. Tente novamente.');
        }
      },
        complete: () => {
          this.isSubmitting = false;
        }
    });
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }
}
