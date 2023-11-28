import { ModalSelectDate, SearchComponent } from "components";
import { ButtonComponent, BtnExport } from "components";
import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReportProductTable } from "components/TableComponent";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { LiaFileExcel } from "react-icons/lia";
export default function ProductReport() {
  const { t } = useTranslation();
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  const [search, setSearch] = useState("");
  const PRODUCTS = useSelector((state: RootState) => state.reportProduct);
  const productRef = useRef(null);
  return (
    <div className="bg-white border-1.5 mx-5 my-1.5 rounded-md">
      <div className="divide-y">
        {/* Header */}
        <div className="pt-5 pb-2 px-3">
          <TextComponent
            fontWeight="font-medium"
            color={COLORS.sidebar}
            fontSize={16}
          >
            {t("report.reportByProduct")}
          </TextComponent>
        </div>
        <div className="w-full py-2 px-3 flex items-center justify-between flex-wrap">
          <div className="flex flex-wrap items-end">
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
            <div className="w-5" />
            <ModalSelectDate setResult={setDate} />
            <div className="w-5" />
            <SearchComponent
              placeholder={t("product.searchByProduct")}
              search={search}
              setSearch={setSearch}
              width={"250px"}
            />
          </div>

          <BtnExport
            fileName={t("drawer.product")}
            sheet="Sheet1"
            tableRef={productRef}
          />
        </div>
        <div className="w-[98%] self-center flex mx-auto">
          <ReportProductTable data={PRODUCTS} ref={productRef} />
        </div>
      </div>
    </div>
  );
}
