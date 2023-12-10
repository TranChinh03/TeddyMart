import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

export const WAREHOUSE = [
  {
    warehouseId: "WH001",
    listProduct: [
      {
        productId: "PD001",
        productName: "Smart Induction Cooktop",
        quantity: 300,
      },
      {
        productId: "PD002",
        productName: "Smart TV 4K",
        quantity: 211,
      },
      {
        productId: "PD003",
        productName: "Smart Refrigerator",
        quantity: 444,
      },
      {
        productId: "PD004",
        productName: "Wireless Sound System",
        quantity: 50, // Random quantity for PD004
      },
      {
        productId: "PD005",
        productName: "Smartwatch Series X",
        quantity: 100, // Random quantity for PD005
      },
      {
        productId: "PD006",
        productName: "Office All-in-One Printer",
        quantity: 150, // Random quantity for PD006
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 75, // Random quantity for PD007
      },
      {
        productId: "PD008",
        productName: "Car Dash Cam",
        quantity: 30, // Random quantity for PD008
      },
      {
        productId: "PD009",
        productName: "Smart Home Lighting Kit",
        quantity: 80, // Random quantity for PD009
      },
      {
        productId: "PD010",
        productName: "Air Purifier",
        quantity: 120, // Random quantity for PD010
      },
      {
        productId: "PD011",
        productName: "Wireless Gaming Mouse",
        quantity: 40, // Random quantity for PD011
      },
      {
        productId: "PD012",
        productName: "Smart Security Camera",
        quantity: 90, // Random quantity for PD012
      },
      {
        productId: "PD013",
        productName: "Robotic Vacuum Cleaner",
        quantity: 150, // Random quantity for PD013
      },
      {
        productId: "PD014",
        productName: "Ultra HD Action Camera",
        quantity: 60, // Random quantity for PD014
      },
      {
        productId: "PD015",
        productName: "Smart Wireless Earbuds",
        quantity: 70, // Random quantity for PD015
      },
      {
        productId: "PD016",
        productName: "Electric Rice Cooker",
        quantity: 25, // Random quantity for PD016
      },
      {
        productId: "PD017",
        productName: "Wireless Charging Pad",
        quantity: 35, // Random quantity for PD017
      },
      {
        productId: "PD018",
        productName: "Smart Doorbell Camera",
        quantity: 45, // Random quantity for PD018
      },
      {
        productId: "PD019",
        productName: "Portable Air Conditioner",
        quantity: 65, // Random quantity for PD019
      },
      {
        productId: "PD020",
        productName: "Smart Home Security System",
        quantity: 30, // Random quantity for PD020
      },
      {
        productId: "PD021",
        productName: "Cordless Vacuum Cleaner",
        quantity: 85, // Random quantity for PD021
      },
      {
        productId: "PD022",
        productName: "Wireless Keyboard and Mouse Combo",
        quantity: 55, // Random quantity for PD022
      },
      {
        productId: "PD023",
        productName: "Smart Coffee Maker",
        quantity: 75, // Random quantity for PD023
      },
      {
        productId: "PD024",
        productName: "Wireless Bluetooth Speaker",
        quantity: 90, // Random quantity for PD024
      },
      {
        productId: "PD025",
        productName: "Air Fryer",
        quantity: 120, // Random quantity for PD025
      },
      {
        productId: "PD026",
        productName: "Smart Heating Thermostat",
        quantity: 40, // Random quantity for PD026
      },
      {
        productId: "PD027",
        productName: "Smart Weight Scale",
        quantity: 30, // Random quantity for PD027
      },
      {
        productId: "PD028",
        productName: "Portable Bluetooth Projector",
        quantity: 70, // Random quantity for PD028
      },
      {
        productId: "PD029",
        productName: "Wireless Gaming Headset",
        quantity: 55, // Random quantity for PD029
      },
      {
        productId: "PD030",
        productName: "Electric Toothbrush",
        quantity: 35, // Random quantity for PD030
      },
      {
        productId: "PD031",
        productName: "Smart Wi-Fi Plug",
        quantity: 25, // Random quantity for PD031
      },
      {
        productId: "PD032",
        productName: "Cordless Hair Dryer",
        quantity: 45, // Random quantity for PD032
      },
      {
        productId: "PD033",
        productName: "Robot Vacuum and Mop",
        quantity: 80, // Random quantity for PD033
      },
      {
        productId: "PD034",
        productName: "Smart Home Surveillance Camera",
        quantity: 100, // Random quantity for PD034
      },
      {
        productId: "PD035",
        productName: "Air Quality Monitor",
        quantity: 70, // Random quantity for PD035
      },
      {
        productId: "PD036",
        productName: "Bluetooth Noise-Canceling Headphones",
        quantity: 85, // Random quantity for PD036
      },
      {
        productId: "PD037",
        productName: "Wireless Charging Stand",
        quantity: 45, // Random quantity for PD037
      },
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 35, // Random quantity for PD038
      },
      {
        productId: "PD039",
        productName: "Electric Kettle",
        quantity: 50, // Random quantity for PD039
      },
      {
        productId: "PD040",
        productName: "Wireless Smart Door Lock",
        quantity: 30, // Random quantity for PD040
      },
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
      doc(
        db,
        "/Manager/vNl8JhH0SjPUCJ7ZzlRbJPkXIx02/Ware_House",
        warehouse.warehouseId
      ),
      warehouse
    );
  });
};
