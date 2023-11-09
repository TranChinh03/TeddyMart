import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { PARTNER } from "./addDbPartnerTable";
import { PRODUCT } from "./addDbProduct";
import { VOUCHER } from "./addDbVoucherTable";
import { db } from "firebaseConfig";

const ORDERS = [
  { orderId: "ORD001", note: "Import order from supplier A", type: "Import" },
  { orderId: "ORD002", note: "Export order to customer B", type: "Export" },
  { orderId: "ORD003", note: "Importing raw materials", type: "Import" },
  { orderId: "ORD004", note: "Exporting finished products", type: "Export" },
  {
    orderId: "ORD005",
    note: "Import of electronic components",
    type: "Import",
  },
  {
    orderId: "ORD006",
    note: "Export to international client",
    type: "Export",
  },
  { orderId: "ORD007", note: "Bulk import from overseas", type: "Import" },
  {
    orderId: "ORD008",
    note: "Export to regional distributors",
    type: "Export",
  },
  { orderId: "ORD009", note: "Importing machinery parts", type: "Import" },
  {
    orderId: "ORD010",
    note: "Exporting supplies to retail stores",
    type: "Export",
  },
  { orderId: "ORD011", note: "Import order from supplier C", type: "Import" },
  { orderId: "ORD012", note: "Export order to customer D", type: "Export" },
  {
    orderId: "ORD013",
    note: "Importing automotive components",
    type: "Import",
  },
  {
    orderId: "ORD014",
    note: "Exporting to international markets",
    type: "Export",
  },
  {
    orderId: "ORD015",
    note: "Import of technological equipment",
    type: "Import",
  },
  { orderId: "ORD016", note: "Export to global partners", type: "Export" },
  { orderId: "ORD017", note: "Importing medical supplies", type: "Import" },
  {
    orderId: "ORD018",
    note: "Export to neighboring countries",
    type: "Export",
  },
  {
    orderId: "ORD019",
    note: "Importing textiles and fabrics",
    type: "Import",
  },
  { orderId: "ORD020", note: "Exporting fashion products", type: "Export" },
];
const findPartner = (orderType) => {
  let flag = -1;
  if (orderType === "Export") {
    while (flag === -1) {
      const index = Math.floor(Math.random() * PARTNER.length);
      if (PARTNER[index].type === "Customer") {
        flag = 1;
        return {
          partnerId: PARTNER[index].partnerId,
          partnerName: PARTNER[index].partnerName,
        };
      }
    }
  } else {
    while (flag === -1) {
      const index = Math.floor(Math.random() * PARTNER.length);
      if (PARTNER[index].type === "Supplier") {
        flag = 1;
        return {
          partnerId: PARTNER[index].partnerId,
          partnerName: PARTNER[index].partnerName,
        };
      }
    }
  }
};
const findVoucher = (createdAt) => {
  let flag = -1;
  let voucher = null;
  while (flag === -1) {
    const index = Math.floor(Math.random() * VOUCHER.length);
    console.log(
      "expire",
      new Date(VOUCHER[index].expirationDate).getTime() >= createdAt,
      "public",
      new Date(VOUCHER[index].publicDate).getTime() <= createdAt
    );
    if (
      new Date(VOUCHER[index].expirationDate).getTime() >= createdAt &&
      new Date(VOUCHER[index].publicDate).getTime() <= createdAt
    ) {
      flag = 1;
      voucher = VOUCHER[index];
      return voucher;
    }
  }

  if (voucher) return voucher;
};
const getListProduct = (type) => {
  let flag = -1;
  console.log("type", type);
  let numberProduct = Math.floor(Math.random() * 3) + 1;
  let products = [];
  let sum = 0;
  console.log(numberProduct);
  while (numberProduct > products.length) {
    const index = Math.floor(Math.random() * PRODUCT.length);
    console.log("Index", index);
    console.log("product", PRODUCT[index]);
    const findProduct = products.find(
      (value, _) => value.productId === PRODUCT[index].productId
    );
    console.log("Find", findProduct);
    if (findProduct === undefined) {
      let quantity = Math.floor(Math.random() * PRODUCT[index].quantity + 1);
      products.push({
        productId: PRODUCT[index].productId,
        productName: PRODUCT[index].productName,
        quantity: quantity,
      });
      if (type === "Export") {
        sum += PRODUCT[index].sell_price * (1 + PRODUCT[index].VAT) * quantity;
        console.log("SUM", sum);
      } else {
        sum += PRODUCT[index].cost_price * (1 + PRODUCT[index].VAT) * quantity;
        console.log("SUM", sum);
      }
    }
    if (products.length === numberProduct) {
      console.log("Tong", sum);
      return {
        listProduct: products,
        sum: sum.toFixed(),
      };
    }
  }
};
export const addDbOrder = () => {
  const STATUS = ["paid", "unpaid"];
  ORDERS.map(async (order) => {
    try {
      const month = 10;
      const date = Math.floor(Math.random() * 15 + 1);
      const createdAt = new Date(
        `2023-${"0" + month}-${date > 10 ? date : "0" + date}`
      );
      console.log(
        createdAt.getTime(),
        createdAt,
        `2023-${month}-${date > 10 ? date : "0" + date}`
      );
      const voucher = findVoucher(createdAt.getTime());
      const partner = findPartner(order.type);
      const listProduct = getListProduct(order.type);
      const totalDiscount =
        order.type === "Export" ? voucher.discountAmount : 0;
      const totalPayment = listProduct.sum - totalDiscount;
      console.log("Total Payment: ", totalPayment);

      console.log("list product", listProduct);
      console.log("voucher", voucher);
      console.log("find partnet", findPartner());
      const status = STATUS[Math.floor(Math.random() * 2)];
      const debt = status === "paid" ? 0 : (Math.random() * 100 + 10).toFixed();
      let data = {
        ...order,
        partnerId: partner.partnerId,
        partnerName: partner.partnerName,
        createdAt: createdAt.toISOString(),
        payment: +listProduct.sum,
        discount: totalDiscount,
        totalPayment: totalPayment,
        listProduct: listProduct.listProduct,
        debt: +debt,
        status: status,
      };
      if (order.type === "Export") {
        data["voucherId"] = voucher.voucherId;
        data["seller"] = "Teddy Mart";
      }
      if (order.type === "Import") {
        data["receiver"] = "Teddy Mart";
      }
      console.log("data", data);
      await setDoc(doc(db, "/Manager/M001/Orders", data.orderId), data);
      await updateDoc(doc(db, "/Manager/M001/Partner", partner.partnerId), {
        debt: increment(debt),
        totalBuyAmount: increment(totalPayment),
      });
    } catch (error) {
      console.log(error);
    }
  });
  console.log("ok");
};
