import React, { useState } from "react";
import Header from "components/Header";
import DropdownComponent from "components/DropdownComponent";
import ButtonSelect from "components/ButtonSelect";
import { AlertModal } from "components";
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
import { GroupProductTable } from "components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { t } from "i18next";
import { Divider, Modal, Space, message } from "antd";
import { addData, updateData } from "controller/addData";
import AddNewGroupProduct from "./components/AddNewGroupProduct";
import { deleteData } from "controller/deleteData";
import { deleteShelf } from "state_management/slices/shelfSlice";
import { updateProduct } from "state_management/slices/productSlice";
import { deleteGroupProduct } from "state_management/slices/groupProductSlice";
export type Input = {
  groupId: string;
  groupName: string;
  shelfID: string;
  shelfName: string;
  note: string;
};

export default function ProductScreen() {
  const GROUP = useSelector((state: RootState) => state.groupProduct);
  const [screens, setScreens] = useState();
  const [type, setType] = useState();
  const [productGroup, setProductGroup] = useState();
  const [status, setStatus] = useState();
  const [storeManagement, setStoreManagement] = useState();
  const [sort, setSort] = useState();
  const [search, setSearch] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);
  const [dataInput, setDataInput] = useState<TGroupProduct>({
    groupId: "",
    groupName: "",
    shelfID: "",
    shelfName: "",
    note: "",
  });
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const PRODUCT = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  const onDeleteMultiGroup = () => {
    if (selectedRows.length !== 0) {
      selectedRows.forEach(async (item) => {
        await deleteData({ id: item, table: "Group_Product" });
        dispatch(deleteGroupProduct(GROUP.find((x) => x.groupId === item)));
        PRODUCT.forEach(async (product) => {
          if (product.groupId === item) {
            await updateData({
              data: { ...product, groupId: "", groupName: "" },
              table: "Group_Product",
              id: product.productId,
            });
            dispatch(
              updateProduct({
                currentProduct: product,
                newProduct: { ...product, groupId: "", groupName: "" },
              })
            );
          }
        });
        message.success(t("group.deletedGroup"));
        setOpen(false);
      });
    }
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
        <div className="flex items-center justify-between">
          <SearchComponent
            placeholder={t("product.searchByProductGroup")}
            outStyle={{ width: "50%" }}
            search={search}
            setSearch={setSearch}
          />
          <div className="flex items-center">
            <ButtonComponent
              label={t("button.delete")}
              onClick={() => {
                if (selectedRows.length > 0) setOpen(true);
              }}
              backgroundColor={COLORS.checkbox_bg}
              style={{ marginRight: 12 }}
            />
            <ButtonComponent
              label={t("product.addNewProductGroup")}
              onClick={() => setOpenAddForm(true)}
              iconLeft={<TiPlus style={{ fontSize: 22 }} />}
            />
          </div>
        </div>

        <div style={{ width: "100%", margin: "20px auto auto auto" }}>
          <GroupProductTable
            search={search}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setOpenAlert={setOpen}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------- */}
      <AddNewGroupProduct
        openAddNewGroupProduct={openAddForm}
        setOpenAddNewGroupProduct={setOpenAddForm}
        data={dataInput}
        setData={setDataInput}
      />

      <AlertModal
        open={open}
        setOpen={setOpen}
        onConfirm={onDeleteMultiGroup}
      />
    </div>
  );
}
