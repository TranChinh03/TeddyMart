import React, { useDeferredValue, useEffect, useRef, useState } from "react";

import DropdownComponent from "components/DropdownComponent";

import { BtnExport, SearchComponent } from "components";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";

import { BiPlus } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { ProductTable } from "components/TableComponent";
import { RootState } from "state_management/reducers/rootReducer";
import { ListCheckBox } from "components";
import { t } from "i18next";
import { Divider, Modal, Space } from "antd";
import AddNewProduct from "./components/AddNewProduct";

export default function ProductScreen() {
  const productRef = useRef(null);
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
      displayName: t("product.quantity"),
      value: true,
    },
    {
      id: 1,
      displayName: t("product.productGroup"),
      value: true,
    },
    {
      id: 2,
      displayName: t("product.productGroupName"),
      value: true,
    },
    {
      id: 3,
      displayName: t("product.sell_price"),
      value: true,
    },
    {
      id: 4,
      displayName: t("product.costPrice"),
      value: true,
    },

    {
      id: 5,
      displayName: t("note"),
      value: true,
    },
    {
      id: 6,
      displayName: t("product.image"),
      value: true,
    },
  ]);

  const filterOptions = {
    productGroup: listFilter[1].value,
    productGroupName: listFilter[2].value,
    productImage: listFilter[6].value,
    sell_price: listFilter[3].value,
    costPrice: listFilter[4].value,
    note: listFilter[5].value,
    quantity: listFilter[0].value,
  };

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
        <div className=" flex items-center">
          <SearchComponent
            placeholder={t("product.searchByProduct")}
            setSearch={setSearch}
            search={search}
            style={{
              paddingTop: 9,
              paddingBottom: 9,
            }}
            outStyle={{ width: "100%" }}
          />

          <div style={{ width: 36 }} />
          <ListCheckBox listFilter={listFilter} setListFilter={setListFilter} />

          <ButtonComponent
            label={t("button.delete")}
            onClick={() => alert("Button Clicked")}
            backgroundColor={COLORS.checkbox_bg}
            style={{ marginInline: 12 }}
          />

          <BtnExport fileName="Sheet1" sheet="sheet1" tableRef={productRef} />

          <ButtonComponent
            label={t("product.addNewProduct")}
            onClick={() => setOpenAddForm(true)}
            iconLeft={<BiPlus size={20} color="white" />}
          />
        </div>
        <div className="flex items-center my-2">
          <DropdownComponent
            value={sort}
            setValue={setSort}
            options={OPTIONS}
          />
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
            }}
            ref={productRef}
          />
        </div>
      </div>
      <AddNewProduct
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
      />
    </div>
  );
}
