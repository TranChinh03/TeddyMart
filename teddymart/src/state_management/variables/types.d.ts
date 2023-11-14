declare type TPartner = {
  partnerId: string;
  partnerName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  note?: string;
  gender?: "female" | "male";
  certificate?: string;
  type?: "Customer" | "Supplier";
  totalBuyAmount?: number;
  debt?: number;
};

declare type TManager = {
  userId: string;
  shopName: string;
  userName: string;
  photoUrl?: string;
  address?: string;
  phoneNumber: string;
  email: string;
};

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
  groupName: string;
  image?: string;
  cost_price: number;
  sell_price: number;
  VAT?: number;
  note?: string;
};

declare type TGroupProduct = {
  groupId: string;
  groupName: string;
  note?: string;
};

declare type TWarehouse = {
  warehouseId: string;
  warehouseName: string;
  address?: string;
  listProduct: {
    productId: string;
    productName: string;
    quantity: number;
  };
  count: number;
};

declare type TOrder = {
  orderId: string;
  partnerId: string;
  partnerName: string;
  createdAt?: Date;
  payment: number;
  discount?: number;
  totalPayment: number;
  status?: "paid" | "unpaid";
  debt?: number;
  listProduct: {
    productId: string;
    productName: string;
    quantity: number;
  };
  note?: string;
  voucherId?: string;
  seller: string;
  receiver: string;
  type: "Import" | "Export";
};

declare type TReport = {
  revenue: number;
  outcome: number;
  totalImport: number;
  totalExport: number;
};

declare type D = {
  from: Date;
  to: Date;
};
