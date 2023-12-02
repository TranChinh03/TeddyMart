import { deleteDoc, doc } from "firebase/firestore";
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
};
const deleteData = async ({ id, table }: params) => {
  let userId = window.localStorage.getItem("USER_ID");
  await deleteDoc(doc(db, `/Manager/${userId}/${table}`, id));
};
export { deleteData };
