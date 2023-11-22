import React, { useEffect, useState } from "react";
import Header from "components/Header";
import DropdownComponent from "components/DropdownComponent";
import ButtonSelect from "components/ButtonSelect";
import { IoMdArrowDropdown } from "react-icons/io";
import SearchComponent from "components/SearchComponent";
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
  const [PRODUCT, setPRODUCT] = useState(
    useSelector((state: RootState) => state.product)
  );
  const GROUP = useSelector((state: RootState) => state.groupProduct);
  const [screens, setScreens] = useState();
  const [type, setType] = useState();
  const [productGroup, setProductGroup] = useState();
  const [status, setStatus] = useState();
  const [storeManagement, setStoreManagement] = useState();
  const [sort, setSort] = useState();
  const [search, setSearch] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);

  const [listFilter, setListFilter] = useState([
    {
      displayName: t("product.productId"),
      value: true,
    },
    {
      displayName: t("product.productName"),
      value: true,
    },
    {
      displayName: t("product.quantity"),
      value: true,
    },
    {
      displayName: t("product.productGroup"),
      value: true,
    },
    {
      displayName: t("product.productGroupName"),
      value: true,
    },
    {
      displayName: t("product.sell_price"),
      value: true,
    },
    {
      displayName: t("product.costPrice"),
      value: true,
    },
    {
      displayName: t("sale.totalPayment"),
      value: true,
    },
    {
      displayName: t("product.price"),
      value: true,
    },
    {
      displayName: t("note"),
      value: true,
    },
    {
      displayName: t("activities"),
      value: true,
    },
  ]);

  useEffect(() => {
    const addGroupNameToProduct = () => {
      const updatedProduct = PRODUCT.map((productItem) => {
        const correspondingGroup = GROUP.find(
          (groupItem) => groupItem.groupId === productItem.groupId
        );
        return {
          ...productItem,
          groupName: correspondingGroup
            ? correspondingGroup.groupName
            : "Unknown Group",
        };
      });
      setPRODUCT(updatedProduct);
    };
    addGroupNameToProduct();
  }, [PRODUCT, GROUP]);

  return (
    <div className="w-full">
      {/* <Header width={"100%"} title={"Product"}></Header> */}
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
              <ButtonSelect
                iconRight={
                  <IoMdArrowDropdown
                    style={{ marginLeft: 50, color: "gray" }}
                  />
                }
                title="All"
                value={type}
                setValue={setType}
                options={["All", "Product", "Combo"]}
              />
            </div>
            <div className="mx-2">
              <SearchComponent
                placeholder={t("product.searchByProduct")}
                setSearch={setSearch}
              />
            </div>
            <div className="mx-2">
              <ListCheckBox
                listFilter={listFilter}
                setListFilter={setListFilter}
              />
            </div>
          </div>
          <div className="flex justify-around">
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
                options={[
                  "Name: A-Z",
                  "Name: Z-A",
                  "Price: Low-High",
                  "Price: High-Low",
                  "Last update: Oldest",
                  "Last update: Latest",
                ]}
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
          <ProductTable productName={search} />
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
