import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuCampaignDto } from '../../models/menu-campaign.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuCampaingService {
  private readonly apiUrl = 'http://localhost:8080/donation-menus';

  constructor(private http: HttpClient) {}

    newMenuCampaign(dto: MenuCampaignDto): Observable<MenuCampaignDto>{
      return this.http.post<MenuCampaignDto>(`${this.apiUrl}/new-menu-campaign`, dto);
    }
}
