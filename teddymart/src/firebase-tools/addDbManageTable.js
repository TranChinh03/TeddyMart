import { db } from "firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const MANAGER = [
  {
    userId: "001",
    userName: "John Smith",
    photoURL: "example.com/001",
    address: "123 Main Street, City",
    phoneNumber: "+1234567890",
    email: "john@example.com",
    shopName: "BestMart",
  },
  {
    userId: "002",
    userName: "Emily Brown",
    photoURL: "example.com/002",
    address: "456 Elm Avenue, Town",
    phoneNumber: "+1987654321",
    email: "emily@example.com",
    shopName: "Fashion Trends",
  },
  {
    userId: "003",
    userName: "David Lee",
    photoURL: "example.com/003",
    address: "789 Oak Road, Village",
    phoneNumber: "+7654321890",
    email: "david@example.com",
    shopName: "TechGadgets",
  },
  {
    userId: "004",
    userName: "Sarah Johnson",
    photoURL: "example.com/004",
    address: "101 Pine Lane, Suburb",
    phoneNumber: "+5410928347",
    email: "sarah@example.com",
    shopName: "HomeEssentials",
  },
  {
    userId: "005",
    userName: "Michael Davis",
    photoURL: "example.com/005",
    address: "246 Oak Street, Hamlet",
    phoneNumber: "+9876543210",
    email: "michael@example.com",
    shopName: "SportsEmporium",
  },
  {
    userId: "006",
    userName: "Sophia Martinez",
    photoURL: "example.com/006",
    address: "876 Cedar Avenue, County",
    phoneNumber: "+6789012345",
    email: "sophia@example.com",
    shopName: "ChicBoutique",
  },
  {
    userId: "007",
    userName: "William Thompson",
    photoURL: "example.com/007",
    address: "543 Birch Lane, Town",
    phoneNumber: "+1230987654",
    email: "william@example.com",
    shopName: "GadgetZone",
  },
  {
    userId: "008",
    userName: "Olivia Wilson",
    photoURL: "example.com/008",
    address: "321 Maple Street, City",
    phoneNumber: "+5432167890",
    email: "olivia@example.com",
    shopName: "FashionHub",
  },
  {
    userId: "009",
    userName: "Daniel Anderson",
    photoURL: "example.com/009",
    address: "111 Pinecrest Road, Suburb",
    phoneNumber: "+9876543211",
    email: "daniel@example.com",
    shopName: "HomeDecorPlus",
  },
  {
    userId: "010",
    userName: "Ava Garcia",
    photoURL: "example.com/010",
    address: "999 Elm Street, Town",
    phoneNumber: "+1928374650",
    email: "ava@example.com",
    shopName: "BeautyBoutique",
  },
];
export const addDbManagerTable = async () => {
  MANAGER.map(async (manager) => {
    await addDoc(collection(db, "Manager"), manager);
  });
};
