import DrawerItem from "./DrawerItem";
import { useNavigate, useLocation } from "react-router-dom";
import { NAV_LINK } from "./NAV_LINK";
import { useState, useMemo } from "react";
import {
  BsCart2,
  BsTruck,
  BsPeople,
  BsBox,
  BsBarChartLine,
  BsReverseLayoutTextSidebarReverse,
  BsCaretDownFill,
  BsFileEarmarkText,
  BsGift,
  BsPerson,
  BsBoxArrowInLeft,
  BsBoxes,
} from "react-icons/bs";
import { BiBox } from "react-icons/bi";
import { Collapse } from "antd";
import { useTranslation } from "react-i18next";
import { Divider } from "antd";
type DrawerItemProps = {
  name?: string;
  link?: string;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
};

export type DrawerProps = DrawerItemProps & {
  subDrawer?: DrawerItemProps[];
};

export default function Drawer() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("/");
  const location = useLocation();
  const { t } = useTranslation();
  const DRAWER_ITEM: DrawerProps[] = [
    {
      name: t("drawer.sale"),
      link: "",
      icon1: <BsCart2 size={25} />,
      icon2: <BsCaretDownFill size={15} />,
      subDrawer: [
        {
          name: t("drawer.order"),
          icon1: <BsFileEarmarkText size={20} />,
          link: NAV_LINK.SALE,
        },
        {
          name: t("drawer.voucher"),
          link: NAV_LINK.VOUCHER,
          icon1: <BsGift size={20} />,
        },
      ],
    },
    {
      name: t("drawer.partner"),
      link: "",
      icon1: <BsPeople size={25} />,
      icon2: <BsCaretDownFill size={15} />,
      subDrawer: [
        {
          name: t("drawer.customer"),
          link: NAV_LINK.CUSTOMER,
          icon1: <BsPerson size={20} />,
        },
        {
          name: t("drawer.supplier"),
          link: NAV_LINK.SUPPLIER,
          icon1: <BsTruck size={20} />,
        },
      ],
    },
    {
      name: t("drawer.product"),
      link: "",
      icon1: <BsReverseLayoutTextSidebarReverse size={25} />,
      icon2: <BsCaretDownFill size={15} />,
      subDrawer: [
        {
          name: t("drawer.product"),
          link: NAV_LINK.PRODUCT,
          icon1: <BsBox size={20} />,
        },
        {
          name: t("drawer.groupProduct"),
          link: NAV_LINK.GROUP_PRODUCT,
          icon1: <BsBoxes size={20} />,
        },
      ],
    },
    {
      name: t("drawer.warehouse"),
      link: NAV_LINK.WAREHOUSE,
      icon1: <BiBox size={25} />,
    },
    {
      name: t("drawer.report"),
      link: NAV_LINK.REPORT,
      icon1: <BsBarChartLine size={25} />,
    },
    {
      name: t("drawer.signOut"),
      link: "",
      icon1: <BsBoxArrowInLeft size={25} />,
    },
  ];
  return (
    <div className="fixed top-0 left-0 h-screen bg-sidebar w-1/5 scrollbar-hide">
      <div className="overflow-y-auto h-full justify-center">
        {/* Avatar */}
        <button className="flex flex-row px-5 mt-5 items-center text-txt_white gap-2">
          <div className="flex w-10 h-10 bg-hover rounded-full items-center justify-center">
            P
          </div>
          <div>Shop's Name</div>
        </button>
        <Divider className="bg-slate-400" />
        {DRAWER_ITEM.map((item: DrawerProps, index) => {
          return (
            <Collapse
              style={{ padding: 0 }}
              bordered={false}
              size="small"
              collapsible={!item.subDrawer ? "disabled" : "header"}
              expandIcon={() => <></>}
              expandIconPosition="end"
              items={[
                {
                  key: index.toString(),
                  label: (
                    <DrawerItem
                      item={item}
                      width={window.screen.width * 0.15}
                      isSelected={currentTab === item.name}
                      onClick={() => {
                        if (!item.subDrawer) {
                          navigate(item.link);
                          setCurrentTab(item.name);
                        } else {
                          setCurrentTab(item.name);
                        }
                      }}
                    />
                  ),
                  children: item.subDrawer?.map((subItem, i) => (
                    <div className="py-1">
                      <DrawerItem
                        item={subItem}
                        isSelected={location.pathname === subItem.link}
                        key={i}
                        onClick={() => {
                          navigate(subItem.link);
                        }}
                        //width={window.screen.width * 0.14}
                      />
                    </div>
                  )),
                },
              ]}
            ></Collapse>
          );
        })}
      </div>
    </div>
  );
}
