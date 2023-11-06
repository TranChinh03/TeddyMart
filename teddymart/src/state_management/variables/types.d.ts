declare type TPartner = {
  partnerId: string;
  partnerName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  notes?: string;
  gender?: "female" | "male";
};

declare type TManager = {
  managerId: string;
  shopName: string;
  field: string;
  password: string;
  userName: string;
  photoUrl?: string;
  address?: string;
  phoneNumber: string;
  email: string;
  gender?: "female" | "male";
}

declare type TVoucher = {
  voucherId: string;
  voucherName: string;
  discountAmount: number;
  expirationDate: Date;
  publicDate: Date;
};

declare type TProduct = {
  productId: string;
  productName: string;
  groupId: string;
  image?: string;
  cost_price: number;
  retail_price: number;
  VAT?  : number;
  note?: string;
  quantity?: number;
  status: boolean;
};

declare type TGroupProduct = {
  groupId: string;
  groupName: string;
  quantity: number;
  revenue: number;
  products?: TProduct[];
  notes?: string;
}

declare type TWarehouse = {
  warehouseId: string;
  warehouseName: string;
  address?: string;
  products?: TProduct[];
  numberOfProducts: number;
};

declare type TOrder = {
  orderId: string;
  UserId: string;
  partnerId: string;
  totalMoney: number;
  listProducts: TProduct[];
  totalDiscount: number;
  deliveryCost: number;
  warehouse: string;
  paymentStatus: string;
  voucherId?: string;
  notes?: string;
}