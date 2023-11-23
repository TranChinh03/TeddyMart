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
import {
  ButtonComponent,
  ListCheckBox,
  ModalSelectDate,
  SearchComponent,
} from "components";
import DropdownImage from "components/DropDownImage";
import DropdownComponent from "components/DropdownComponent";
import Header from "components/Header";
import { BillTable, ProductTable } from "components/TableComponent";
import ReportProductTable from "components/TableComponent/components/ReportProductTable";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { title } from "process";
import React, { useMemo, useState } from "react";
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
export default function SaleScreen() {
  const [language, setLanguage] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const listWarehouseName = useSelector(
    (state: RootState) => state.warehouseSlice
  ).map((value) => value.warehouseName);
  const [warehouseName, setWarehouseName] = useState("Central Warehouse");
  const [date, setDate] = useState<{ from: Date; to: Date }>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { t } = useTranslation();
  const [openAddForm, setOpenAddForm] = useState(false);
  const initialFilter = useMemo(
    () => [
      {
        displayName: t("sale.seller"),
        key: "seller",
        value: true,
      },
      {
        displayName: t("sale.status"),
        key: "status",
        value: true,
      },
      {
        displayName: t("sale.payment"),
        key: "payment",
        value: true,
      },
      {
        displayName: t("sale.debt"),
        key: "debt",
        value: true,
      },
      {
        displayName: t("sale.discount"),
        key: "discount",
        value: true,
      },
      {
        displayName: t("sale.note"),
        key: "note",
        value: true,
      },
      {
        displayName: t("sale.totalPayment"),
        key: "totalPayment",
        value: true,
      },
    ],
    [t]
  );

  const [listFilter, setListFilter] = useState(initialFilter);
  const objectFilter = useMemo(() => {
    const resultObject: Record<string, boolean> = {};
    listFilter.forEach((value) => {
      resultObject[value.key] = value.value;
    });
    return resultObject;
  }, [listFilter]);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const onChange = (key: string) => {
    console.log(key);
  };
  console.log(sort);
  return (
    <div className="w-full">
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
          <ModalSelectDate setResult={setDate} />

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
            startDate={date?.from.getTime()}
            endDate={date?.to.getTime()}
            search={search}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            sort={+sort}
            filterOption={objectFilter}
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
          title={<h1 className=" text-2xl">{t("sale.customerInfo")}</h1>}
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
              placeHolder={t("sale.searchCusPhoneNumber")}
            />
            <ButtonComponent
              label={t("partner.addNewCustomer")}
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
              productName={search}
              warehouseName={warehouseName}
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
