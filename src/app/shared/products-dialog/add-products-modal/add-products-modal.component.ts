import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  @ViewChild('addProductModal', { static: false }) modalElementRef!: ElementRef;

  addProductForm!: FormGroup;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
  private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addProduct(): void {
    debugger
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
  }
  
    const item = this.addProductForm.value;
    const selectedProduct = this.availableProducts.find(
       p => p.id === + item.productId);

    this.productAdded.emit({
      productDTO: selectedProduct,
      quantity: item.quantity,
      statusItem: item.statusItem
  });

  this.addProductForm.reset({quantity: 1})

  this.closeModal();
  
}

async closeModal(): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
   const { Modal } = await import('bootstrap');
   const modalInstance = Modal.getInstance(this.modalElementRef.nativeElement)
      || new Modal(this.modalElementRef.nativeElement);
    modalInstance.hide();
  }

}
}


