import {
  ButtonComponent,
  DropdownComponent,
  Header,
  SearchComponent,
} from "components";
import { useTranslation } from "react-i18next";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { ProductTable } from "components/TableComponent";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
const filterOptions = {
  productId: true,
  productName: true,
  productGroup: false,
  productGroupName: false,
  productImage: false,
  sell_price: false,
  costPrice: false,
  VAT: false,
  note: false,
  quantity: true,
  totalPrice: false,
  activities: false,
};
export default function Warehouse() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const WAREHOUSES = useSelector((state: RootState) => state.warehouseSlice);
  const OPTIONS = [
    t("button.nameAZ"),
    t("button.nameZA"),
    t("button.quantity1"),
    t("button.quantity2"),
  ];
  //const WAREHOUSES = ["Kho 1", "Kho 2", "Kho 3", "Kho 4"];
  const [sort, setSort] = useState(OPTIONS[0]);
  const [warehouse, setWarehouse] = useState(WAREHOUSES[0]?.warehouseName);
  const LIST_PRODUCTS = WAREHOUSES.find((w) => w.warehouseName === warehouse);
  const count = WAREHOUSES.find((w) => w.warehouseName === warehouse)?.count;
  return (
    <div className="w-full bg-extreme_lg_grey min-h-screen">
      <Header width={"100%"} title={t("warehouse.warehouse")} />
      <div className="bg-white border-1.5 mx-5 my-1.5 rounded-md px-3 py-5">
        <div className="w-full justify-between items-center flex flex-wrap">
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
          </div>
        </div>
        <div className="flex flex-wrap mt-5 w-full justify-between items-end">
          <div className="flex">
            <DropdownComponent
              label={t("button.sortBy")}
              options={OPTIONS}
              value={sort}
              setValue={setSort}
            />
            <div className="w-3" />
            <DropdownComponent
              label={t("warehouse.warehouse")}
              options={WAREHOUSES.map((w) => w.warehouseName)}
              value={warehouse}
              setValue={setWarehouse}
            />
          </div>
          <div>{`${t("warehouse.totalProduct")}: ${count ?? 0}`}</div>
        </div>
        <div className="h-3" />
        <ProductTable
          filterOption={filterOptions}
          //data={LIST_PRODUCTS?.listProduct}
          warehouseName={warehouse}
        />
      </div>
    </div>
  );
}
