import Divider from "components/Divider";
import DrawerItem from "./DrawerItem";
import { useNavigate } from "react-router-dom";
import { NAV_LINK } from "./NAV_LINK";
import { BsCart2, BsTruck, BsPeople, BsBox, BsBarChartLine, BsReverseLayoutTextSidebarReverse, BsCaretDownFill} from "react-icons/bs";
const DRAWER_ITEM = [
  {
    name: "Sale",
    link: NAV_LINK.SALE,
    icon1: <BsCart2 size={25}/>,
    icon2: <BsCaretDownFill size={15}/>
  },
  {
    name: "Product",
    link: NAV_LINK.PRODUCT,
    icon1: <BsReverseLayoutTextSidebarReverse size={25}/>,
    icon2: <BsCaretDownFill size={15}/>
  },
  {
    name: "Customer",
    link: NAV_LINK.CUSTOMER,
    icon1: <BsPeople size={25}/>
  },
  {
    name: "Supplier",
    link: NAV_LINK.SUPPLIER,
    icon1: <BsTruck size={25}/>
  },
  {
    name: "Warehouse",
    link: NAV_LINK.WAREHOUSE,
    icon1: <BsBox size={25}/>
  },
  {
    name: "Report",
    link: NAV_LINK.REPORT,
    icon1: <BsBarChartLine size={25}/>
  },
];
export default function Drawer() {
  const navigate = useNavigate();
  return (
    <div
      className="h-screen w-full top-0 left-0 shadow-lg"
      style={{ backgroundColor: "#217ca3" }}
    >
      <div className="overflow-y-auto h-full">
        {/* Shop Header */}
        <div className="flex items-center justify-start p-5">
          <div className="flex w-16 h-16 items-center justify-center bg-gray-500 rounded-full text-white text-3xl font-semibold">
            S
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-white">Shop's Name</h1>
            <p className="text-sm text-white">Your Shop Slogan</p>
          </div>
        </div>
        <hr className="border-t border-gray-400 my-5" />

        {/* Drawer Items */}
        {DRAWER_ITEM.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 hover:bg-gray-800 cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <span className="text-lg text-white">{item.name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 11.293a1 1 0 011.414 0L10 14.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414 1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
