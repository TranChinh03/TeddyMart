declare type TPartner = {
  partnerId: string;
  partnerName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  notes?: string;
  gender?: "female" | "male";
};

declare type TVoucher = {
  voucherId: string;
  voucherName: string;
  discountAmount: number;
  expirationDate: Date;
  publicDate: Date;
};

declare type Product = {
  productId: string;
  productName: string;
  groupId: string;
  image?: string;
  cost_price: number;
  retail_price: number;
  VAT?: number;
  note?: string;
  quantity?: number;
  status: boolean;
};
declare type TWarehouse = {
  warehouseId: string;
  warehouseName: string;
  address?: string;
  products?: Product[];
  numberOfProducts: number;
};
