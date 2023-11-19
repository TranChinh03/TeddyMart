import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextInputComponent from "components/TextInputComponent";
import Header from "components/Header";
import { ButtonComponent, DropdownComponent, ListCheckBox, SearchComponent } from "components";
import { ModalSelectDate } from "components";
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

import {BiPlus} from "react-icons/bi";
import { WareHouseTable } from "components/TableComponent";
export default function WarehouseList() {
  const [search, setSearch] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [defaultWarehouse, setDefaultWarehouse] = useState(false)
  const {t} = useTranslation();
  const [time, setTime] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  const [listFilter, setListFilter] = useState([
    {
      displayName: t("warehouse.address"),
      value: true,
    },
    {
      displayName: t("warehouse.createdAt"),
      value: true,
    }
  ])
  const OPTIONS = [
    t("warehouse.warehouseIDAscending"),
    t("warehouse.warehouseIDDescending"),
    t("warehouse.warehouseNameAZ"),
    t("warehouse.warehouseNameZA"),
  ];
  const [sort, setSort] = useState(OPTIONS[0]);
  
  
  return (
    <div className="w-full bg-extreme_lg_grey min-h-screen">
      {/* Header */}
      <Header width={"100%"} title={t("warehouse.warehouseList")}/>

      {/* Body */}
      <div className="bg-white border-1.5 mx-5 my-1.5 rounded-md px-3 py-5">
      
        <ModalSelectDate setResult={setTime} />

        <div className="w-full justify-between items-center flex flex-wrap py-5">
          <div className="flex"> 
            <ButtonComponent
              onClick={() => {}}
              label={t("button.all")}
              backgroundColor={COLORS.defaultWhite}
              color={COLORS.txt_lightgrey}
              style={{
                borderColor: COLORS.lightGray,
                borderWidth: 1.5,
              }}
            />

            <div className="w-3" />
            <SearchComponent
              search={search}
              setSearch={setSearch}
              placeholder={t("warehouse.searchByName")}
            />
            
            <div className="w-3" />
            <ListCheckBox
              listFilter={listFilter}
              setListFilter={setListFilter}
            />
          </div>
          <div className="flex">
            <ButtonComponent
              onClick={() => {}}
              label={t("button.delete")}
              backgroundColor={COLORS.checkbox_bg}
              style={{ borderWidth: 0 }}
            />

            <div className="w-3" />
            <ButtonComponent
              onClick={() => {}}
              label={t("button.exportExcel")}
              backgroundColor={COLORS.defaultBlack}
              style={{ borderWidth: 0 }}
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
          
        />
      </div>
      


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
            setValue={setName}
          />
          <TextInputComponent
            label={t("warehouse.address")}
            width={"100%"}
            value={address}
            setValue={setAddress}
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
              onClick={() => {}}
              backgroundColor="#9A9A9A"
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
