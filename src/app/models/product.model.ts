export interface Product {
    id: number;
    name: string;
    unitOfMeasure: string;
    categoryProduct: string;
  }

  export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }  