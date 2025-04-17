export enum ProductCategory {
    FOOD = 'FOOD',
    DRINK = 'DRINK',
    CLEANING_MATERIAL = 'CLEANING_MATERIAL',
    DISPOSABLE_PRODUCTS = 'DISPOSABLE_PRODUCTS'
  }
  
  export const ProductCategoryLabelMap: Record<ProductCategory, string> = {
    [ProductCategory.FOOD]: 'Alimento',
    [ProductCategory.DRINK]: 'Bebida/Suco/Refrigerante',
    [ProductCategory.CLEANING_MATERIAL]: 'Material de Limpeza',
    [ProductCategory.DISPOSABLE_PRODUCTS]: 'Produtos Descartáveis'
  };
  