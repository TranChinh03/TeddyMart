import {
  Button,
  Checkbox,
  Space,
  DatePicker,
  Dropdown,
  MenuProps,
  Tooltip,
  TabsProps,
  Tabs,
  Popconfirm,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { ButtonComponent, ListCheckBox } from "components";
import DropdownImage from "components/DropDownImage";
import DropdownComponent from "components/DropdownComponent";
import Header from "components/Header";
import { BillTable } from "components/TableComponent";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { t } from "i18next";
import { title } from "process";
import React, { useState } from "react";
import {
  BiDotsVerticalRounded,
  BiBell,
  BiStar,
  BiFilter,
  BiSearch,
  BiSave,
  BiDownload,
  BiTrash,
  BiPlus,
} from "react-icons/bi";
import { BsFileExcel } from "react-icons/bs";
import { LiaFileExcel } from "react-icons/lia";
const { RangePicker } = DatePicker;

export default function SaleScreen() {
  const [language, setLanguage] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [listFilter, setListFilter] = useState([
    {
      displayName: t("sale.seller"),
      value: true,
    },
    {
      displayName: t("sale.status"),
      value: true,
    },
    {
      displayName: t("sale.payment"),
      value: true,
    },
    {
      displayName: t("sale.debt"),
      value: true,
    },
    {
      displayName: t("sale.discount"),
      value: true,
    },
    {
      displayName: t("sale.note"),
      value: true,
    },
    {
      displayName: t("sale.totalPayment"),
      value: true,
    },
  ]);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả đơn hàng (0)",
    },
    {
      key: "2",
      label: "Chưa thanh toán (0)",
    },
    {
      key: "3",
      label: "Thanh toán 1 phần",
    },
    {
      key: "4",
      label: "Thanh toán 100% (0)",
    },
    {
      key: "5",
      label: "Đơn trả (0)",
    },
    {
      key: "6",
      label: "Đơn nợ  (0)",
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="w-full">
      {/*Header */}
      <Header width={"100%"} title="Sale" />

      {/*Body */}
      <body
        className="bg-white border-2 p-5 m-1.5 rounded-md"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Space direction="vertical" size={10}>
          <div>
            <Checkbox>
              <RangePicker showTime />
            </Checkbox>
            <Checkbox>
              <h1>Lọc theo giờ kinh doanh</h1>
            </Checkbox>
          </div>
          <Button>{t("button.all")}</Button>
          <div className=" flex items-center">
            <TextInputComponent
              value={search}
              setValue={setSearch}
              style={{ borderRadius: 5 }}
              outStyle={{ width: "100%", marginRight: 20 }}
              placeHolder={t("sale.placeholderSearch")}
              iconLeft={<BiSearch />}
            />
            {/* <Popconfirm
              title=""
              okText={t("button.apply")}
              okType="link"
              onConfirm={() => console.log("confirm")}
              onCancel={() => console.log("cancel")}
              cancelText={t("button.close")}
              placement="bottom"
              icon={<></>}
              description={
                <div className=" grid-cols-3 grid gap-4">
                  <Checkbox>{t("sale.seller")}</Checkbox>
                  <Checkbox>{t("sale.status")}</Checkbox>
                  <Checkbox>{t("sale.payment")}</Checkbox>
                  <Checkbox>{t("sale.debt")}</Checkbox>
                  <Checkbox>{t("sale.discount")}</Checkbox>
                  <Checkbox>{t("sale.note")}</Checkbox>
                  <Checkbox>{t("sale.totalPayment")}</Checkbox>
                </div>
              }
            >
              <ButtonComponent
                label={t("button.filter")}
                onClick={() => {}}
                style={{ backgroundColor: "#211F30", marginRight: 12 }}
                iconLeft={<BiFilter size={20} color="white" />}
              />
            </Popconfirm> */}
            <ListCheckBox
              listFilter={listFilter}
              setListFilter={setListFilter}
            />

            <ButtonComponent
              label={t("button.delete")}
              onClick={() => {}}
              style={{ backgroundColor: "#EA5A47", marginInline: 12 }}
              iconLeft={<BiTrash size={20} color="white" />}
            />
            <ButtonComponent
              label={t("button.exportExcel")}
              onClick={() => {}}
              style={{ backgroundColor: "#211F30", marginRight: 12 }}
              iconLeft={<LiaFileExcel size={20} color="white" />}
            />
            <ButtonComponent
              label={t("button.addNew")}
              onClick={() => {}}
              iconLeft={<BiPlus size={20} color="white" />}
            />
          </div>
          <div className="flex items-center">
            <Space direction="horizontal" size={10}>
              <DropdownComponent
                value={sort}
                setValue={setSort}
                options={[
                  t("sort.orderAscending"),
                  t("sort.orderDescending"),
                  t("sort.createdAtNewest"),
                  t("sort.createdAtOldest"),
                  t("sort.totalPaymentAscending"),
                  t("sort.totalPaymentDescending"),
                ]}
              />
              <Button style={{ backgroundColor: "#e5a344", color: "white" }}>
                Xem
              </Button>
              {/* <Button>Thao tác đơn hàng</Button>
              <Button
                style={{
                  color: "black",
                }}
                className="flex items-center text-14"
              >
                <BiDownload size={20} className="mr-2" />
                Nhập xuất Excel
              </Button> */}
            </Space>
          </div>
          {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
          <BillTable />
        </Space>
      </body>
    </div>
  );
}
