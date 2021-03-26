export interface Address {
  [key: string]: any;
  id: string;
  street: string;
  apartmentOrUnit?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  userShippingAddressId: string;
  isPreferredAddress: boolean;
}
