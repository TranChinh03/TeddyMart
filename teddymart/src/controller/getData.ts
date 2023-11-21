import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
  // by Date
  let report = new Map<string, TReport>();
  let reportByMonth = new Map<string, TReport>();
  let reportByYear = new Map<string, TReport>();
  data.forEach((d) => {
    if (!report.has(new Date(d.createdAt).toDateString())) {
      report.set(new Date(d.createdAt).toDateString(), {
        date: d.createdAt,
        outcome:
          d.type === "Import" && d.status === "paid" ? d.totalPayment : 0,
        revenue:
          d.type === "Export" && d.status === "paid" ? d.totalPayment : 0,
        numberOfOrder: 1,
        importOrder: d.type === "Import" ? 1 : 0,
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
        numberOfOrder: tmp.numberOfOrder + 1,
        importOrder:
          d.type === "Import" ? tmp.importOrder + 1 : tmp.importOrder,
      });
    }

    // by Month

    if (
      !reportByMonth.has(
        `${new Date(d.createdAt).getMonth()}/${new Date(
          d.createdAt
        ).getFullYear()}`
      )
    ) {
      reportByMonth.set(
        `${new Date(d.createdAt).getMonth()}/${new Date(
          d.createdAt
        ).getFullYear()}`,
        {
          date: d.createdAt,
          outcome:
            d.type === "Import" && d.status === "paid" ? d.totalPayment : 0,
          revenue:
            d.type === "Export" && d.status === "paid" ? d.totalPayment : 0,
          numberOfOrder: 1,
          importOrder: d.type === "Import" ? 1 : 0,
        }
      );
    } else {
      let tmp = reportByMonth.get(
        `${new Date(d.createdAt).getMonth()}/${new Date(
          d.createdAt
        ).getFullYear()}`
      );
      reportByMonth.set(
        `${new Date(d.createdAt).getMonth()}/${new Date(
          d.createdAt
        ).getFullYear()}`,
        {
          date: d.createdAt,
          outcome:
            d.type === "Import" && d.status === "paid"
              ? tmp.outcome + d.totalPayment
              : tmp.outcome,
          revenue:
            d.type === "Export" && d.status === "paid"
              ? tmp.revenue + d.totalPayment
              : tmp.revenue,
          numberOfOrder: tmp.numberOfOrder + 1,
          importOrder:
            d.type === "Import" ? tmp.importOrder + 1 : tmp.importOrder,
        }
      );
    }

    // by Year
    if (!reportByYear.has(`${new Date(d.createdAt).getFullYear()}`)) {
      reportByYear.set(`${new Date(d.createdAt).getFullYear()}`, {
        date: d.createdAt,
        outcome:
          d.type === "Import" && d.status === "paid" ? d.totalPayment : 0,
        revenue:
          d.type === "Export" && d.status === "paid" ? d.totalPayment : 0,
        numberOfOrder: 1,
        importOrder: d.type === "Import" ? 1 : 0,
      });
    } else {
      let tmp = reportByYear.get(`${new Date(d.createdAt).getFullYear()}`);
      reportByYear.set(`${new Date(d.createdAt).getFullYear()}`, {
        date: d.createdAt,
        outcome:
          d.type === "Import" && d.status === "paid"
            ? tmp.outcome + d.totalPayment
            : tmp.outcome,
        revenue:
          d.type === "Export" && d.status === "paid"
            ? tmp.revenue + d.totalPayment
            : tmp.revenue,
        numberOfOrder: tmp.numberOfOrder + 1,
        importOrder:
          d.type === "Import" ? tmp.importOrder + 1 : tmp.importOrder,
      });
    }
  });

  return {
    byDate: Array.from(report, ([_, item]) => ({
      ...item,
      profit: item.revenue - item.outcome,
      exportOrder: item.numberOfOrder - item.importOrder,
    })),

    byMonth: Array.from(reportByMonth, ([_, item]) => ({
      ...item,
      profit: item.revenue - item.outcome,
      exportOrder: item.numberOfOrder - item.importOrder,
    })),

    byYear: Array.from(reportByYear, ([_, item]) => ({
      ...item,
      profit: item.revenue - item.outcome,
      exportOrder: item.numberOfOrder - item.importOrder,
    })),
  };
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
