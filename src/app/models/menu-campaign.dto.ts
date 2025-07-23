import { DonationItemDto } from "./donation-item.dto";

export interface MenuCampaignDto {
  id?: number; 
  name: string;
  donationItemDTOList: DonationItemDto[];
}
