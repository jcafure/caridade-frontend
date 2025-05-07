export interface DonorRegisterDto {
    name: string;
    email: string;
    phone: string;
    externalId?: number;
    addressDTOS: AddressDTO[];
  }
  
  export interface AddressDTO {
    id?: number;
    cep: string;
    street: string;
    number: string;
    complement: string;
    typeAddress: string;
    city: CityDTO;
  }
  
  export interface CityDTO {
    name: string;
    state: string;
  }