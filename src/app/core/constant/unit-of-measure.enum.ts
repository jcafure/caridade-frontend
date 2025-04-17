export enum UnitOfMeasure {
    KG = 'KG',
    LITROS = 'LITROS',
    UN = 'UN',
    GR = 'GR'
  }
  
  export const UnitOfMeasureLabelMap: Record<UnitOfMeasure, string> = {
    [UnitOfMeasure.KG]: 'Kilogramas',
    [UnitOfMeasure.LITROS]: 'Litros',
    [UnitOfMeasure.UN]: 'Unidade',
    [UnitOfMeasure.GR]: 'Gramas'
  };
  