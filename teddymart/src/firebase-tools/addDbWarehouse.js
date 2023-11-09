import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

const WAREHOUSE = [
  {
    warehouseId: "WH001",
    listProduct: [
      {
        productId: "PD001",
        productName: "Smart Induction Cooktop",
        quantity: 300,
      },
      { productId: "PD002", productName: "Smart TV 4K", quantity: 211 },
      { productId: "PD003", productName: "Smart Refrigerator", quantity: 444 },
    ],
    warehouseName: "Central Warehouse",
    address: "123 Main Street, City, quantityry",
    count: 955,
  },
  {
    warehouseId: "WH002",
    listProduct: [
      {
        productId: "PD004",
        productName: "Wireless Sound System",
        quantity: 412,
      },
      { productId: "PD005", productName: "Smartwatch Series X", quantity: 442 },
      {
        productId: "PD006",
        productName: "Office All-in-One Printer",
        quantity: 341,
      },
    ],
    warehouseName: "North Warehouse",
    address: "456 Oak Avenue, City, quantityry",
    count: 1195,
  },
  {
    warehouseId: "WH003",
    listProduct: [
      { productId: "PD007", productName: "Gaming Console Pro", quantity: 258 },
      { productId: "PD008", productName: "Car Dash Cam", quantity: 357 },
      {
        productId: "PD009",
        productName: "Smart Home Lighting Kit",
        quantity: 236,
      },
    ],
    warehouseName: "South Warehouse",
    address: "789 Elm Street, City, quantityry",
    count: 851,
  },
  {
    warehouseId: "WH004",
    listProduct: [
      { productId: "PD010", productName: "Air Purifier", quantity: 420 },
      {
        productId: "PD011",
        productName: "Wireless Gaming Mouse",
        quantity: 300,
      },
      {
        productId: "PD012",
        productName: "Smart Security Camera",
        quantity: 210,
      },
    ],
    warehouseName: "East Warehouse",
    address: "321 Maple Avenue, City, quantityry",
    count: 930,
  },
  {
    warehouseId: "WH005",
    listProduct: [
      {
        productId: "PD013",
        productName: "Robotic Vacuum Cleaner",
        quantity: 442,
      },
      {
        productId: "PD014",
        productName: "Ultra HD Action Camera",
        quantity: 430,
      },
      {
        productId: "PD015",
        productName: "Smart Wireless Earbuds",
        quantity: 389,
      },
    ],
    warehouseName: "West Warehouse",
    address: "654 Pine Street, City, quantityry",
    count: 1261,
  },
];
export const addDbWarehouse = () => {
  WAREHOUSE.map(async (warehouse) => {
    await setDoc(
      doc(db, "/Manager/M001/Ware_House", warehouse.warehouseId),
      warehouse
    );
  });
};
