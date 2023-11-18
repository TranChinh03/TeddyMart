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

const generateReport = (data: TOrder[]) => {
  let report = new Map<string, TReport>();
  data.forEach((d) => {
    if (!report.has(new Date(d.createdAt).toDateString())) {
      report.set(new Date(d.createdAt).toDateString(), {
        date: d.createdAt,
        outcome:
          d.type === "Import" && d.status === "paid" ? d.totalPayment : 0,
        revenue:
          d.type === "Export" && d.status === "paid" ? d.totalPayment : 0,
        profit:
          d.status === "paid" ? (d.type === "Export" ? d.totalPayment : 0) : 0,
        numberOfOrder: 1,
        importOrder: d.type === "Import" ? 1 : 0,
        exportOrder: d.type === "Export" ? 1 : 0,
      });
    } else {
      let tmp = report.get(new Date(d.createdAt).toDateString());
      report.set(new Date(d.createdAt).toDateString(), {
        date: d.createdAt,
        outcome:
          d.type === "Import" && d.status === "paid"
            ? tmp.outcome + d.totalPayment
            : tmp.outcome,
        revenue:
          d.type === "Export" && d.status === "paid"
            ? tmp.revenue + d.totalPayment
            : tmp.revenue,
        profit:
          d.status === "paid"
            ? d.type === "Export"
              ? tmp.profit + d.totalPayment
              : tmp.profit - d.totalPayment
            : tmp.profit,
        numberOfOrder: tmp.numberOfOrder + 1,
        importOrder:
          d.type === "Import" ? tmp.importOrder + 1 : tmp.importOrder,
        exportOrder:
          d.type === "Export" ? tmp.exportOrder + 1 : tmp.importOrder,
      });
    }
  });
  return Array.from(report, ([_, item]) => ({ ...item }));
};

const generateProduct = (data: TOrder[], product: TProduct[]) => {
  let result = new Map<string, TReportProduct>();
  data.forEach((d: TOrder) => {
    if (d.status === "paid" && d.type === "Export") {
      d.listProduct?.forEach((item) => {
        if (!result.has(item.productId)) {
          result.set(item.productId, { ...item });
        } else {
          result.get(item.productId).quantity += item.quantity;
        }
      });
    }
  });

  result.forEach((r) => {
    let tmp = product.find((p) => p.productId === r.productId);
    r.revenue = r.quantity * tmp.sell_price;
    r.profit = r.quantity * tmp.sell_price - r.quantity * tmp.cost_price;
  });
  return Array.from(result, ([_, item]) => ({ ...item }));
};
export { getData, generateReport, generateProduct };
