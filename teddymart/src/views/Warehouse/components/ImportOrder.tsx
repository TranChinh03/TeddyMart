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
  Modal,
  Divider,
  Card,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { ButtonComponent, ListCheckBox, SearchComponent } from "components";
import DropdownImage from "components/DropDownImage";
import DropdownComponent from "components/DropdownComponent";
import Header from "components/Header";
import { BillTable, ProductTable } from "components/TableComponent";
import ReportProductTable from "components/TableComponent/components/ReportProductTable";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { title } from "process";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
const { RangePicker } = DatePicker;
const CUS_INFO = {
  customerName: "NVA",
  gender: "Male",
  phoneNumber: 123123,
  totalBuyAmount: 123,
  email: "123123@gmail.com",
  debt: 0,
};
export default function ImportOrder() {
  const [language, setLanguage] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const { t } = useTranslation();
  const [openAddForm, setOpenAddForm] = useState(false);
  const listWarehouseName = useSelector(
    (state: RootState) => state.warehouseSlice
  ).map((value) => value.warehouseName);
  const [warehouseName, setWarehouseName] = useState(listWarehouseName[0]);

  const [listFilter, setListFilter] = useState([
    {
      displayName: t("partner.supplierName"),
      value: true,
    },
    {
      displayName: t("sale.status"),
      value: true,
    },
    {
      displayName: t("sale.receiver"),
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
      <Header width={"100%"} title="Import Order" />

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
              onClick={() => {
                setOpenAddForm(true);
              }}
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
                {t("button.view")}
              </Button>
            </Space>
          </div>
          {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
          <BillTable
            filterOption={{
              receiver: false,
              listProduct: false,
              payment: false,
              debt: false,
              discount: false,
              totalPayment: false,
              voucherID: false,
              seller: false,
              status: false,
              note: false,
            }}
          />
        </Space>
      </body>
      <Modal
        title={<h1 className="text-2xl">{t("sale.addNewOrder")}</h1>}
        width={"70%"}
        open={openAddForm}
        onCancel={() => setOpenAddForm(false)}
        footer={false}
      >
        <Divider style={{ borderWidth: 1, borderColor: "#9A9A9A" }} />
        <Card
          title={<h1 className=" text-2xl">{t("warehouse.supplierInfo")}</h1>}
          bordered={true}
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#9A9A9A",
          }}
        >
          <div className="flex w-full items-center gap-4">
            <TextInputComponent
              width={"100%"}
              iconLeft={<BiSearch size={28} />}
              placeHolder={t("warehouse.searchSupplier")}
            />
            <ButtonComponent
              label={t("partner.addNewSupplier")}
              onClick={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 gap-3 my-5">
            <h1 className=" text-base font-medium">
              {t("partner.customerName")}
            </h1>
            <h1 className="text-base italic">{CUS_INFO.customerName}</h1>

            <h1 className=" text-base font-medium">{t("partner.gender")}</h1>
            <h1 className="text-base italic">{CUS_INFO.gender}</h1>

            <h1 className=" text-base font-medium">
              {t("partner.phoneNumber")}
            </h1>
            <h1 className="text-base italic">{CUS_INFO.phoneNumber}</h1>

            <h1 className=" text-base font-medium">
              {t("partner.totalBuyAmount")}
            </h1>
            <h1 className="text-base italic">{CUS_INFO.totalBuyAmount}</h1>

            <h1 className=" text-base font-medium">{t("partner.email")}</h1>
            <h1 className="text-base italic">{CUS_INFO.email}</h1>

            <h1 className=" text-base font-medium">{t("partner.debt")}</h1>
            <h1 className="text-base italic">{CUS_INFO.debt}</h1>
          </div>
        </Card>
        <Card
          title={
            <Space>
              <h1 className=" text-2xl">{t("product.productInfo")}</h1>
              <DropdownComponent
                options={listWarehouseName}
                value={warehouseName}
                setValue={setWarehouseName}
              />
            </Space>
          }
          bordered={true}
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#9A9A9A",
            marginBlock: 12,
          }}
        >
          <div className="flex w-full items-center gap-4">
            <TextInputComponent
              width={"100%"}
              iconLeft={<BiSearch size={28} />}
              placeHolder={t("product.searchProduct")}
              setValue={(value) => {}}
              enterAction={() => {
                setOpenSearchModal(!openSearchModal);
              }}
            />
            <ButtonComponent
              label={t("product.addNewProduct")}
              onClick={() => {}}
            />
          </div>
          <div className="my-5">
            <ProductTable
              filterOption={{
                productGroup: false,
                productGroupName: false,
                totalPrice: true,
                quantity: true,
                productImage: false,
                VAT: false,
                sell_price: false,
              }}
              warehouseName={warehouseName}
              productName={search}
            />
          </div>
        </Card>
        <Card
          title={<h1 className=" text-2xl">{t("voucher.voucherInfo")}</h1>}
          bordered={true}
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#9A9A9A",
            marginBlock: 12,
          }}
        >
          <DropdownComponent
            options={["Voucher A - 50%", "Voucher B - 20%", "Voucher C - 10%"]}
          />
        </Card>
        <div className="flex items-centers">
          <div className="flex w-[100%]" />
          <div className=" grid grid-cols-2 gap-4 w-[30%] self-end">
            <Tooltip title="Payment = Sum(Total Price) ">
              <h1 className=" text-base font-medium">{t("sale.payment")}:</h1>
            </Tooltip>
            <h1 className=" text-base italic">$1231</h1>

            <h1 className=" text-base font-medium">{t("sale.discount")}:</h1>
            <h1 className=" text-base italic">10%</h1>

            <Tooltip title="Total Payment = Payment * ( 1- Discount )">
              <h1 className=" text-base font-medium">
                {t("sale.totalPayment")}:
              </h1>
            </Tooltip>
            <h1 className=" text-base italic">$1231</h1>
          </div>
        </div>
        <div className=" flex justify-center items-center">
          <ButtonComponent
            label={t("button.addOrder")}
            onClick={() => {}}
            paddingHorizontal={30}
            fontSize={26}
          />
        </div>
      </Modal>
      <Modal
        title={
          <h1 className=" text-2xl">{t("product.searchProductFromOrder")}</h1>
        }
        open={openSearchModal}
        onCancel={() => setOpenSearchModal(false)}
        footer={false}
        width={"70%"}
      >
        <Divider style={{ backgroundColor: "black" }} />
        <div className="flex items-center justify-between">
          <DropdownComponent label="Product Group" options={[]} />
          <TextInputComponent
            label="Insert name to search"
            width={"70%"}
            iconLeft={<BiSearch />}
          />
        </div>
        <div className="flex items-center my-3">
          <div className="flex w-full" />
          <ButtonComponent
            label={t("button.displayAll")}
            onClick={() => {}}
            backgroundColor="#74ADC6"
          />
        </div>
        <ProductTable />
        <div className="flex items-center">
          <div className="flex w-full" />
          <Space>
            <ButtonComponent
              label={t("button.cancel")}
              onClick={() => {}}
              backgroundColor="#9A9A9A"
            />
            <ButtonComponent
              label={t("button.addMenu")}
              onClick={() => {}}
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                color: "#9A9A9A",
              }}
            />
          </Space>
        </div>
      </Modal>
    </div>
  );
}
