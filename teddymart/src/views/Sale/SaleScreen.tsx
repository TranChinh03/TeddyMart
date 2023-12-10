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
import React, { useMemo, useRef, useState } from "react";
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
import { IoMdAlert } from "react-icons/io";
import { LiaFileExcel } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import {
  deleteMultiOrder,
  deleteOrder,
} from "state_management/slices/orderSlice";
import { IoAlertCircleOutline } from "react-icons/io5";
import AddForm from "./components/AddForm";
import SearchProductForm from "./components/SearchProductForm";
import AlertDelete from "./components/AlertDelete";
import { BtnExport } from "components";
import { deleteOrderFirebase } from "utils/appUtils";
import addNotification from "react-push-notification";
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
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [date, setDate] = useState<{ from: Date; to: Date }>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { userId } = useSelector((state: RootState) => state.manager);
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
  const onDeleteAll = () => {
    setOpenAlertModal(true);
    dispatch(deleteMultiOrder(selectedRows));
    deleteOrderFirebase(selectedRows, userId);
  };
  const onDelete = (orderId?: string) => {
    if (orderId) {
      setOpenAlertModal(true);
      dispatch(deleteOrder({ orderId: orderId }));
      deleteOrderFirebase([orderId], userId);
      setOpenAlertModal(false);
      return;
    }
    dispatch(deleteMultiOrder(selectedRows));
    setOpenAlertModal(false);
  };
  const orderRef = useRef(null);

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
              onClick={onDeleteAll}
              style={{ backgroundColor: "#EA5A47", marginInline: 12 }}
              iconLeft={<BiTrash size={20} color="white" />}
            />

            <BtnExport
              fileName={t("drawer.sale")}
              sheet={t("drawer.sale")}
              tableRef={orderRef}
            />
            <ButtonComponent
              label={t("button.addNew")}
              onClick={() => {
                // addNotification({
                //   title: "Warning",
                //   subtitle: "HELLO",
                //   message: "HGOWDq",
                //   theme: "light",
                //   native: true,
                // });
                setOpenAddForm(true);
              }}
              iconLeft={<BiPlus size={20} color="white" />}
            />
          </div>
          <div className="flex items-center ">
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
                isValueIndex={true}
              />
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
            setOpenAlertModal={setOpenAlertModal}
            ref={orderRef}
            type="Export"
          />
        </Space>
      </body>
      {/*Modal add form */}
      <AddForm
        setOpenAddForm={setOpenAddForm}
        openAddForm={openAddForm}
        typeAdd="Export"
      />
      {/*Modal search product */}
      <SearchProductForm
        setOpenSearchModal={setOpenSearchModal}
        openSearchModal={openSearchModal}
      />
      {/*Modal Alert Delete */}
      <AlertDelete
        openAlertModal={openAlertModal}
        setOpenAlertModal={setOpenAlertModal}
        onDelete={onDelete}
      />
    </div>
  );
}
