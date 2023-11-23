import React, { useState, useDeferredValue } from "react";
import { useTranslation } from "react-i18next";
import TextInputComponent from "components/TextInputComponent";
import Header from "components/Header";
import {
  ButtonComponent,
  DropdownComponent,
  ListCheckBox,
  SearchComponent,
} from "components";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { COLORS } from "constants/colors";
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
import { LiaFileExcel } from "react-icons/lia";
import { BiPlus } from "react-icons/bi";
import { WareHouseTable } from "components/TableComponent";
export default function WarehouseList() {
  const [search, setSearch] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [defaultWarehouse, setDefaultWarehouse] = useState(false);
  const { t } = useTranslation();
  // const [time, setTime] = useState<D>({
  //   from: new Date(),
  //   to: new Date(),
  // });
  // const [listFilter, setListFilter] = useState([
  //   {
  //     displayName: t("warehouse.address"),
  //     value: true,
  //   },
  //   {
  //     displayName: t("warehouse.createdAt"),
  //     value: true,
  //   },
  // ]);
  const OPTIONS = [
    t("warehouse.warehouseIDAscending"),
    t("warehouse.warehouseIDDescending"),
    t("warehouse.warehouseNameAZ"),
    t("warehouse.warehouseNameZA"),
  ];
  const WAREHOUSES = useSelector((state: RootState) => state.warehouseSlice);
  const [sort, setSort] = useState(OPTIONS[0]);
  const [warehouse, setWarehouse] = useState(WAREHOUSES[0]?.warehouseName);
  const warehouseName = useDeferredValue(search);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    fieldName: string
  ) => {
    setValue(value);
    validateForm(fieldName, value);
  };

  const validateForm = (fieldName: string, value: string) => {
    if (fieldName === "warehouseName") {
      setIsFormValid(value !== "" && name !== "");
    } else if (fieldName === "address") {
      setIsFormValid(value !== "" && address !== "");
    }
  };

  return (
    <div className="w-full bg-extreme_lg_grey min-h-screen">
      {/* Header */}
      {/* <Header width={"100%"} title={t("warehouse.warehouseList")}/> */}

      {/* Body */}
      <div className="bg-white border-1.5 mx-5 my-1.5 rounded-md px-3 ">
        {/* <ModalSelectDate setResult={setTime} /> */}

        <div className="w-full justify-between items-center flex flex-wrap py-5">
          <div className="flex">
            {/* <ButtonComponent
              onClick={() => {}}
              label={t("button.all")}
              backgroundColor={COLORS.defaultWhite}
              color={COLORS.txt_lightgrey}
              style={{
                borderColor: COLORS.lightGray,
                borderWidth: 1.5,
              }}
            />

            <div className="w-3" /> */}
            <SearchComponent
              search={search}
              setSearch={setSearch}
              placeholder={t("warehouse.searchByName")}
              width={"35vw"}
            />
{/* 
            <div className="w-3" />
            <ListCheckBox
              listFilter={listFilter}
              setListFilter={setListFilter}
            /> */}
          </div>
          <div className="flex">
            <ButtonComponent
              onClick={() => alert("Button Clicked")}
              label={t("button.delete")}
              backgroundColor={COLORS.checkbox_bg}
              style={{ borderWidth: 0 }}
            />

            <div className="w-3" />
            <ButtonComponent
              onClick={() => alert("Button Clicked")}
              label={t("button.exportExcel")}
              backgroundColor={COLORS.defaultBlack}
              style={{ borderWidth: 0 }}
              iconLeft={
                <LiaFileExcel
                  style={{ marginRight: 10, color: "white", fontSize: 22 }}
                />
              }
            />

            <div className="w-3" />
            <ButtonComponent
              label={t("button.addNew")}
              onClick={() => {
                setOpenAddForm(true);
              }}
              iconLeft={<BiPlus size={20} color="white" />}
            />
          </div>
        </div>
        <div>
          <DropdownComponent
            label={t("button.sortBy")}
            options={OPTIONS}
            value={sort}
            setValue={setSort}
          />
        </div>

        {/* Table */}
        <div className="h-3" />
        <WareHouseTable 
          warehouseName={warehouseName}
          sort={{
            idAscending: sort === OPTIONS[0],
            idDescending: sort === OPTIONS[1],
            nameAZ: sort === OPTIONS[2],
            nameZA: sort === OPTIONS[3],
          }}
          
        />
      </div>

      {/* ADD NEW WAREHOUSE */}
      <Modal
        title={<h1 className="text-2xl">{t("warehouse.addNewWarehouse")}</h1>}
        width={"60%"}
        open={openAddForm}
        onCancel={() => setOpenAddForm(false)}
        footer={false}
      >
        <div className="border hidden md:flex border-gray-100"></div>

        <div className="flex flex-col gap-y-5 px-5 py-10">
          <TextInputComponent
            label={t("warehouse.warehouseName")}
            width={"100%"}
            value={name}
            setValue={
              (value) =>
                handleInputChange(
                value,
                setName,
                "warehouseName"
              )
            }
          />
          <TextInputComponent
            label={t("warehouse.address")}
            width={"100%"}
            value={address}
            setValue={
              (value) =>
                handleInputChange(
                value,
                setAddress,
                "address"
              )
            }
          />

          <Checkbox>
            <h1 className="font-bold">{t("warehouse.defaultWarehouse")}</h1>
          </Checkbox>
        </div>

        <div className="border hidden md:flex border-gray-100"></div>

        <div className="flex mt-10 items-center justify-center">
          <Space>
            <ButtonComponent
              label={t("button.save")}
              backgroundColor={
                isFormValid ? COLORS.darkYellow : COLORS.defaultWhite
              }
              color={
                isFormValid ? COLORS.defaultWhite : COLORS.lightGray
              }
              onClick={() => isFormValid && alert("Button Clicked")}
            />
            <ButtonComponent
              label={t("button.cancel")}
              onClick={() => {
                setOpenAddForm(false);
              }}
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
