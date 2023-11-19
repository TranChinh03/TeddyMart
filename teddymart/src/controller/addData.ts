import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from "firebaseConfig";
const addVoucher = async (voucher: TVoucher) => {
  let id = window.localStorage.getItem("USER_ID");
  await addDoc(collection(db, `/Manager/${id}/Voucher`), voucher)
    .then(() => {
      console.log(">>>>>>>>>> Add Voucher >>>>>>>>");
    })
    .catch((e) => console.log(e));
};
const addPartner = async (partner: TPartner) => {
  let id = window.localStorage.getItem("USER_ID");
  await addDoc(collection(db, `/Manager/${id}/Partner`), partner).then(() => {
    console.log(">>>>>>>>>>>>> Add Partner >>>>>>>");
  });
};
type params = {
  id: string;
  table:
    | "Voucher"
    | "Partner"
    | "Group_Product"
    | "Product"
    | "Orders"
    | "Warehouse";

  data: TVoucher | TPartner | TGroupProduct | TProduct | TOrder;
};
const addData = async ({ data, table, id }: params) => {
  let userId = window.localStorage.getItem("USER_ID");
  await setDoc(doc(db, `/Manager/${userId}/${table}`, id), data).then(() => {
    console.log(">>>>>>>>>> Add Data >>>>>>>>>>");
  });
};
export { addVoucher, addPartner, addData };
