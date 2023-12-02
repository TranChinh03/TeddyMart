import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { store } from "state_management/stores/store";
type params = {
  prefix: "ORD" | "VCH" | "P" | "GP" | "PD";
};
const createID = ({ prefix }: params): string => {
  return `${prefix}${Math.floor(Math.random() * 100000)}`;
};

//order
const addOrderFirebase = async (
  data: TOrder,
  userId: string,
  orderId: string
) => {
  await setDoc(doc(db, `/Manager/${userId}/Orders`, orderId), data);
};
const deleteOrderFirebase = async (orders: string[], userId: string) => {
  for (const order in orders) {
    await deleteDoc(doc(db, `/Manager/${userId}/Orders`, order));
  }
};

//voucher
const addVoucherFirebase = async (
  data: TVoucher,
  userId: string,
  voucherId: string
) => {
  await setDoc(doc(db, `/Manager/${userId}/Voucher`, voucherId), data);
};
const updateVoucherFirebase = async (
  data: TVoucher,
  userId: string,
  voucherId: string
) => {
  const voucherRef = doc(db, `/Manager/${userId}/Voucher`, voucherId);
  await updateDoc(voucherRef, {
    ...data,
  });
};
const deleteVoucherFirebase = async (vouchers: string[], userId: string) => {
  for (const voucher in vouchers) {
    await deleteDoc(doc(db, `/Manager/${userId}/Voucher`, voucher));
  }
};

//Partner
const updatePartnerFirebase = async (
  data: TPartner,
  userId: string,
  partnerId: string
) => {
  const partnerRef = doc(db, `/Manager/${userId}/Partner`, partnerId);
  await updateDoc(partnerRef, {
    ...data,
  });
};
const deletePartnerFirebase = async (partners: string[], userId: string) => {
  for (const partner in partners) {
    await deleteDoc(doc(db, `/Manager/${userId}/Partner`, partner));
  }
};

export {
  createID,
  addOrderFirebase,
  deleteOrderFirebase,
  addVoucherFirebase,
  updateVoucherFirebase,
  deleteVoucherFirebase,
  updatePartnerFirebase,
  deletePartnerFirebase,
};
