import { useState } from "react";
import SearchComponent from "components/SearchComponent";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import { TiPlus } from "react-icons/ti";
import { ShelfTable } from "components/TableComponent";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { t } from "i18next";
import AddNewShelf from "./components/AddNewShelf";

export default function ShelfScreen() {
  const SHELF = useSelector((state: RootState) => state.shelf);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [search, setSearch] = useState("");

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
              onClick={() => alert("Button Clicked")}
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
          <ShelfTable data={SHELF} />
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------- */}
      <AddNewShelf
        openAddNewShelf={openAddForm}
        setOpenAddShelf={setOpenAddForm}
      />
    </div>
  );
}
