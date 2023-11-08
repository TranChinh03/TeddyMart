import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

const WAREHOUSE = [
  {
    warehouseId: "WH001",
    status: true,
    listGroupProduct: [
      { groupId: "GP001", groupName: "Kitchen Appliances", count: 300 },
      { groupId: "GP002", groupName: "Home Entertainment", count: 211 },
      { groupId: "GP003", groupName: "Home Appliances", count: 444 },
    ],
    warehouseName: "Central Warehouse",
    address: "123 Main Street, City, Country",
  },
  {
    warehouseId: "WH002",
    status: true,
    listGroupProduct: [
      { groupId: "GP004", groupName: "Home Essentials", count: 412 },
      { groupId: "GP005", groupName: "Electronics", count: 442 },
      { groupId: "GP006", groupName: "Smart Devices", count: 341 },
    ],
    warehouseName: "North Warehouse",
    address: "456 Oak Avenue, City, Country",
  },
  {
    warehouseId: "WH003",
    status: true,
    listGroupProduct: [
      { groupId: "GP007", groupName: "Office Supplies", count: 258 },
      { groupId: "GP008", groupName: "Gaming", count: 357 },
      { groupId: "GP009", groupName: "Outdoor & Adventure", count: 236 },
    ],
    warehouseName: "South Warehouse",
    address: "789 Elm Street, City, Country",
  },
  {
    warehouseId: "WH004",
    status: true,
    listGroupProduct: [
      { groupId: "GP010", groupName: "Smart Home", count: 420 },
      { groupId: "GP001", groupName: "Kitchen Appliances", count: 300 },
      { groupId: "GP002", groupName: "Home Entertainment", count: 210 },
    ],
    warehouseName: "East Warehouse",
    address: "321 Maple Avenue, City, Country",
  },
  {
    warehouseId: "WH005",
    status: true,
    listGroupProduct: [
      { groupId: "GP003", groupName: "Home Appliances", count: 442 },
      { groupId: "GP004", groupName: "Home Essentials", count: 430 },
      { groupId: "GP005", groupName: "Electronics", count: 389 },
    ],
    warehouseName: "West Warehouse",
    address: "654 Pine Street, City, Country",
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
