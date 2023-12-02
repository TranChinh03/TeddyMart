import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from "firebaseConfig";

type params = {
  id: string;
  table:
    | "Voucher"
    | "Partner"
    | "Group_Product"
    | "Product"
    | "Orders"
    | "Warehouse";

  data: TVoucher | TPartner | TGroupProduct | TProduct | TOrder |TWarehouse;
};
const addData = async ({ data, table, id }: params) => {
  let userId = window.localStorage.getItem("USER_ID");
  await setDoc(doc(db, `/Manager/${userId}/${table}`, id), data).then(() => {
    console.log(">>>>>>>>>> Add Data >>>>>>>>>>");
  });
};
export { addData };
