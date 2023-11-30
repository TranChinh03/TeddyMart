import { ModalSelectDate, SearchComponent } from "components";
import { ButtonComponent, BtnExport } from "components";
import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReportProductTable } from "components/TableComponent";

export default function ProductReport() {
  const { t } = useTranslation();
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  const [search, setSearch] = useState("");
  // const PRODUCTS = useSelector((state: RootState) => state.reportProduct);
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
            <ModalSelectDate setResult={setDate} width={"90%"} />
            <div className="w-5" />
            <SearchComponent
              placeholder={t("product.searchByProduct")}
              search={search}
              setSearch={setSearch}
              width={"300px"}
            />
          </div>

          <BtnExport
            fileName={t("drawer.product")}
            sheet="Sheet1"
            tableRef={productRef}
          />
        </div>
        <div className="w-[98%] self-center flex mx-auto">
          <ReportProductTable ref={productRef} date={date} search={search} />
        </div>
      </div>
    </div>
  );
}
