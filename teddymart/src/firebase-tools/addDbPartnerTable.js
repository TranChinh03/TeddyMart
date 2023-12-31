import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

export const PARTNER = [
  {
    partnerId: "P001",
    partnerName: "John Doe",
    email: "john@example.com",
    phoneNumber: "+1234567890",
    address: "123 Main Street, City",
    note: "Regular customer, prefers organic products.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P002",
    partnerName: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "+1987654321",
    address: "456 Elm Avenue, Town",
    note: "Supplier for fresh produce.",
    certificate:
      "https://www.registrationking.com/wp-content/uploads/2020/06/iso1.png",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P003",
    partnerName: "Alex Johnson",
    email: "alex@example.com",
    phoneNumber: "+7654321890",
    address: "789 Oak Road, Village",
    note: "Regular customer, interested in discounts.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P004",
    partnerName: "Emily Brown",
    email: "emily@example.com",
    phoneNumber: "+5410928347",
    address: "101 Pine Lane, Suburb",
    note: "Supplier of handmade crafts.",
    certificate:
      "https://5.imimg.com/data5/SD/CD/JZ/SELLER-79747521/iso-9001-2015.jpg",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P005",
    partnerName: "Michael Davis",
    email: "michael@example.com",
    phoneNumber: "+9876543210",
    address: "246 Oak Street, Hamlet",
    note: "Regular customer, tech enthusiast.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    email: "sophia@example.com",
    phoneNumber: "+6789012345",
    address: "876 Cedar Avenue, County",
    note: "Supplier of fashion accessories.",
    certificate:
      "https://vietabolt.com/public/upload/chungchi1/scan0001-03.jpg?1551170892304",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P007",
    partnerName: "William Thompson",
    email: "william@example.com",
    phoneNumber: "+1230987654",
    address: "543 Birch Lane, Town",
    note: "Regular customer, coffee lover.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P008",
    partnerName: "Olivia Wilson",
    email: "olivia@example.com",
    phoneNumber: "+5432167890",
    address: "321 Maple Street, City",
    note: "Supplier of home decor items.",
    certificate: "https://example.com/certificates/oliviawilson.jpg",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P009",
    partnerName: "Daniel Anderson",
    email: "daniel@example.com",
    phoneNumber: "+9876543211",
    address: "111 Pinecrest Road, Suburb",
    note: "Regular customer, fitness enthusiast.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P010",
    partnerName: "Ava Garcia",
    email: "ava@example.com",
    phoneNumber: "+1928374650",
    address: "999 Elm Street, Town",
    note: "Supplier of beauty products.",
    certificate: "https://example.com/certificates/avagarcia.jpg",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P011",
    partnerName: "Liam Wilson",
    email: "liam@example.com",
    phoneNumber: "+3456789123",
    address: "888 Oak Avenue, City",
    note: "Regular customer, book enthusiast.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P012",
    partnerName: "Mia Johnson",
    email: "mia@example.com",
    phoneNumber: "+8765432109",
    address: "555 Maple Road, Town",
    note: "Supplier of handmade jewelry.",
    certificate: "https://example.com/certificates/miajohnson.jpg",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P013",
    partnerName: "Noah Davis",
    email: "noah@example.com",
    phoneNumber: "+9876543210",
    address: "123 Cedar Street, Suburb",
    note: "Regular customer, music lover.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P014",
    partnerName: "Ella Moore",
    email: "ella@example.com",
    phoneNumber: "+1234567890",
    address: "456 Birch Lane, City",
    note: "Supplier of organic products.",
    certificate: "https://example.com/certificates/ellamoore.jpg",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P015",
    partnerName: "Benjamin Lee",
    email: "benjamin@example.com",
    phoneNumber: "+2345678901",
    address: "789 Elm Road, Town",
    note: "Regular customer, outdoor enthusiast.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P016",
    partnerName: "Scarlett Brown",
    email: "scarlett@example.com",
    phoneNumber: "+9876543210",
    address: "101 Maple Street, Suburb",
    note: "Supplier of artisanal goods.",
    certificate: "https://example.com/certificates/scarlettbrown.jpg",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P017",
    partnerName: "James Garcia",
    email: "james@example.com",
    phoneNumber: "+1234567890",
    address: "456 Oak Lane, City",
    note: "Regular customer, tech savvy.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P018",
    partnerName: "Chloe Wilson",
    email: "chloe@example.com",
    phoneNumber: "+8901234567",
    address: "789 Birch Road, Town",
    note: "Supplier of homemade jams.",
    certificate: "https://example.com/certificates/chloewilson.jpg",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P019",
    partnerName: "Ethan Smith",
    email: "ethan@example.com",
    phoneNumber: "+2345678901",
    address: "111 Elm Avenue, City",
    note: "Regular customer, foodie.",
    gender: "Male",
    type: "Customer",
    totalBuyAmount: 0,
    debt: 0,
  },
  {
    partnerId: "P020",
    partnerName: "Lily Anderson",
    email: "lily@example.com",
    phoneNumber: "+8901234567",
    address: "999 Maple Lane, Town",
    note: "Supplier of handcrafted items.",
    certificate: "https://example.com/certificates/lilyanderson.jpg",
    type: "Supplier",
    totalBuyAmount: 0,
    debt: 0,
  },
];
export const addDBPartnerTable = () => {
  PARTNER.map(async (partner) => {
    await setDoc(
      doc(
        db,
        "/Manager/vNl8JhH0SjPUCJ7ZzlRbJPkXIx02/Partner",
        partner.partnerId
      ),
      partner
    );
  });
};
