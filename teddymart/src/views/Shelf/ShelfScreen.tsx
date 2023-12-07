import { useState } from "react";
import SearchComponent from "components/SearchComponent";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import { TiPlus } from "react-icons/ti";
import { ShelfTable } from "components/TableComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { t } from "i18next";
import AddNewShelf from "./components/AddNewShelf";
import { AlertModal } from "components";
import { deleteShelf } from "state_management/slices/shelfSlice";
import { deleteData } from "controller/deleteData";

export default function ShelfScreen() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onDeleteMultiShelf = () => {
    selectedRows.forEach(async (item) => {
      await deleteData({ id: item, table: "Shelf" });
      dispatch(deleteShelf(item));
    });
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
              onClick={() => setOpen(true)}
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
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------- */}
      <AddNewShelf
        openAddNewShelf={openAddForm}
        setOpenAddShelf={setOpenAddForm}
      />
      <AlertModal
        open={open}
        setOpen={setOpen}
        onConfirm={onDeleteMultiShelf}
      />
    </div>
  );
}
