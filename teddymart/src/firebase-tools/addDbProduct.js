import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

export const PRODUCT = [
  {
    productId: "PD001",
    productName: "Smart Induction Cooktop",
    groupId: "GP001",
    note: "An efficient and smart induction cooktop for modern kitchens.",
    image:
      "https://img.us.news.samsung.com/us/wp-content/uploads/2021/08/09005623/Samsung-Smart-Induction-Built-In-Cooktop-with-Wi-Fi-scaled.jpg",
    cost_price: 150.0,
    VAT: 0.05,
    sell_price: 180.0,
  },
  {
    productId: "PD002",
    productName: "Smart TV 4K",
    groupId: "GP002",
    note: "High-quality 4K Smart TV with multiple features.",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/ua65au7000kxxv/gallery/vn-uhd-au7000-ua65au7000kxxv-408365641?$650_519_PNG$",
    cost_price: 600.0,
    VAT: 0.08,
    sell_price: 750.0,
  },
  {
    productId: "PD003",
    productName: "Smart Refrigerator",
    groupId: "GP003",
    note: "A smart refrigerator with advanced cooling technology.",
    image:
      "https://images.samsung.com/is/image/samsung/ph-ref-rs5000-familyhub-rs64t5f01b4-tc-frontblack-244067168?$650_519_PNG$",
    cost_price: 800.0,
    VAT: 0.06,
    sell_price: 950.0,
  },
  {
    productId: "PD004",
    productName: "Wireless Sound System",
    groupId: "GP004",
    note: "Immerse in a wireless music experience with this sound system.",
    image:
      "https://www.popsci.com/uploads/2022/03/29/JBL-Bar-9.1-easiest-setup.jpg?auto=webp",
    cost_price: 200.0,
    VAT: 0.07,
    sell_price: 250.0,
  },
  {
    productId: "PD005",
    productName: "Smartwatch Series X",
    groupId: "GP005",
    note: "Stay connected and monitor your health with this smartwatch.",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/wysiwyg/Watch/Apple/Watch-X/apple-watch-x-2.jpg",
    cost_price: 150.0,
    VAT: 0.05,
    sell_price: 180.0,
  },
  {
    productId: "PD006",
    productName: "Office All-in-One Printer",
    groupId: "GP006",
    note: "A versatile all-in-one printer for home and office use.",
    image:
      "https://www.khoslaonline.com/wp-content/uploads/2023/03/61ze3OFakgL._SL1500_.jpg",
    cost_price: 300.0,
    VAT: 0.08,
    sell_price: 350.0,
  },
  {
    productId: "PD007",
    productName: "Gaming Console Pro",
    groupId: "GP007",
    groupName: "Office Supplies",
    note: "Elevate your gaming experience with this high-performance console.",
    image:
      "https://www.makerfocus.com/cdn/shop/products/XtronPro_1_1024x1024@2x.jpg?v=1640230361",
    cost_price: 400.0,
    VAT: 0.09,
    sell_price: 480.0,
  },
  {
    productId: "PD008",
    productName: "Car Dash Cam",
    groupId: "GP008",
    groupName: "Gaming",
    note: "A reliable dash camera for your car's safety and security.",
    image: "https://m.media-amazon.com/images/I/51o458kdrfL.jpg",
    cost_price: 100.0,
    VAT: 0.06,
    sell_price: 120.0,
  },
  {
    productId: "PD009",
    productName: "Smart Home Lighting Kit",
    groupId: "GP010",
    groupName: "Smart Home",
    note: "Set the perfect ambiance with this smart lighting kit.",
    image:
      "https://thelightingoutlet.com.au/cdn/shop/articles/smart-lighting-generic-photo.jpg?v=1670797761",
    cost_price: 120.0,
    VAT: 0.04,
    sell_price: 150.0,
  },
  {
    productId: "PD010",
    productName: "Air Purifier",
    groupId: "GP004",
    groupName: "Home Essentials",
    note: "Improve air quality in your home with this efficient air purifier.",
    image:
      "https://img.gigadigital.vn/image/1666602873750-may-loc-khong-khi-xiaomi-smart-air-purifier-4-compact.jpg",
    cost_price: 250.0,
    VAT: 0.05,
    sell_price: 300.0,
  },
  {
    productId: "PD011",
    productName: "Wireless Gaming Mouse",
    groupId: "GP008",
    groupName: "Gaming",
    note: "Experience freedom in gaming with this high-response wireless mouse.",
    image: "https://example.com/images/gaming_mouse.jpg",
    cost_price: 50.0,
    VAT: 0.07,
    sell_price: 60.0,
  },
  {
    productId: "PD012",
    productName: "Smart Security Camera",
    groupId: "GP005",
    groupName: "Smart Devices",
    note: "Keep an eye on your home with this smart security camera.",
    image: "https://example.com/images/security_camera.jpg",
    cost_price: 180.0,
    VAT: 0.06,
    sell_price: 210.0,
  },
  {
    productId: "PD013",
    productName: "Robotic Vacuum Cleaner",
    groupId: "GP004",
    groupName: "Home Essentials",
    note: "Effortlessly clean your home with this smart robotic vacuum.",
    image: "https://example.com/images/robotic_vacuum.jpg",
    cost_price: 300.0,
    VAT: 0.07,
    sell_price: 350.0,
  },
  {
    productId: "PD014",
    productName: "Ultra HD Action Camera",
    groupId: "GP009",
    groupName: "Outdoor & Adventure",
    note: "Capture your adventures in stunning detail with this action camera.",
    image: "https://example.com/images/action_camera.jpg",
    cost_price: 180.0,
    VAT: 0.06,
    sell_price: 220.0,
  },
  {
    productId: "PD015",
    productName: "Smart Wireless Earbuds",
    groupId: "GP005",
    groupName: "Electronics",
    note: "Experience music like never before with these smart wireless earbuds.",
    image: "https://example.com/images/wireless_earbuds.jpg",
    cost_price: 100.0,
    VAT: 0.05,
    sell_price: 120.0,
  },
  {
    productId: "PD016",
    productName: "Electric Rice Cooker",
    groupId: "GP003",
    groupName: "Home Appliances",
    note: "A modern and efficient electric rice cooker for your kitchen.",
    image: "https://example.com/images/rice_cooker.jpg",
    cost_price: 80.0,
    VAT: 0.04,
    sell_price: 100.0,
  },
  {
    productId: "PD017",
    productName: "Wireless Charging Pad",
    groupId: "GP006",
    groupName: "Smart Devices",
    note: "Conveniently charge your devices wirelessly with this pad.",
    image: "https://example.com/images/charging_pad.jpg",
    cost_price: 40.0,
    VAT: 0.03,
    sell_price: 50.0,
  },
  {
    productId: "PD018",
    productName: "Smart Doorbell Camera",
    groupId: "GP010",
    groupName: "Smart Home",
    note: "Keep your home safe with this smart doorbell camera.",
    image: "https://example.com/images/doorbell_camera.jpg",
    cost_price: 160.0,
    VAT: 0.05,
    sell_price: 200.0,
  },
  {
    productId: "PD019",
    productName: "Portable Air Conditioner",
    groupId: "GP001",
    groupName: "Kitchen Appliances",
    note: "Stay cool and comfortable anywhere with this portable AC unit.",
    image: "https://example.com/images/portable_ac.jpg",
    cost_price: 400.0,
    VAT: 0.09,
    sell_price: 450.0,
  },
  {
    productId: "PD020",
    productName: "Smart Home Security System",
    groupId: "GP010",
    groupName: "Smart Home",
    note: "Protect your home with a comprehensive smart security system.",
    image: "https://example.com/images/home_security_system.jpg",
    cost_price: 600.0,
    VAT: 0.1,
    sell_price: 700.0,
  },
  {
    productId: "PD021",
    productName: "Cordless Vacuum Cleaner",
    groupId: "GP004",
    groupName: "Home Essentials",
    note: "Efficiently clean your home without the hassle of cords with this vacuum cleaner.",
    image: "https://example.com/images/cordless_vacuum.jpg",
    cost_price: 250.0,
    VAT: 0.06,
    sell_price: 300.0,
  },
  {
    productId: "PD022",
    productName: "Wireless Keyboard and Mouse Combo",
    groupId: "GP007",
    groupName: "Office Supplies",
    note: "Increase productivity with this wireless keyboard and mouse set.",
    image: "https://example.com/images/wireless_keyboard_mouse.jpg",
    cost_price: 60.0,
    VAT: 0.04,
    sell_price: 80.0,
  },
  {
    productId: "PD023",
    productName: "Smart Coffee Maker",
    groupId: "GP003",
    groupName: "Home Appliances",
    note: "Brew coffee smartly with this innovative coffee maker.",
    image: "https://example.com/images/smart_coffee_maker.jpg",
    cost_price: 90.0,
    VAT: 0.05,
    sell_price: 110.0,
  },
  {
    productId: "PD024",
    productName: "Wireless Bluetooth Speaker",
    groupId: "GP005",
    groupName: "Electronics",
    note: "Experience portable music with this Bluetooth speaker.",
    image: "https://example.com/images/bluetooth_speaker.jpg",
    cost_price: 70.0,
    VAT: 0.06,
    sell_price: 90.0,
  },
  {
    productId: "PD025",
    productName: "Air Fryer",
    groupId: "GP003",
    groupName: "Home Appliances",
    note: "Enjoy healthier frying with this air fryer for your kitchen.",
    image: "https://example.com/images/air_fryer.jpg",
    cost_price: 120.0,
    VAT: 0.07,
    sell_price: 150.0,
  },
  {
    productId: "PD026",
    productName: "Smart Heating Thermostat",
    groupId: "GP010",
    groupName: "Smart Home",
    note: "Efficiently manage home heating with this smart thermostat.",
    image: "https://example.com/images/heating_thermostat.jpg",
    cost_price: 100.0,
    VAT: 0.05,
    sell_price: 120.0,
  },
  {
    productId: "PD027",
    productName: "Smart Weight Scale",
    groupId: "GP006",
    groupName: "Smart Devices",
    note: "Track your weight and health with this smart weight scale.",
    image: "https://example.com/images/weight_scale.jpg",
    cost_price: 50.0,
    VAT: 0.03,
    sell_price: 60.0,
  },
  {
    productId: "PD028",
    productName: "Portable Bluetooth Projector",
    groupId: "GP002",
    groupName: "Home Entertainment",
    note: "Enjoy entertainment on-the-go with this portable projector.",
    image: "https://example.com/images/bluetooth_projector.jpg",
    cost_price: 200.0,
    VAT: 0.08,
    sell_price: 250.0,
  },
  {
    productId: "PD029",
    productName: "Wireless Gaming Headset",
    groupId: "GP008",
    groupName: "Gaming",
    note: "Enhance gaming experience with this wireless headset.",
    image: "https://example.com/images/gaming_headset.jpg",
    cost_price: 80.0,
    VAT: 0.05,
    sell_price: 100.0,
  },
  {
    productId: "PD030",
    productName: "Electric Toothbrush",
    groupId: "GP004",
    groupName: "Home Essentials",
    note: "Upgrade your dental care with this electric toothbrush.",
    image: "https://example.com/images/electric_toothbrush.jpg",
    cost_price: 30.0,
    VAT: 0.03,
    sell_price: 40.0,
  },
  {
    productId: "PD031",
    productName: "Smart Wi-Fi Plug",
    groupId: "GP010",
    groupName: "Smart Home",
    note: "Control home devices remotely with this smart Wi-Fi plug.",
    image: "https://example.com/images/wifi_plug.jpg",
    cost_price: 25.0,
    VAT: 0.02,
    sell_price: 30.0,
  },
  {
    productId: "PD032",
    productName: "Cordless Hair Dryer",
    groupId: "GP004",
    groupName: "Home Essentials",
    note: "Style your hair effortlessly with this cordless hair dryer.",
    image: "https://example.com/images/hair_dryer.jpg",
    cost_price: 70.0,
    VAT: 0.04,
    sell_price: 90.0,
  },
  {
    productId: "PD033",
    productName: "Robot Vacuum and Mop",
    groupId: "GP001",
    groupName: "Kitchen Appliances",
    note: "Efficiently vacuum and mop with this smart robotic cleaner.",
    image: "https://example.com/images/robot_vacuum_mop.jpg",
    cost_price: 350.0,
    VAT: 0.08,
    sell_price: 400.0,
  },
  {
    productId: "PD034",
    productName: "Smart Home Surveillance Camera",
    groupId: "GP010",
    groupName: "Smart Home",
    note: "Monitor your home with this advanced surveillance camera.",
    image: "https://example.com/images/home_surveillance_camera.jpg",
    cost_price: 180.0,
    VAT: 0.06,
    sell_price: 220.0,
  },
  {
    productId: "PD035",
    productName: "Air Quality Monitor",
    groupId: "GP006",
    groupName: "Smart Devices",
    note: "Keep track of air quality with this smart monitoring device.",
    image: "https://example.com/images/air_quality_monitor.jpg",
    cost_price: 90.0,
    VAT: 0.05,
    sell_price: 110.0,
  },
  {
    productId: "PD036",
    productName: "Bluetooth Noise-Canceling Headphones",
    groupId: "GP005",
    groupName: "Electronics",
    note: "Experience high-quality sound with noise-canceling headphones.",
    image: "https://example.com/images/noise_cancelling_headphones.jpg",
    cost_price: 120.0,
    VAT: 0.06,
    sell_price: 150.0,
  },
  {
    productId: "PD037",
    productName: "Wireless Charging Stand",
    groupId: "GP006",
    groupName: "Smart Devices",
    note: "Charge multiple devices wirelessly with this charging stand.",
    image: "https://example.com/images/charging_stand.jpg",
    cost_price: 50.0,
    VAT: 0.03,
    sell_price: 70.0,
  },
  {
    productId: "PD038",
    productName: "Smart Digital Picture Frame",
    groupId: "GP002",
    groupName: "Home Entertainment",
    note: "Display your memories with this smart digital picture frame.",
    image: "https://example.com/images/digital_picture_frame.jpg",
    cost_price: 80.0,
    VAT: 0.04,
    sell_price: 100.0,
  },
  {
    productId: "PD039",
    productName: "Electric Kettle",
    groupId: "GP003",
    groupName: "Home Appliances",
    note: "Boil water quickly and efficiently with this electric kettle.",
    image: "https://example.com/images/electric_kettle.jpg",
    cost_price: 40.0,
    VAT: 0.03,
    sell_price: 50.0,
  },
  {
    productId: "PD040",
    productName: "Wireless Smart Door Lock",
    groupId: "GP010",
    groupName: "Smart Home",
    note: "Secure your home with this advanced smart door lock.",
    image: "https://example.com/images/smart_door_lock.jpg",
    cost_price: 200.0,
    VAT: 0.07,
    sell_price: 250.0,
  },
];
export const addDBProduct = () => {
  PRODUCT.map(async (product) => {
    await setDoc(
      doc(
        db,
        "/Manager/0viI4onPd8eJkSC8QZxNUM9mPyX2/Product",
        product.productId
      ),
      product
    );
  });
};
