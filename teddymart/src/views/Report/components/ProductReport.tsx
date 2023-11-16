import { ModalSelectDate, SearchComponent } from "components";
import { ButtonComponent } from "components";
import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReportProductTable } from "components/TableComponent";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
export default function ProductReport() {
  const { t } = useTranslation();
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  const [search, setSearch] = useState("");
  const PRODUCTS = useSelector((state: RootState) => state.reportProduct);

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
          <ButtonComponent
            onClick={() => {}}
            label={t("button.exportReport")}
            backgroundColor={COLORS.defaultBlack}
            color={COLORS.defaultWhite}
          />
        </div>
        <div className="w-[98%] self-center flex mx-auto">
          <ReportProductTable data={PRODUCTS} />
        </div>
      </div>
    </div>
  );
}
