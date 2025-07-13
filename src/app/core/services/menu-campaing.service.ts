import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuCampaignDto } from '../../models/menu-campaign.dto';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MenuCampaingService {
  private readonly apiUrl = 'http://localhost:8080/donation-menus';

  constructor(private http: HttpClient) {}

    newMenuCampaign(dto: MenuCampaignDto): Observable<MenuCampaignDto>{
      return this.http.post<MenuCampaignDto>(`${this.apiUrl}/new-menu-campaign`, dto);
    }

    findAllMenusDto(
    page: number,
    size: number,
    sortField: string,
    sortDirection: string,
    name: string
  ): Observable<PaginatedResponse<MenuCampaignDto>> {
    
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', `${sortField},${sortDirection}`);
  
    if (name.trim()) {
      params = params.set('name', name.trim());
    }
  
    return this.http.get<PaginatedResponse<MenuCampaignDto>>(`${this.apiUrl}/all`, { params });
  }

   deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-menu/${id}`);
  }
}
