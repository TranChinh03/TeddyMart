import { useState } from "react";
import SearchComponent from "components/SearchComponent";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import { TiPlus } from "react-icons/ti";
import { GroupProductTable, ShelfTable } from "components/TableComponent";
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
      {/* <Header width={"100%"} title={"Product"} ></Header> */}
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
              <SearchComponent
                search={search}
                setSearch={setSearch}
                placeholder={t("shelf.searchByName")}
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <div className="mr-10">
              <ButtonComponent
                label={t("button.delete")}
                onClick={() => alert("Button Clicked")}
                backgroundColor={COLORS.checkbox_bg}
              />
            </div>
            <div className="mr-10">
              <ButtonComponent
                label={t("shelf.addNewShelf")}
                onClick={() => setOpenAddForm(true)}
                iconLeft={
                  <TiPlus
                    style={{ marginRight: 10, color: "white", fontSize: 22 }}
                  />
                }
              />
            </div>
          </div>
        </div>
        <div style={{ width: "100%", margin: "20px auto auto auto" }}>
          <ShelfTable data={SHELF}/>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------- */}
      <AddNewShelf 
          openAddNewShelf = {openAddForm}
          setOpenAddShelf = {setOpenAddForm}/>
    </div>
  );
}
