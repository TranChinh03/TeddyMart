import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
const PRODUCT_GROUPS = [
  {
    groupId: "GP001",
    note: "This group includes a wide range of kitchen appliances designed for modern homes, featuring smart technologies and efficient functionalities to make cooking and kitchen tasks easier and more convenient.",
    groupName: "Kitchen Appliances",
  },
  {
    groupId: "GP002",
    note: "Discover a variety of entertainment devices suitable for home entertainment purposes. Ranging from smart TVs to high-quality audio systems, this group offers advanced technology for an immersive entertainment experience at home.",
    groupName: "Home Entertainment",
  },
  {
    groupId: "GP003",
    note: "Explore essential appliances required for household needs. From refrigerators to kitchen essentials, this group provides reliable and efficient solutions to simplify daily routines at home.",
    groupName: "Home Appliances",
  },
  {
    groupId: "GP004",
    note: "Find a wide assortment of essential products catering to daily life at home. From air purifiers to vacuum cleaners, these products are designed to enhance the quality of life within households.",
    groupName: "Home Essentials",
  },
  {
    groupId: "GP005",
    note: "Experience a diverse range of electronic devices and gadgets tailored to meet various needs. From smartwatches to wireless speakers, this group offers cutting-edge technology for your everyday lifestyle.",
    groupName: "Electronics",
  },
  {
    groupId: "GP006",
    note: "Embrace smart devices and gadgets that complement the modern lifestyle. From smart home automation to wearable technology, this group provides solutions for a connected and efficient living experience.",
    groupName: "Smart Devices",
  },
  {
    groupId: "GP007",
    note: "Discover supplies and equipment specifically designed for office use, enhancing productivity and efficiency in the workplace.",
    groupName: "Office Supplies",
  },
  {
    groupId: "GP008",
    note: "Delve into devices and accessories tailored for gaming enthusiasts. From gaming consoles to peripherals, this group offers high-performance gear to elevate your gaming experience.",
    groupName: "Gaming",
  },
  {
    groupId: "GP009",
    note: "Explore products ideal for outdoor and adventure activities. From action cameras to camping gear, this group caters to the needs of outdoor enthusiasts.",
    groupName: "Outdoor & Adventure",
  },
  {
    groupId: "GP010",
    note: "Experience smart devices designed for a connected home. From smart security to home automation, this group offers solutions for a seamless and secure living environment.",
    groupName: "Smart Home",
  },
];
export const addDbGroupProduct = async () => {
  PRODUCT_GROUPS.map(async (gp) => {
    await setDoc(
      doc(
        db,
        "/Manager/0viI4onPd8eJkSC8QZxNUM9mPyX2/Group_Product",
        gp.groupId
      ),
      gp
    );
  });
};
