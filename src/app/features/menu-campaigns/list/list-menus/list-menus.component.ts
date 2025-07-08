import { Component, OnInit } from '@angular/core';

import { MenuCampaignDto } from '../../../../models/menu-campaign.dto';
import { MenuCampaingService } from '../../../../core/services/menu-campaing.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-menus',
  standalone:true,
  imports: [],
  templateUrl: './list-menus.component.html',

})
export class ListMenusComponent implements OnInit {

  menus: MenuCampaignDto [] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  sortField = 'mealType';
  sortDirection = 'asc';
  nameFilter = '';
  form! : FormGroup;

  
  constructor(private menuService: MenuCampaingService,
              private formBuilder: FormBuilder,
              private toastService: ToastrService) {}

  ngOnInit() {
    this.loandMenus();
  }

  loandMenus() {
      this.form = this.formBuilder.group({
      name: ['']
  });

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
}
