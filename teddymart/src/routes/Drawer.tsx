import React from "react";
import Divider from "components/Divider";
import DrawerItem from "./DrawerItem";
import { useNavigate } from "react-router-dom";
const DRAWER_ITEM = [
  {
    name: "Sale",
    link: "/sale",
  },
  {
    name: "Product",
    link: "/product",
  },
  {
    name: "Customer",
    link: "/customer",
  },
  {
    name: "Supplier",
    link: "/supplier",
  },
  {
    name: "Warehouse",
    link: "/warehouse",
  },
  {
    name: "Report",
    link: "/report",
  },
];
export default function Drawer() {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 h-screen bg-blue-300 w-1/5">
      <div className="overflow-y-auto h-full">
        {/* Avatar */}
        <div className="flex flex-row px-5 py-5 items-center">
          <div className="flex w-10 bg-gray-500 h-10 items-center justify-center rounded-full mr-2">
            P
          </div>
          <div>Shop's Name</div>
        </div>
        <Divider color="bg-black" />
        {DRAWER_ITEM.map((item, index) => {
          return (
            <DrawerItem onClick={() => navigate(item.link)} name={item.name} />
          );
        })}
      </div>
    </div>
  );
}
