import { Component, OnInit } from '@angular/core';
import { MenuCampaignDto } from '../../../../models/menu-campaign.dto';
import { MenuCampaingService } from '../../../../core/services/menu-campaing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-menus',
  standalone:true,
  imports: [],
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.css'
})
export class ListMenusComponent implements OnInit {

  menus: MenuCampaignDto [] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  sortField = 'name';
  sortDirection = 'asc';
  nameFilter = '';
  
  constructor(private menuService: MenuCampaingService,
              private toastService: ToastrService) {}

  ngOnInit() {
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
}
