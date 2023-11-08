import Divider from "components/Divider";
import DrawerItem from "./DrawerItem";
import { useNavigate } from "react-router-dom";
import { NAV_LINK } from "./NAV_LINK";
import { useState } from "react";
import {
  BsCart2,
  BsTruck,
  BsPeople,
  BsBox,
  BsBarChartLine,
  BsReverseLayoutTextSidebarReverse,
  BsCaretDownFill,
} from "react-icons/bs";
const DRAWER_ITEM = [
  {
    name: "Sale",
    link: NAV_LINK.SALE,
    icon1: <BsCart2 size={25} />,
    icon2: <BsCaretDownFill size={15} />,
  },
  {
    name: "Product",
    link: NAV_LINK.PRODUCT,
    icon1: <BsReverseLayoutTextSidebarReverse size={25} />,
    icon2: <BsCaretDownFill size={15} />,
  },
  {
    name: "Customer",
    link: NAV_LINK.CUSTOMER,
    icon1: <BsPeople size={25} />,
  },
  {
    name: "Supplier",
    link: NAV_LINK.SUPPLIER,
    icon1: <BsTruck size={25} />,
  },
  {
    name: "Warehouse",
    link: NAV_LINK.WAREHOUSE,
    icon1: <BsBox size={25} />,
  },
  {
    name: "Report",
    link: NAV_LINK.REPORT,
    icon1: <BsBarChartLine size={25} />,
  },
];
export default function Drawer() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("/");
  return (
    <div className="fixed top-0 left-0 h-screen bg-sidebar w-1/6">
      <div className="overflow-y-auto h-full justify-center">
        {/* Avatar */}
        <div className="flex flex-row px-5 py-5 items-center text-txt_white gap-2">
          <div className="flex w-10 bg-gray-500 h-10 items-center justify-center rounded-full mr-2">
            P
          </div>
          <div>Shop's Name</div>
        </div>
        <Divider color="bg-hover" />
        {DRAWER_ITEM.map((item, index) => {
          return (
            <DrawerItem
              onClick={() => {
                navigate(item.link);
                setCurrentTab(item.link);
              }}
              name={item.name}
              icon1={item.icon1}
              icon2={item.icon2}
              isSelected={currentTab === item.link}
            />
          );
        })}
      </div>
    </div>
  );
}
