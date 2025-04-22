export enum TypeAddress {
    LOCAL_JOB = 'LOCAL_JOB',
    HOME = 'HOME'
  }

   export const TypeAddressLabelMap: Record<TypeAddress, string> = {
      [TypeAddress.LOCAL_JOB]: 'Local de trabalho',
      [TypeAddress.HOME]: 'Residência'
      
    };