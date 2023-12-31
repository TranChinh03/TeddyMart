import { useState } from "react";
import SearchComponent from "components/SearchComponent";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import { TiPlus } from "react-icons/ti";
import { ShelfTable } from "components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import AddNewShelf from "./components/AddNewShelf";
import { AlertModal } from "components";
import { deleteShelf, updateShelf } from "state_management/slices/shelfSlice";
import { deleteData } from "controller/deleteData";
import { message } from "antd";
import { RootState } from "state_management/reducers/rootReducer";
import { updateGroupProduct } from "state_management/slices/groupProductSlice";
import { updateData } from "controller/addData";
import { updateShelfWarehouse } from "state_management/slices/warehouseSlice";
export type Input = {
  shelfId: string;
  shelfName: string;
  capacity: string;
  note: string;
};
export default function ShelfScreen() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataInput, setDataInput] = useState<TShelf>({
    shelfId: "",
    shelfName: "",
    capacity: "",
    note: "",
  });
  const userId = window.localStorage.getItem("USER_ID");
  const GROUP_PRODUCT = useSelector((state: RootState) => state.groupProduct);
  const WARE_HOUSE = useSelector((state: RootState) => state.warehouseSlice);
  const PRODUCTS = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const onDeleteMultiShelf = () => {
    if (selectedRows.length !== 0) {
      selectedRows.forEach(async (item) => {
        await deleteData({ id: item, table: "Shelf" });
        dispatch(deleteShelf(item));
        GROUP_PRODUCT.forEach(async (group) => {
          if (group.shelfID === item) {
            await updateData({
              data: { ...group, shelfID: "", shelfName: "" },
              table: "Group_Product",
              id: group.groupId,
            });
            dispatch(
              updateGroupProduct({
                currentGroupProduct: group,
                newGroupProduct: { ...group, shelfID: "", shelfName: "" },
              })
            );

            WARE_HOUSE.forEach((w: TWarehouse) => {
              w.listProduct.forEach((p) => {
                const product = PRODUCTS.find(
                  (temp) =>
                    temp.productId === p.productId &&
                    temp.groupId === group.groupId
                );
                if (product) {
                  dispatch(
                    updateShelfWarehouse({
                      warehouseName: w.warehouseName,
                      product: { ...p, groupId: product.groupId },
                      numberOnShelf: 0,
                      userId,
                    })
                  );
                }
              });
            });
          }
        });
        setOpen(false);
      });
      message.success(t("shelf.deleteShelf"));
      setSelectedRows([]);
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
            placeholder={t("shelf.searchByName")}
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
              label={t("shelf.addNewShelf")}
              onClick={() => setOpenAddForm(true)}
              iconLeft={<TiPlus style={{ fontSize: 22 }} />}
            />
          </div>
        </div>
        <div style={{ width: "100%", margin: "20px auto auto auto" }}>
          <ShelfTable
            search={search}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setOpenAlert={setOpen}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------- */}
      <AddNewShelf
        openAddNewShelf={openAddForm}
        setOpenAddShelf={setOpenAddForm}
        data={dataInput}
        setData={setDataInput}
      />
      <AlertModal
        open={open}
        setOpen={setOpen}
        onConfirm={onDeleteMultiShelf}
      />
    </div>
  );
}
