import {
  doc,
  getDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebaseConfig";

const getData = async (link: string, order?: string) => {
  if (order) {
    const snapshot = query(collection(db, link), orderBy(order, "desc"));
    const data = await getDocs(snapshot);
    return data.docs.map((d) => d.data());
  }
  const data = await getDocs(collection(db, link));
  return data.docs.map((d) => d.data());
};
export { getData };
