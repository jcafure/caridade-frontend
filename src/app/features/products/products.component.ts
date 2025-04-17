import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';
import { RouterModule } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component'; 
import { ViewChild, ElementRef } from '@angular/core';
import { EditProductComponent } from './edit-product/edit-product.component';
import { Product } from '../../models/product.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, EditProductComponent, ConfirmDialogComponent],
  templateUrl: './products.component.html'
})

export class ProdutosComponent implements OnInit {
  products: any[] = [];
  filterForm!: FormGroup;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;
  @ViewChild('editModal') editModal!: EditProductComponent;

  private idToDelete: number | null = null;


  constructor(private produtosService: ProductsService,
              private fb: FormBuilder,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: ['']
    });
    this.loadProducts();
  }

  loadProducts() {
    const name = this.filterForm?.value?.name || '';

    this.produtosService.findAll(this.currentPage, this.pageSize, 'name', 'asc', name)
      .subscribe({
        next: (data: any) => {
          this.products = data.content;
          this.totalPages = data.totalPages;
        },
        error: (error) => {
          console.error('Erro:', error);
        }
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  filterProducts(): void {
    this.currentPage = 0;
    this.loadProducts();
  }

  removeProduct(id: number): void {
    this.idToDelete = id;
    this.confirmDialog.open(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este produto?'
    );
  }

  confirmDelete(): void {
    if (this.idToDelete !== null) {
      this.produtosService.deleteProduct(this.idToDelete).subscribe(() => {
        this.filterProducts();
        this.idToDelete = null;
      });
    }
  }

  editProduct(product: any): void {
    this.editModal.open(product);
  }

  onProductUpdated(updatedProduct: any): void {
    this.produtosService.updateProduct(updatedProduct).subscribe(() => {
      this.filterProducts(); 
    });
  }
}
