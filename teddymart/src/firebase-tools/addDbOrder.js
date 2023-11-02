import { addDoc, collection } from "firebase/firestore";
import { PARTNER } from "./addDbPartnerTable";
import { PRODUCT } from "./addDbProduct";
import { VOUCHER } from "./addDbVoucherTable";
import { db } from "firebaseConfig";
import { useState } from "react";

const ORDERS = [
  { orderId: "ORD001", notes: "Import order from supplier A", type: "Import" },
  { orderId: "ORD002", notes: "Export order to customer B", type: "Export" },
  { orderId: "ORD003", notes: "Importing raw materials", type: "Import" },
  { orderId: "ORD004", notes: "Exporting finished products", type: "Export" },
  {
    orderId: "ORD005",
    notes: "Import of electronic components",
    type: "Import",
  },
  {
    orderId: "ORD006",
    notes: "Export to international client",
    type: "Export",
  },
  { orderId: "ORD007", notes: "Bulk import from overseas", type: "Import" },
  {
    orderId: "ORD008",
    notes: "Export to regional distributors",
    type: "Export",
  },
  { orderId: "ORD009", notes: "Importing machinery parts", type: "Import" },
  {
    orderId: "ORD010",
    notes: "Exporting supplies to retail stores",
    type: "Export",
  },
  { orderId: "ORD011", notes: "Import order from supplier C", type: "Import" },
  { orderId: "ORD012", notes: "Export order to customer D", type: "Export" },
  {
    orderId: "ORD013",
    notes: "Importing automotive components",
    type: "Import",
  },
  {
    orderId: "ORD014",
    notes: "Exporting to international markets",
    type: "Export",
  },
  {
    orderId: "ORD015",
    notes: "Import of technological equipment",
    type: "Import",
  },
  { orderId: "ORD016", notes: "Export to global partners", type: "Export" },
  { orderId: "ORD017", notes: "Importing medical supplies", type: "Import" },
  {
    orderId: "ORD018",
    notes: "Export to neighboring countries",
    type: "Export",
  },
  {
    orderId: "ORD019",
    notes: "Importing textiles and fabrics",
    type: "Import",
  },
  { orderId: "ORD020", notes: "Exporting fashion products", type: "Export" },
];
const findPartner = () => {
  let flag = -1;
  let partnerId = "";
  while (flag === -1) {
    const index = Math.floor(Math.random() * PARTNER.length);
    if (PARTNER[index].type === "Customer") {
      flag = 1;
      partnerId = PARTNER[index].partnerId;
      return partnerId;
    }
  }
  if (partnerId !== "") {
    return partnerId;
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
const getListProduct = () => {
  let flag = -1;
  let numberProduct = Math.floor(Math.random() * 5);
  let products = [];
  let sum = 0;
  while (numberProduct > products.length) {
    const index = Math.floor(Math.random() * PRODUCT.length);
    const findProduct = products.find(
      (value, index) => value.productId === PRODUCT[index].productId
    );
    if (findProduct === undefined) {
      let quantity = Math.floor(Math.random() * PRODUCT[index].quantity + 1);
      products.push({
        productId: PRODUCT[index].productId,
        productName: PRODUCT[index].productName,
        quantity: quantity,
      });
      sum += PRODUCT[index].sell_price * quantity;
    }
    if (products.length === numberProduct) {
      console.log("Tong", sum);
      return {
        listProduct: products,
        sum: sum,
      };
    }
  }
};
export const addDbOrder = () => {
  ORDERS.map(async (order) => {
    try {
      const deliveryCost = Math.floor(Math.random() * 50 + 20);
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
      const listProduct = getListProduct();
      const totalDiscount =
        order.type === "Export" ? voucher.discountAmount : 0;
      const totalMoney = listProduct.sum + deliveryCost - totalDiscount;

      console.log("list product", listProduct);
      console.log("voucher", voucher);
      console.log("find partnet", findPartner());
      const debt = Math.random() * 100 + 10;
      let data = {
        ...order,
        partnerId: findPartner(),
        userId: `U${Math.floor(Math.random() * 5000)}`,
        createdAt: createdAt.toISOString(),
        totalDiscount: totalDiscount,
        deliveryCost: deliveryCost,
        totalMoney: totalMoney,
        listProduct: listProduct.listProduct,
        debt: debt,
      };
      if (order.type === "Export") {
        data["voucherId"] = voucher.voucherId;
      }
      if (order.type === "Import") {
        data["tax"] = (Math.random() * 10 + 1) / 100;
      }
      console.log("data", data);
      await addDoc(collection(db, "Order"), {
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  });
  console.log("ok");
};
