import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { MenuCampaignDto } from '../../../../models/menu-campaign.dto';
import { MenuCampaingService } from '../../../../core/services/menu-campaing.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-menus',
  standalone:true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './list-menus.component.html',

})
export class ListMenusComponent implements OnInit {

  menus: any [] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  sortField = 'mealType';
  sortDirection = 'asc';
  nameFilter = '';
  form! : FormGroup;

  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;
  private idToDelete: number | null = null;

  constructor(private menuService: MenuCampaingService,
              private formBuilder: FormBuilder,
              private toastService: ToastrService) {}

  ngOnInit() {
     this.form = this.formBuilder.group({
      mealType: ['']
    });
    this.loandMenus();
  }

  loandMenus() {
      
    this.menuService.findAllMenusDto(this.currentPage, this.pageSize, this.sortField, 
      this.sortDirection, this.nameFilter).subscribe({
        next: (data: any) => {
          this.menus = data.content
          this.totalPages = data.totalPages
        }, error: (err: any) => {
          this.toastService.error(err);
        }
      })       
  }

  removeMenu(id: number): void {
    this.idToDelete = id;
    this.confirmDialog.open(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este menu?'
    );
  }

   confirmDelete(): void {
    if (this.idToDelete !== null) {
      this.menuService.deleteMenu(this.idToDelete).subscribe(() => {
      this.filterMenus();
      this.idToDelete = null;
      });
    }
  }

   filterMenus(): void {
    this.currentPage = 0;
    this.loandMenus();
  }
}
