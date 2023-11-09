import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "firebaseConfig";

const getData = async (link: string) => {
  const data = await getDocs(collection(db, link));
  return data.docs.map((d) => d.data());
};
export { getData };
