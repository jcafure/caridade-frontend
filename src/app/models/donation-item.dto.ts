import { ProductDto } from "./product.dto";


export interface DonationItemDto {

    productDto: ProductDto;
    quantity: number;
    statusItem: number;
}