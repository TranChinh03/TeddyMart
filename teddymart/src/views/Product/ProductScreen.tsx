import React, { useDeferredValue, useEffect, useState } from "react";
import Header from "components/Header";
import DropdownComponent from "components/DropdownComponent";
import ButtonSelect from "components/ButtonSelect";
import { IoMdArrowDropdown } from "react-icons/io";
import { SearchComponent } from "components";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import {
  LiaBarcodeSolid,
  LiaFileExcel,
  LiaRecycleSolid,
  LiaScribd,
} from "react-icons/lia";
import { TiPlus } from "react-icons/ti";
import { BiFilter } from "react-icons/bi";
import { ResponsiveContainer } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { ProductTable } from "components/TableComponent";
import { RootState } from "state_management/reducers/rootReducer";
import { ListCheckBox } from "components";
import { t } from "i18next";
import { Divider, Modal, Space } from "antd";

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const productName = useDeferredValue(search);
  const [PRODUCT, setPRODUCT] = useState([]);
  const GROUP = useSelector((state: RootState) => state.groupProduct);
  const [screens, setScreens] = useState();
  const [type, setType] = useState();
  const [productGroup, setProductGroup] = useState();
  const [status, setStatus] = useState();
  const [storeManagement, setStoreManagement] = useState();
  const OPTIONS = [
    t("product.productNameAZ"),
    t("product.productNameZA"),
    t("product.productPriceDown"),
    t("product.productPriceUp"),
  ];
  const [sort, setSort] = useState(OPTIONS[0]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [listFilter, setListFilter] = useState([
    {
      id: 0,
      displayName: t("product.productId"),
      value: true,
    },
    {
      id: 1,
      displayName: t("product.productName"),
      value: true,
    },
    {
      id: 2,
      displayName: t("product.quantity"),
      value: true,
    },
    {
      id: 3,
      displayName: t("product.productGroup"),
      value: true,
    },
    {
      id: 4,
      displayName: t("product.productGroupName"),
      value: true,
    },
    {
      id: 5,
      displayName: t("product.sell_price"),
      value: true,
    },
    {
      id: 6,
      displayName: t("product.costPrice"),
      value: true,
    },
    {
      id: 7,
      displayName: t("sale.totalPayment"),
      value: true,
    },
    {
      id: 8,
      displayName: t("product.price"),
      value: true,
    },
    {
      id:9,
      displayName: t("note"),
      value: true,
    },
    {
      id: 10,
      displayName: t("activities"),
      value: true,
    },
    {
      id: 11,
      displayName: t("product.image"),
      value: true,
    }
  ]);

  const filterOptions = {
    productId: true,
    productName: listFilter[1].value,
    productGroup: listFilter[3].value,
    productGroupName: listFilter[4].value,
    productImage: listFilter[11].value,
    sell_price: listFilter[5].value,
    costPrice: listFilter[6].value,
    note: listFilter[9].value,
    quantity: listFilter[2].value,
    totalPrice: listFilter[7].value,
    activities: listFilter[10].value,
    price: listFilter[8].value
  }

  return (
    <div className="w-full">
      <div
        className="bg-white border-2 p-5 mx-1.5 my-1.5 rounded-md"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-start">
            <div className="mx-2">
            <ButtonComponent
                label={t("button.all")}
                onClick={() => alert("Button Clicked")}
                backgroundColor={COLORS.defaultWhite}
                color={COLORS.extra_gray}
              />
            </div>
            <div className="mx-2">
              <SearchComponent
                placeholder={t("product.searchByProduct")}
                setSearch={setSearch}
                search={search}
              />
            </div>
            <div className="mx-2">
              <ListCheckBox
                listFilter={listFilter}
                setListFilter={setListFilter}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div>
              <ButtonComponent
                label={t("button.delete")}
                onClick={() => alert("Button Clicked")}
                backgroundColor={COLORS.checkbox_bg}
              />
            </div>
            <div>
              <ButtonComponent
                label={t("button.exportExcel")}
                onClick={() => alert("Button Clicked")}
                backgroundColor={COLORS.lightBlack}
                iconLeft={
                  <LiaFileExcel
                    style={{ marginRight: 10, color: "white", fontSize: 22 }}
                  />
                }
              />
            </div>
            <div>
              <ButtonComponent
                label={t("product.addNewProduct")}
                onClick={() => setOpenAddForm(true)}
                iconLeft={
                  <TiPlus
                    style={{ marginRight: 10, color: "white", fontSize: 22 }}
                  />
                }
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              <ButtonSelect
                iconRight={
                  <IoMdArrowDropdown
                    style={{ marginLeft: 50, color: "gray" }}
                  />
                }
                width={200}
                title="Name: A-Z"
                label={t("button.sortBy")}
                value={sort}
                setValue={setSort}
                options={OPTIONS}
              />
            </div>

            <div className="flex-1">
              <ButtonSelect
                iconRight={
                  <IoMdArrowDropdown
                    style={{ marginLeft: 50, color: "gray" }}
                  />
                }
                width={200}
                title="All"
                label={t("group.groupName")}
                value={productGroup}
                setValue={setProductGroup}
                options={GROUP.map((item) => item.groupName)}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "100%", margin: "20px auto auto auto" }}>
          <ProductTable 
          productName={productName} 
          filterOption={filterOptions}
          sort={{
            nameAscending: sort === OPTIONS[0],
            nameDescending: sort === OPTIONS[1],
            quantityAscending: sort === OPTIONS[2],
            quantityDescending: sort === OPTIONS[3],
          }}/>
        </div>
      </div>
      <Modal
        title={<h1 className="text-2xl">{t("product.addNewProduct")}</h1>}
        width={"60%"}
        open={openAddForm}
        onCancel={() => setOpenAddForm(false)}
        footer={false}
      >
        <Divider style={{ backgroundColor: "black" }} />
        <div className="grid grid-cols-4">
          <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("product.productGroup")}{" "}
            <p className="inline-block text-red-600">*</p>
          </label>
          <div className="col-span-3 inline-block">
            <ButtonSelect
              iconRight={
                <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
              }
              width="100%"
              title="All"
              label={t("group.groupName")}
              value={productGroup}
              setValue={setProductGroup}
              options={GROUP.map((item) => item.groupName)}
            />
          </div>

          <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("product.productName")}{" "}
            <p className="inline-block text-red-600">*</p>
          </label>
          <div className="col-span-3 inline-block">
            <input
              type="text"
              className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
              required
            />
          </div>

          <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("product.productImage")}{" "}
            <p className="inline-block text-red-600">*</p>
          </label>
          <div className="col-span-3 inline-block">
            <div
              style={{
                padding: "5px",
                border: "1px solid gray",
                borderRadius: "10px",
                width: "fit-content",
              }}
              className="cursor-pointer m-auto"
            >
              <img src={require("../../assets/images/Camera.png")} />
            </div>
          </div>

          <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("product.price")} <p className="inline-block text-red-600">*</p>
          </label>
          <div className="col-span-3 inline-block">
            <input
              type="text"
              className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
              required
            />
          </div>

          <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("product.sell_price")}{" "}
            <p className="inline-block text-red-600">*</p>
          </label>
          <div className="col-span-3 inline-block">
            <input
              type="text"
              className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
              required
            />
          </div>

          <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("product.VAT")}
          </label>
          <div className="col-span-3 inline-block">
            <input
              type="text"
              className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
              required
            />
          </div>

          <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("note")}
          </label>
          <div className="col-span-3 inline-block">
            <input
              type="text"
              className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
              required
            />
          </div>
        </div>
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
