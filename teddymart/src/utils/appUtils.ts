import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { store } from "state_management/stores/store";

const createOrderID = () => {
  return "ORD" + Math.floor(Math.random() * 100000);
};
const createVoucherID = () => {
  return "VCH" + Math.floor(Math.random() * 100000);
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
export {
  createOrderID,
  createVoucherID,
  addOrderFirebase,
  deleteOrderFirebase,
  addVoucherFirebase,
  updateVoucherFirebase,
  deleteVoucherFirebase,
};
