import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

import { UnitOfMeasure } from '../../../core/constant/unit-of-measure.enum';
import { ProductCategory } from '../../../core/constant/product-category.enum';
import { UnitOfMeasureLabelMap } from '../../../core/constant/unit-of-measure.enum';
import { ProductCategoryLabelMap } from '../../../core/constant/product-category.enum';


declare var bootstrap: any;

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, AfterViewInit {

  @ViewChild('editModal') modalElement!: ElementRef;
  @Output() saved = new EventEmitter<any>();
  form!: FormGroup;
  modal: any;
  productCategories = Object.values(ProductCategory);
  unitOfMeasures = Object.values(UnitOfMeasure);
  productCategoryLabels = ProductCategoryLabelMap;
  unitOfMeasureLabels = UnitOfMeasureLabelMap;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: [''],
      categoryProduct: [''],
      unitOfMeasure: ['']
    });
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      import('bootstrap').then(({ Modal }) => {
        this.modal = new Modal(this.modalElement.nativeElement);
      });
    }
  }

  open(product: any): void {
    const fixedProduct: any = {
      id: product.id,
      name: product.name,
      categoryProduct: this.getEnumKeyByLabel(this.productCategoryLabels, product.categoryProduct) as ProductCategory,
      unitOfMeasure: this.getEnumKeyByLabel(this.unitOfMeasureLabels, product.unitOfMeasure) as UnitOfMeasure
    };

    this.form.reset();
    this.form.patchValue(fixedProduct);
    this.modal.show();
  }

  save(): void {
    if (this.form.valid) {
      const rawValue = this.form.value;

      const formattedProduct = {
        ...rawValue,
        categoryProduct: this.productCategoryLabels[rawValue.categoryProduct as ProductCategory],
        unitOfMeasure: this.unitOfMeasureLabels[rawValue.unitOfMeasure as UnitOfMeasure]
      };
    
      this.saved.emit(formattedProduct);
      this.modal.hide();
    }
  }

  private getEnumKeyByLabel(labelMap: Record<string, string>, label: string): string {
    return Object.keys(labelMap).find(key => labelMap[key] === label) || '';
  }
}
