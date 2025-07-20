import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDto } from '../../../models/product.dto';

@Component({
  selector: 'app-add-products-modal',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-products-modal.component.html',
  styleUrl: './add-products-modal.component.css'
})
export class AddProductsModalComponent implements OnInit {

  @Input() availableProducts: ProductDto[] = [];
  @Output() productAdded = new EventEmitter<any>();
  addProductForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addProduct(): void {
  const selectedProductId = this.addProductForm.value.productId;
  const selectedProduct = this.availableProducts.find(p => p.id === selectedProductId);

  if (!selectedProduct) return;
  }

}
